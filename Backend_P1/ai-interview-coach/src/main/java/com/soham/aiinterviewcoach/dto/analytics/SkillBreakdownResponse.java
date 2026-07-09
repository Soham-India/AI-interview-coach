package com.soham.aiinterviewcoach.dto.analytics;

public record SkillBreakdownResponse(
        Integer technicalScore,
        Integer communicationScore,
        Integer confidenceScore,
        Integer structureScore
) {}
