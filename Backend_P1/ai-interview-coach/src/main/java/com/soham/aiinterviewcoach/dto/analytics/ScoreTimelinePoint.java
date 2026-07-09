package com.soham.aiinterviewcoach.dto.analytics;

import java.time.LocalDateTime;

public record ScoreTimelinePoint(
        String label,
        Integer score,
        LocalDateTime createdAt
) {}
