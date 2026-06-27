package com.soham.aiinterviewcoach.dto.ai;

import java.util.List;

public record FinalReportResponse(
        String executiveSummary,
        List<String> strengths,
        List<String> weaknesses,
        List<String> recommendations,
        String probability,
        String risk
) {}
