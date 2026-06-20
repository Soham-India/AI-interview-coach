package com.soham.aiinterviewcoach.dto.user;

public record UserStatsResponse(
        Integer interviewsCompleted,
        Integer bestScore,
        Integer streak,
        Integer studyHours
) {}