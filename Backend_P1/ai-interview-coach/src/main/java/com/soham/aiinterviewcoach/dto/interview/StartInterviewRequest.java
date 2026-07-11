package com.soham.aiinterviewcoach.dto.interview;

import jakarta.validation.constraints.NotNull;

public record StartInterviewRequest(
        @NotNull(message = "Job profile ID is required")
        Long jobProfileId,
        Integer questionCount
) {}
