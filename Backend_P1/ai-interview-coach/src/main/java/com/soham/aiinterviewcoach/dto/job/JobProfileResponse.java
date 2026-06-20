package com.soham.aiinterviewcoach.dto.job;

import java.time.LocalDateTime;

public record JobProfileResponse(
        Long id,
        String jobTitle,
        String company,
        String jobDescription,
        String skillsRequired,
        String analysisSummary,
        LocalDateTime createdAt
) {}