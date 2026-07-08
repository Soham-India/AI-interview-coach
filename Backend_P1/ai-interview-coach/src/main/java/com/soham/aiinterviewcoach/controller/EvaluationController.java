package com.soham.aiinterviewcoach.controller;

import com.soham.aiinterviewcoach.dto.evaluation.*;
import com.soham.aiinterviewcoach.service.EvaluationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users/{userId}/interviews/{sessionId}")
@RequiredArgsConstructor
public class EvaluationController {

    private final EvaluationService evaluationService;

    @PostMapping("/questions/{qnaId}/answer")
    public ResponseEntity<EvaluationResponse> submitAnswer(
            @PathVariable Long userId,
            @PathVariable Long sessionId,
            @PathVariable Long qnaId,
            @RequestBody AnswerSubmitRequest request
    ) {
        return ResponseEntity.ok(
                evaluationService.submitAnswer(userId, sessionId, qnaId, request)
        );
    }

    @PostMapping("/complete")
    public ResponseEntity<FinalReportDTO> complete(
            @PathVariable Long userId,
            @PathVariable Long sessionId
    ) {
        return ResponseEntity.ok(
                evaluationService.completeInterview(userId, sessionId)
        );
    }

    @GetMapping("/report")
    public ResponseEntity<FinalReportDTO> getReport(
            @PathVariable Long userId,
            @PathVariable Long sessionId
    ) {
        return ResponseEntity.ok(
                evaluationService.getReport(userId, sessionId)
        );
    }
}
