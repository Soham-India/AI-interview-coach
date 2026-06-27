package com.soham.aiinterviewcoach.dto.ai;

import java.util.List;

public record InterviewQuestionsResponse(
        List<InterviewQuestionDTO> questions
) {}
