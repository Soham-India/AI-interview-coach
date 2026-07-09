package com.soham.aiinterviewcoach.dto.archive;

import java.time.LocalDateTime;
import java.util.List;

public record SessionDetailsResponse(
        Long id,
        String referenceCode,
        String jobTitle,
        String company,
        Integer overallScore,
        String status,
        String probability,
        String risk,
        Integer elapsedSeconds,
        LocalDateTime createdAt,
        List<QnaHistoryDTO> transcript
) {
}
