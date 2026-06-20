package com.soham.aiinterviewcoach.dto.user;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

public record UserPreferencesDTO(
        @Min(value = 1, message = "Minimum interview length is 1 question")
        @Max(value = 30, message = "Maximum interview length is 30 questions")
        Integer interviewLength,

        @NotBlank(message = "Difficulty is required")
        String difficulty,

        @NotBlank(message = "Theme is required")
        String theme
) {}