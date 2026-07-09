package com.soham.aiinterviewcoach.dto.archive;

import java.time.LocalDateTime;

public record ArchiveSessionResponse(
        Long id,
        String referenceCode,
        String jobTitle,
        String company,
        Integer overallScore,
        String status,
        String probability,
        String risk,
        Integer elapsedSeconds,
        LocalDateTime createdAt
) {
}
