package com.soham.aiinterviewcoach.controller;

import com.soham.aiinterviewcoach.dto.interview.*;
import com.soham.aiinterviewcoach.security.AuthenticatedUser;
import com.soham.aiinterviewcoach.service.InterviewService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users/me/interviews")
@RequiredArgsConstructor
public class InterviewController {

    private final InterviewService interviewService;

    @PostMapping("/start")
    public ResponseEntity<InterviewSessionResponse> start(
            @AuthenticationPrincipal AuthenticatedUser user,
            @Valid @RequestBody StartInterviewRequest request
    ) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(interviewService.startInterview(user.getId(), request));
    }

    @GetMapping("/{sessionId}")
    public ResponseEntity<InterviewSessionResponse> getSession(
            @AuthenticationPrincipal AuthenticatedUser user,
            @PathVariable Long sessionId
    ) {
        return ResponseEntity.ok(interviewService.getInterview(user.getId(), sessionId));
    }

    @PostMapping("/{sessionId}/next-question")
    public ResponseEntity<QuestionDTO> nextQuestion(
            @AuthenticationPrincipal AuthenticatedUser user,
            @PathVariable Long sessionId
    ) {
        return ResponseEntity.ok(interviewService.generateNextQuestion(user.getId(), sessionId));
    }

    @PatchMapping("/{sessionId}/elapsed-time")
    public ResponseEntity<Void> updateElapsedTime(
            @AuthenticationPrincipal AuthenticatedUser user,
            @PathVariable Long sessionId,
            @RequestParam Integer seconds
    ) {
        interviewService.updateElapsedTime(user.getId(), sessionId, seconds);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{sessionId}/terminate")
    public ResponseEntity<Void> terminate(
            @AuthenticationPrincipal AuthenticatedUser user,
            @PathVariable Long sessionId
    ) {
        interviewService.terminateInterview(user.getId(), sessionId);
        return ResponseEntity.noContent().build();
    }
}
