package com.soham.aiinterviewcoach.controller;

import com.soham.aiinterviewcoach.dto.evaluation.*;
import com.soham.aiinterviewcoach.security.AuthenticatedUserProvider;
import com.soham.aiinterviewcoach.service.EvaluationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users/me/interviews/{sessionId}")
@RequiredArgsConstructor
public class EvaluationController {

    private final EvaluationService evaluationService;
    private final AuthenticatedUserProvider userProvider;

    @PostMapping("/questions/{qnaId}/answer")
    public ResponseEntity<EvaluationResponse> submitAnswer(
            Authentication auth,
            @PathVariable Long sessionId,
            @PathVariable Long qnaId,
            @RequestBody AnswerSubmitRequest request
    ) {
        return ResponseEntity.ok(
                evaluationService.submitAnswer(userProvider.getUserId(auth), sessionId, qnaId, request)
        );
    }

    @PostMapping("/complete")
    public ResponseEntity<FinalReportDTO> complete(
            Authentication auth,
            @PathVariable Long sessionId
    ) {
        return ResponseEntity.ok(
                evaluationService.completeInterview(userProvider.getUserId(auth), sessionId)
        );
    }

    @GetMapping("/report")
    public ResponseEntity<FinalReportDTO> getReport(
            Authentication auth,
            @PathVariable Long sessionId
    ) {
        return ResponseEntity.ok(
                evaluationService.getReport(userProvider.getUserId(auth), sessionId)
        );
    }
}
