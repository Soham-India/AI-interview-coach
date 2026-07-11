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

        // Fetch questions to build the initial full response payload
        InterviewQuestionsResponse questionsResponse = geminiService.generateInterviewQuestions(
                jobProfile.getJobTitle(),
                jobProfile.getSkillsRequired(),
                List.of(), // empty history — fresh session
                userId,
                questionCount
        );

        if (questionsResponse.questions() == null || questionsResponse.questions().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "AI layer returned an empty question sequence.");
        }

        // Save all questions
        List<SessionQna> qnaList = new java.util.ArrayList<>();
        int qNum = 1;
        for (var q : questionsResponse.questions()) {
            if (qNum > questionCount) break;
            SessionQna qna = new SessionQna();
            qna.setSession(savedSession);
            qna.setQuestionNumber(qNum++);
            qna.setTopic(q.topic());
            qna.setQuestionText(q.questionText());
            qnaList.add(qna);
        }

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
    // 3. GENERATE NEXT QUESTION (Called manually or via EvaluationService)
    // ============================================================
    @Transactional
    public QuestionDTO generateNextQuestion(Long userId, Long sessionId) {
        InterviewSession session = findOwnedInterviewOrThrow(userId, sessionId);

        if (!"IN_PROGRESS".equals(session.getStatus())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Cannot generate questions for an inactive session");
        }

        List<SessionQna> history = sessionQnaRepository.findBySessionIdOrderByQuestionNumberAsc(sessionId);

        // Guard: Prevent generating a new question if the current active one hasn't been answered yet
        if (!history.isEmpty()) {
            SessionQna activeQna = history.get(history.size() - 1);
            if (activeQna.getUserAnswer() == null) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "The active interview question must be answered first.");
            }
        }

        SessionQna newQna = generateAndSaveQuestionInternal(session, session.getJobProfile(), userId);

        return new QuestionDTO(
                newQna.getId(),
                newQna.getQuestionNumber(),
                newQna.getTopic(),
                newQna.getQuestionText()
        );
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
    private SessionQna generateAndSaveQuestionInternal(InterviewSession session, JobProfile jobProfile, Long userId) {
        List<SessionQna> history = sessionQnaRepository.findBySessionIdOrderByQuestionNumberAsc(session.getId());

        // Decoupled AI call: Pass data variables, let GeminiService handle context and preference loading
        InterviewQuestionsResponse aiResponse = geminiService.generateInterviewQuestions(
                jobProfile.getJobTitle(),
                jobProfile.getSkillsRequired(),
                history,
                userId,
                1 // Only generate 1 question when generating next question
        );

        if (aiResponse.questions() == null || aiResponse.questions().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "AI layer returned an empty question sequence.");
        }

        var incomingQuestion = aiResponse.questions().get(0);

        SessionQna qna = new SessionQna();
        qna.setSession(session);
        qna.setQuestionNumber(history.size() + 1);
        qna.setTopic(incomingQuestion.topic());
        qna.setQuestionText(incomingQuestion.questionText());

        return sessionQnaRepository.save(qna);
    }

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