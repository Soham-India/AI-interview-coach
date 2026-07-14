package com.soham.aiinterviewcoach.service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.soham.aiinterviewcoach.dto.ai.FinalReportResponse;
import com.soham.aiinterviewcoach.dto.ai.MetricEvaluationResponse;
import com.soham.aiinterviewcoach.dto.evaluation.AnswerSubmitRequest;
import com.soham.aiinterviewcoach.dto.evaluation.EvaluationResponse;
import com.soham.aiinterviewcoach.dto.evaluation.FinalReportDTO;
import com.soham.aiinterviewcoach.entity.InterviewSession;
import com.soham.aiinterviewcoach.entity.QnaEvaluation;
import com.soham.aiinterviewcoach.entity.Report;
import com.soham.aiinterviewcoach.entity.SessionDirective;
import com.soham.aiinterviewcoach.entity.SessionQna;
import com.soham.aiinterviewcoach.repository.InterviewSessionRepository;
import com.soham.aiinterviewcoach.repository.QnaEvaluationRepository;
import com.soham.aiinterviewcoach.repository.ReportRepository;
import com.soham.aiinterviewcoach.repository.SessionDirectiveRepository;
import com.soham.aiinterviewcoach.repository.SessionQnaRepository;
import com.soham.aiinterviewcoach.repository.UserStatsRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class EvaluationService {

    private final SessionQnaRepository sessionQnaRepository;
    private final QnaEvaluationRepository qnaEvaluationRepository;
    private final SessionDirectiveRepository sessionDirectiveRepository;
    private final InterviewSessionRepository interviewSessionRepository;
    private final ReportRepository reportRepository;
    private final UserStatsRepository userStatsRepository;
    private final GeminiService geminiService;

    // ============================================================
    // 1. SUBMIT ANSWER
    // Called when user submits answer to a single question
    // Evaluates immediately via Gemini and saves to DB
    // ============================================================
    @Transactional
    public EvaluationResponse submitAnswer(
            Long userId,
            Long sessionId,
            Long qnaId,
            AnswerSubmitRequest request
    ) {
        // Validate session ownership
        InterviewSession session = interviewSessionRepository.findById(sessionId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Session not found"
                ));

        if (!session.getUser().getId().equals(userId)) {
            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN, "You do not have access to this session"
            );
        }

        if (!"IN_PROGRESS".equals(session.getStatus())) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "Session is not in progress"
            );
        }

        // Validate QnA belongs to this session
        SessionQna qna = sessionQnaRepository.findById(qnaId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Question not found"
                ));

        if (!qna.getSession().getId().equals(sessionId)) {
            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN, "Question does not belong to this session"
            );
        }

        if (qna.getUserAnswer() != null) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT, "This question has already been answered"
            );
        }

        // Save user answer
        qna.setUserAnswer(request.answer());

        // Call Gemini for evaluation
        log.info("Evaluating answer for QnA ID: {} — Topic: {}", qnaId, qna.getTopic());

        MetricEvaluationResponse evaluation = geminiService.evaluateAnswer(
                qna.getQuestionText(),
                qna.getTopic(),
                request.answer(),
                session.getJobProfile().getJobTitle()
        );

        // Save feedback and verdict back to QnA
        qna.setAiFeedback(evaluation.aiFeedback());
        qna.setVerdict(evaluation.verdict());
        qna.setOverallScore(evaluation.overallScore());
        sessionQnaRepository.save(qna);

        // Save granular scores to QnaEvaluation
        QnaEvaluation qnaEvaluation = new QnaEvaluation();
        qnaEvaluation.setQna(qna);
        qnaEvaluation.setTechnicalScore(evaluation.technicalScore());
        qnaEvaluation.setCommunicationScore(evaluation.communicationScore());
        qnaEvaluation.setConfidenceScore(evaluation.confidenceScore());
        qnaEvaluation.setStructureScore(evaluation.structureScore());
        qnaEvaluation.setOverallScore(evaluation.overallScore());
        qnaEvaluationRepository.save(qnaEvaluation);

        // Save improvement directives
        List<SessionDirective> directives = buildDirectives(qna, evaluation.directives());
        sessionDirectiveRepository.saveAll(directives);

        return new EvaluationResponse(
                qnaId,
                evaluation.verdict(),
                evaluation.aiFeedback(),
                evaluation.overallScore(),
                evaluation.technicalScore(),
                evaluation.communicationScore(),
                evaluation.confidenceScore(),
                evaluation.structureScore(),
                evaluation.directives()
        );
    }

    // ============================================================
    // 2. COMPLETE INTERVIEW
    // Called when user finishes all questions
    // Computes overall score, generates final report, updates stats
    // ============================================================
    @Transactional
    public FinalReportDTO completeInterview(Long userId, Long sessionId) {

        InterviewSession session = interviewSessionRepository.findById(sessionId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Session not found"
                ));

        if (!session.getUser().getId().equals(userId)) {
            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN, "You do not have access to this session"
            );
        }

        if (!"IN_PROGRESS".equals(session.getStatus())) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "Session is not in progress"
            );
        }

        // Fetch all answered QnAs
        List<SessionQna> qnaList = sessionQnaRepository
                .findBySessionIdOrderByQuestionNumberAsc(sessionId);

        List<SessionQna> answeredQnas = qnaList.stream()
                .filter(q -> q.getUserAnswer() != null 
                       && !q.getUserAnswer().isBlank())
                .toList();

        // Mark unanswered questions explicitly
        qnaList.stream()
                .filter(q -> q.getUserAnswer() == null)
                .forEach(q -> {
                    q.setUserAnswer("UNANSWERED");
                    q.setVerdict("NOT_ATTEMPTED");
                    q.setOverallScore(BigDecimal.ZERO);
                    sessionQnaRepository.save(q);
                });

        if (answeredQnas.isEmpty()) {
            // No answers at all — still generate a report
            session.setOverallScore(0);
            session.setProbability("LOW_CONF");
            session.setRisk("HIGH_RISK");
            session.setStatus("COMPLETED");
            interviewSessionRepository.save(session);

            Report report = new Report();
            report.setSession(session);
            report.setExecutiveSummary("Session was terminated before any questions were answered.");
            report.setStrengths("None identified");
            report.setWeaknesses("No responses recorded");
            report.setRecommendations("Complete a full interview session for accurate assessment");
            reportRepository.save(report);

            return new FinalReportDTO(sessionId, 0, "LOW_CONF", "HIGH_RISK",
                    "Session terminated without answers.", List.of(), List.of(), List.of());
        }

        // Compute overall score as average of per-question scores  
        BigDecimal overallScore = answeredQnas.stream()
                .filter(q -> q.getOverallScore() != null)
                .map(SessionQna::getOverallScore)
                .reduce(BigDecimal.ZERO, BigDecimal::add)
                .divide(BigDecimal.valueOf(answeredQnas.size()), 1, RoundingMode.HALF_UP);

        int overallScoreInt = overallScore.multiply(BigDecimal.TEN).intValue();

        // Build question summaries for final report prompt
        List<String> questionSummaries = answeredQnas.stream()
                .map(q -> "Q%d [%s]: Score %.1f — %s".formatted(
                        q.getQuestionNumber(),
                        q.getTopic(),
                        q.getOverallScore() != null ? q.getOverallScore() : BigDecimal.ZERO,
                        q.getVerdict() != null ? q.getVerdict() : "NO_VERDICT"
                ))
                .toList();

        // Generate final report via Gemini
        log.info("Generating final report for session ID: {}", sessionId);

        FinalReportResponse reportResponse = geminiService.generateFinalReport(
                session.getJobProfile().getJobTitle(),
                overallScoreInt,
                questionSummaries
        );

        // Save report to DB
        Report report = new Report();
        report.setSession(session);
        report.setExecutiveSummary(reportResponse.executiveSummary());
        report.setStrengths(String.join(", ", reportResponse.strengths()));
        report.setWeaknesses(String.join(", ", reportResponse.weaknesses()));
        report.setRecommendations(String.join(", ", reportResponse.recommendations()));
        reportRepository.save(report);

        // Update session status and scores
        session.setOverallScore(overallScoreInt);
        session.setProbability(reportResponse.probability());
        session.setRisk(reportResponse.risk());
        session.setStatus("COMPLETED");
        interviewSessionRepository.save(session);
        log.info("Session {} marked as COMPLETED with score {}", sessionId, overallScoreInt);

        // Update user stats
        updateUserStats(userId, overallScoreInt);

        return new FinalReportDTO(
                sessionId,
                overallScoreInt,
                reportResponse.probability(),
                reportResponse.risk(),
                reportResponse.executiveSummary(),
                reportResponse.strengths(),
                reportResponse.weaknesses(),
                reportResponse.recommendations()
        );
    }

    // ============================================================
    // GET REPORT — fetch existing report for ReportDashboard
    // ============================================================
    public FinalReportDTO getReport(Long userId, Long sessionId) {

        InterviewSession session = interviewSessionRepository.findById(sessionId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Session not found"
                ));

        if (!session.getUser().getId().equals(userId)) {
            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN, "You do not have access to this session"
            );
        }

        Report report = reportRepository.findBySessionId(sessionId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Report not found for this session"
                ));

        return new FinalReportDTO(
                sessionId,
                session.getOverallScore(),
                session.getProbability(),
                session.getRisk(),
                report.getExecutiveSummary(),
                List.of(report.getStrengths().split(", ")),
                List.of(report.getWeaknesses().split(", ")),
                List.of(report.getRecommendations().split(", "))
        );
    }

    // ============================================================
    // PRIVATE UTILITIES
    // ============================================================
    private List<SessionDirective> buildDirectives(
            SessionQna qna,
            List<String> directives
    ) {
        int[] order = {0};
        return directives.stream()
                .map(text -> {
                    SessionDirective directive = new SessionDirective();
                    directive.setQna(qna);
                    directive.setDirectiveText(text);
                    directive.setDisplayOrder(++order[0]);
                    return directive;
                })
                .toList();
    }

    private void updateUserStats(Long userId, int score) {
        userStatsRepository.findByUserId(userId).ifPresent(stats -> {
            stats.setInterviewsCompleted(stats.getInterviewsCompleted() + 1);
            stats.setStreak(stats.getStreak() + 1);
            if (score > stats.getBestScore()) {
                stats.setBestScore(score);
            }
            userStatsRepository.save(stats);
        });
    }
}
