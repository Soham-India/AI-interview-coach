package com.soham.aiinterviewcoach.controller;

import com.soham.aiinterviewcoach.dto.interview.*;
import com.soham.aiinterviewcoach.security.AuthenticatedUserProvider;
import com.soham.aiinterviewcoach.service.InterviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users/me/interviews")
@RequiredArgsConstructor
public class InterviewController {

    private final InterviewService interviewService;
    private final AuthenticatedUserProvider userProvider;

    @PostMapping("/start")
    public ResponseEntity<InterviewSessionResponse> start(
            Authentication auth,
            @RequestBody StartInterviewRequest request
    ) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(interviewService.startInterview(userProvider.getUserId(auth), request));
    }

    @GetMapping("/{sessionId}")
    public ResponseEntity<InterviewSessionResponse> getSession(
            Authentication auth,
            @PathVariable Long sessionId
    ) {
        return ResponseEntity.ok(interviewService.getInterview(userProvider.getUserId(auth), sessionId));
    }

    @PostMapping("/{sessionId}/next-question")
    public ResponseEntity<QuestionDTO> nextQuestion(
            Authentication auth,
            @PathVariable Long sessionId
    ) {
        return ResponseEntity.ok(interviewService.generateNextQuestion(userProvider.getUserId(auth), sessionId));
    }

    @PatchMapping("/{sessionId}/elapsed-time")
    public ResponseEntity<Void> updateElapsedTime(
            Authentication auth,
            @PathVariable Long sessionId,
            @RequestParam Integer seconds
    ) {
        interviewService.updateElapsedTime(userProvider.getUserId(auth), sessionId, seconds);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{sessionId}/terminate")
    public ResponseEntity<Void> terminate(
            Authentication auth,
            @PathVariable Long sessionId
    ) {
        interviewService.terminateInterview(userProvider.getUserId(auth), sessionId);
        return ResponseEntity.noContent().build();
    }
}
