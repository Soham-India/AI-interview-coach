package com.soham.aiinterviewcoach.dto.archive;

import java.math.BigDecimal;
import java.util.List;

public record QnaHistoryDTO(
        Long id,
        Integer questionNumber,
        String topic,
        String questionText,
        String userAnswer,
        BigDecimal technicalScore,
        BigDecimal communicationScore,
        BigDecimal confidenceScore,
        BigDecimal structureScore,
        BigDecimal overallScore,
        String verdict,
        String aiFeedback,
        List<String> directives
) {
}
