package com.soham.aiinterviewcoach.dto.job;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record JobProfileRequest(
        @NotBlank(message = "Job title is required")
        @Size(max = 150)
        String jobTitle,

        @Size(max = 100)
        String company,

        @NotBlank(message = "Job description is required")
        String jobDescription
) {}