package com.soham.aiinterviewcoach.service;

import com.soham.aiinterviewcoach.dto.ai.InterviewQuestionsResponse;
import com.soham.aiinterviewcoach.dto.ai.JobAnalysisResponse;
import com.soham.aiinterviewcoach.dto.interview.InterviewSessionResponse;
import com.soham.aiinterviewcoach.dto.interview.QuestionDTO;
import com.soham.aiinterviewcoach.dto.interview.StartInterviewRequest;
import com.soham.aiinterviewcoach.entity.*;
import com.soham.aiinterviewcoach.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class InterviewService {

    private final InterviewSessionRepository interviewSessionRepository;
    private final SessionQnaRepository sessionQnaRepository;
    private final JobProfileRepository jobProfileRepository;
    private final UserRepository userRepository;
    private final GeminiService geminiService;

    // ============================================================
    // 1. START INTERVIEW
    // ============================================================
    @Transactional
    public InterviewSessionResponse startInterview(Long userId, StartInterviewRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        JobProfile jobProfile = jobProfileRepository.findById(request.jobProfileId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Job profile not found"));

        if (!jobProfile.getUser().getId().equals(userId)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You do not have access to this job profile");
        }

        // Synergy Ingestion Step: Run lazy analysis if missing
        if (jobProfile.getAnalysisSummary() == null || jobProfile.getSkillsRequired() == null) {
            log.info("Job profile requires parsing. Initializing Gemini analysis matrix...");
            JobAnalysisResponse analysis = geminiService.analyzeJobDescription(
                    jobProfile.getJobTitle(),
                    jobProfile.getJobDescription()
            );
            jobProfile.setSkillsRequired(analysis.skillsRequired());
            jobProfile.setAnalysisSummary(analysis.analysisSummary());
            jobProfileRepository.save(jobProfile);
        }

        // Initialize active simulation session
        InterviewSession session = new InterviewSession();
        session.setUser(user);
        session.setJobProfile(jobProfile);
        session.setReferenceCode(generateReferenceCode());
        session.setStatus("IN_PROGRESS");
        session.setElapsedSeconds(0);

        InterviewSession savedSession = interviewSessionRepository.save(session);

        int questionCount = request.questionCount() != null ? request.questionCount() : 5;
        log.info("Starting interview with questionCount: {}", questionCount);

        // Fetch all questions in one call
        InterviewQuestionsResponse questionsResponse = geminiService.generateAllQuestions(
                jobProfile.getJobTitle(),
                jobProfile.getSkillsRequired(),
                questionCount
        );

        if (questionsResponse.questions() == null || questionsResponse.questions().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "AI layer returned an empty question sequence.");
        }

        // Save all questions
        List<SessionQna> qnaList = questionsResponse.questions()
                .stream()
                .limit(questionCount)
                .map(q -> {
                    SessionQna qna = new SessionQna();
                    qna.setSession(savedSession);
                    qna.setQuestionNumber(q.questionNumber() != null ? q.questionNumber() : 1);
                    qna.setTopic(q.topic());
                    qna.setQuestionText(q.questionText());
                    return qna;
                })
                .toList();

        sessionQnaRepository.saveAll(qnaList);

        return mapToSessionResponse(savedSession, qnaList);
    }

    // ============================================================
    // 2. GET INTERVIEW (Exposes full navigation timeline state)
    // ============================================================
    public InterviewSessionResponse getInterview(Long userId, Long sessionId) {
        InterviewSession session = findOwnedInterviewOrThrow(userId, sessionId);
        List<SessionQna> qnaList = sessionQnaRepository.findBySessionIdOrderByQuestionNumberAsc(sessionId);

        return mapToSessionResponse(session, qnaList);
    }

    // ============================================================
    // 4. UPDATE ELAPSED TIME
    // ============================================================
    @Transactional
    public void updateElapsedTime(Long userId, Long sessionId, Integer elapsedSeconds) {
        InterviewSession session = findOwnedInterviewOrThrow(userId, sessionId);
        session.setElapsedSeconds(elapsedSeconds);
        interviewSessionRepository.save(session);
    }

    // ============================================================
    // 5. TERMINATE INTERVIEW
    // ============================================================
    @Transactional
    public void terminateInterview(Long userId, Long sessionId) {
        InterviewSession session = findOwnedInterviewOrThrow(userId, sessionId);

        if (!"IN_PROGRESS".equals(session.getStatus())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Session is not in progress");
        }

        session.setStatus("TERMINATED");
        interviewSessionRepository.save(session);
    }

    // ============================================================
    // PRIVATE ARCHITECTURAL UTILITIES
    // ============================================================

    private InterviewSession findOwnedInterviewOrThrow(Long userId, Long sessionId) {
        InterviewSession session = interviewSessionRepository.findById(sessionId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Session not found"));

        if (!session.getUser().getId().equals(userId)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You do not have access to this session");
        }
        return session;
    }

    private String generateReferenceCode() {
        return "MISSION_REF-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
    }

    private InterviewSessionResponse mapToSessionResponse(InterviewSession session, List<SessionQna> qnaList) {
        List<QuestionDTO> questions = qnaList.stream()
                .map(q -> new QuestionDTO(
                        q.getId(),
                        q.getQuestionNumber(),
                        q.getTopic(),
                        q.getQuestionText()
                ))
                .toList();

        return new InterviewSessionResponse(
                session.getId(),
                session.getReferenceCode(),
                session.getStatus(),
                session.getJobProfile().getJobTitle(),
                session.getJobProfile().getCompany(),
                session.getElapsedSeconds(),
                questions
        );
    }
}