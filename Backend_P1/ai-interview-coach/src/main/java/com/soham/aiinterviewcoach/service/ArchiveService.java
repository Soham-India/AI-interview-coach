package com.soham.aiinterviewcoach.service;

import com.soham.aiinterviewcoach.dto.archive.*;
import com.soham.aiinterviewcoach.entity.*;
import com.soham.aiinterviewcoach.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
public class ArchiveService {

    private final InterviewSessionRepository interviewSessionRepository;
    private final SessionQnaRepository sessionQnaRepository;

    public List<ArchiveSessionResponse> getAllSessions(Long userId) {
        return interviewSessionRepository
                .findByUserIdOrderByCreatedAtDesc(userId)
                .stream()
                .map(this::mapToArchiveResponse)
                .toList();
    }

    public List<ArchiveSessionResponse> getSessionsByStatus(Long userId, String status) {
        return interviewSessionRepository
                .findByUserIdAndStatus(userId, status)
                .stream()
                .map(this::mapToArchiveResponse)
                .toList();
    }

    public SessionDetailsResponse getSessionDetail(Long userId, Long sessionId) {

        InterviewSession session = interviewSessionRepository.findById(sessionId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Session not found"
                ));

        if (!session.getUser().getId().equals(userId)) {
            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN, "Access denied"
            );
        }

        List<SessionQna> qnas = sessionQnaRepository
                .findBySessionIdOrderByQuestionNumberAsc(sessionId);

        List<QnaHistoryDTO> transcript = qnas.stream()
                .map(qna -> {
                    QnaEvaluation eval = qna.getQnaEvaluation();

                    List<String> directives = qna.getSessionDirectives() != null
                            ? qna.getSessionDirectives().stream()
                                    .map(SessionDirective::getDirectiveText)
                                    .toList()
                            : List.of();

                    return new QnaHistoryDTO(
                            qna.getId(),
                            qna.getQuestionNumber(),
                            qna.getTopic(),
                            qna.getQuestionText(),
                            qna.getUserAnswer(),
                            eval != null ? eval.getTechnicalScore() : null,
                            eval != null ? eval.getCommunicationScore() : null,
                            eval != null ? eval.getConfidenceScore() : null,
                            eval != null ? eval.getStructureScore() : null,
                            qna.getOverallScore(),
                            qna.getVerdict(),
                            qna.getAiFeedback(),
                            directives
                    );
                })
                .toList();

        return new SessionDetailsResponse(
                session.getId(),
                session.getReferenceCode(),
                session.getJobProfile().getJobTitle(),
                session.getJobProfile().getCompany(),
                session.getOverallScore(),
                session.getStatus(),
                session.getProbability(),
                session.getRisk(),
                session.getElapsedSeconds(),
                session.getCreatedAt(),
                transcript
        );
    }

    private ArchiveSessionResponse mapToArchiveResponse(InterviewSession session) {
        return new ArchiveSessionResponse(
                session.getId(),
                session.getReferenceCode(),
                session.getJobProfile().getJobTitle(),
                session.getJobProfile().getCompany(),
                session.getOverallScore(),
                session.getStatus(),
                session.getProbability(),
                session.getRisk(),
                session.getElapsedSeconds(),
                session.getCreatedAt()
        );
    }
}
