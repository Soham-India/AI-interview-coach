package com.soham.aiinterviewcoach.dto.analytics;

import java.util.List;

public record AnalyticsSummaryResponse(
        Integer totalInterviews,
        Integer averageScore,
        Integer bestScore,
        Integer successRate,
        List<ScoreTimelinePoint> timeline
) {}
