package com.soham.aiinterviewcoach.dto.evaluation;

import jakarta.validation.constraints.NotBlank;

public record AnswerSubmitRequest(
        @NotBlank(message = "Answer is required")
        String answer
) {}
