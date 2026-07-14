package com.soham.aiinterviewcoach.dto.user;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

public record UserPreferencesDTO(
        @Min(value = 1, message = "Minimum interview length is 10 mins")
        @Max(value = 60, message = "Maximum interview length is 60 mins")
        Integer interviewLength,

        String difficulty,

        Integer questionCount
) {}