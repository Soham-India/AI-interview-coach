package com.soham.aiinterviewcoach.dto.evaluation;

import java.math.BigDecimal;
import java.util.List;

public record EvaluationResponse(
        Long qnaId,
        String verdict,
        String aiFeedback,
        BigDecimal overallScore,
        BigDecimal technicalScore,
        BigDecimal communicationScore,
        BigDecimal confidenceScore,
        BigDecimal structureScore,
        List<String> directives
) {}
