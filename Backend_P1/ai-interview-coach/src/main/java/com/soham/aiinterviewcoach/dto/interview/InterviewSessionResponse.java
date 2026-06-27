package com.soham.aiinterviewcoach.dto.interview;

import java.util.List;

public record InterviewSessionResponse(
        Long sessionId,
        String referenceCode,
        String status,
        String jobTitle,
        String company,
        Integer elapsedSeconds,
        List<QuestionDTO> questions
) {}
