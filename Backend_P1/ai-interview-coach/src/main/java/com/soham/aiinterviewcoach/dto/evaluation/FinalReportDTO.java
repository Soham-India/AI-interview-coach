package com.soham.aiinterviewcoach.dto.evaluation;

import java.util.List;

public record FinalReportDTO(
        Long sessionId,
        Integer overallScore,
        String probability,
        String risk,
        String executiveSummary,
        List<String> strengths,
        List<String> weaknesses,
        List<String> recommendations
) {}
