package com.soham.aiinterviewcoach.controller;

import com.soham.aiinterviewcoach.dto.evaluation.*;
import com.soham.aiinterviewcoach.security.AuthenticatedUser;
import com.soham.aiinterviewcoach.service.EvaluationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users/me/interviews/{sessionId}")
@RequiredArgsConstructor
public class EvaluationController {

    private final EvaluationService evaluationService;

    @PostMapping("/questions/{qnaId}/answer")
    public ResponseEntity<EvaluationResponse> submitAnswer(
            @AuthenticationPrincipal AuthenticatedUser user,
            @PathVariable Long sessionId,
            @PathVariable Long qnaId,
            @RequestBody AnswerSubmitRequest request
    ) {
        return ResponseEntity.ok(
                evaluationService.submitAnswer(user.getId(), sessionId, qnaId, request)
        );
    }

    @PostMapping("/complete")
    public ResponseEntity<FinalReportDTO> complete(
            @AuthenticationPrincipal AuthenticatedUser user,
            @PathVariable Long sessionId
    ) {
        return ResponseEntity.ok(
                evaluationService.completeInterview(user.getId(), sessionId)
        );
    }

    @GetMapping("/report")
    public ResponseEntity<FinalReportDTO> getReport(
            @AuthenticationPrincipal AuthenticatedUser user,
            @PathVariable Long sessionId
    ) {
        return ResponseEntity.ok(
                evaluationService.getReport(user.getId(), sessionId)
        );
    }
}
