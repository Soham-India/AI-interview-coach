package com.soham.aiinterviewcoach.dto.interview;

public record QuestionDTO(
        Long id,
        Integer questionNumber,
        String topic,
        String questionText
) {}
