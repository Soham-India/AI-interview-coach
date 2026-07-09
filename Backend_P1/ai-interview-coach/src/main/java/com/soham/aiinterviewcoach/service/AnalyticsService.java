package com.soham.aiinterviewcoach.service;

import com.soham.aiinterviewcoach.dto.analytics.*;
import com.soham.aiinterviewcoach.entity.InterviewSession;
import com.soham.aiinterviewcoach.entity.QnaEvaluation;
import com.soham.aiinterviewcoach.entity.SessionQna;
import com.soham.aiinterviewcoach.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AnalyticsService {

    private final InterviewSessionRepository interviewSessionRepository;
    private final SessionQnaRepository sessionQnaRepository;

    @Transactional(readOnly = true)
    public AnalyticsSummaryResponse getSummary(Long userId) {

        List<InterviewSession> completed = interviewSessionRepository
                .findByUserIdAndStatus(userId, "COMPLETED");

        int totalInterviews = completed.size();

        if (totalInterviews == 0) {
            return new AnalyticsSummaryResponse(0, 0, 0, 0, List.of());
        }

        double averageScore = completed.stream()
                .filter(s -> s.getOverallScore() != null)
                .mapToInt(InterviewSession::getOverallScore)
                .average()
                .orElse(0);

        int bestScore = completed.stream()
                .filter(s -> s.getOverallScore() != null)
                .mapToInt(InterviewSession::getOverallScore)
                .max()
                .orElse(0);

        long successCount = completed.stream()
                .filter(s -> s.getOverallScore() != null && s.getOverallScore() >= 70)
                .count();

        int successRate = (int) Math.round((successCount * 100.0) / totalInterviews);

        List<ScoreTimelinePoint> timeline = completed.stream()
                .filter(s -> s.getOverallScore() != null)
                .sorted((a, b) -> a.getCreatedAt().compareTo(b.getCreatedAt()))
                .skip(Math.max(0, completed.size() - 10))
                .map(s -> new ScoreTimelinePoint(
                        "SESSION " + String.format("%02d", s.getId()),
                        s.getOverallScore(),
                        s.getCreatedAt()
                ))
                .toList();

        return new AnalyticsSummaryResponse(
                totalInterviews,
                (int) Math.round(averageScore),
                bestScore,
                successRate,
                timeline
        );
    }

    @Transactional(readOnly = true)
    public SkillBreakdownResponse getSkillBreakdown(Long userId) {

        List<InterviewSession> sessions = interviewSessionRepository
                .findByUserIdAndStatus(userId, "COMPLETED");

        if (sessions.isEmpty()) {
            return new SkillBreakdownResponse(0, 0, 0, 0);
        }

        List<QnaEvaluation> evaluations = sessions.stream()
                .flatMap(session ->
                        sessionQnaRepository
                                .findBySessionIdOrderByQuestionNumberAsc(session.getId())
                                .stream()
                                .map(SessionQna::getQnaEvaluation)
                                .filter(e -> e != null)
                )
                .toList();

        if (evaluations.isEmpty()) {
            return new SkillBreakdownResponse(0, 0, 0, 0);
        }

        int avgTechnical = averageOf(evaluations.stream()
                .map(QnaEvaluation::getTechnicalScore).toList());

        int avgCommunication = averageOf(evaluations.stream()
                .map(QnaEvaluation::getCommunicationScore).toList());

        int avgConfidence = averageOf(evaluations.stream()
                .map(QnaEvaluation::getConfidenceScore).toList());

        int avgStructure = averageOf(evaluations.stream()
                .map(QnaEvaluation::getStructureScore).toList());

        return new SkillBreakdownResponse(
                avgTechnical,
                avgCommunication,
                avgConfidence,
                avgStructure
        );
    }

    @Transactional(readOnly = true)
    public List<TopicDistributionDTO> getTopicDistribution(Long userId) {

        List<InterviewSession> sessions = interviewSessionRepository
                .findByUserIdAndStatus(userId, "COMPLETED");

        if (sessions.isEmpty()) {
            return List.of();
        }

        return sessions.stream()
                .flatMap(session ->
                        sessionQnaRepository
                                .findBySessionIdOrderByQuestionNumberAsc(session.getId())
                                .stream()
                )
                .filter(qna -> qna.getTopic() != null)
                .collect(Collectors.groupingBy(
                        SessionQna::getTopic,
                        Collectors.counting()
                ))
                .entrySet().stream()
                .map(entry -> new TopicDistributionDTO(
                        entry.getKey(),
                        entry.getValue().intValue()
                ))
                .sorted((a, b) -> b.count() - a.count())
                .toList();
    }

    private int averageOf(List<BigDecimal> values) {
        return (int) Math.round(
                values.stream()
                        .filter(v -> v != null)
                        .mapToDouble(BigDecimal::doubleValue)
                        .average()
                        .orElse(0)
        );
    }
}
