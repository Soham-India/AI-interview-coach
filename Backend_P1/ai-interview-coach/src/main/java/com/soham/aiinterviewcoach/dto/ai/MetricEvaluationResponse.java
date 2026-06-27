package com.soham.aiinterviewcoach.dto.ai;

import java.math.BigDecimal;
import java.util.List;

public record MetricEvaluationResponse(
        BigDecimal technicalScore,
        BigDecimal communicationScore,
        BigDecimal confidenceScore,
        BigDecimal structureScore,
        BigDecimal overallScore,
        String verdict,
        String aiFeedback,
        List<String> directives
) {}
