package com.soham.aiinterviewcoach.controller;

import com.soham.aiinterviewcoach.dto.interview.*;
import com.soham.aiinterviewcoach.service.InterviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users/{userId}/interviews")
@RequiredArgsConstructor
public class InterviewController {

    private final InterviewService interviewService;

    @PostMapping("/start")
    public ResponseEntity<InterviewSessionResponse> start(
            @PathVariable Long userId,
            @RequestBody StartInterviewRequest request
    ) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(interviewService.startInterview(userId, request));
    }

    @GetMapping("/{sessionId}")
    public ResponseEntity<InterviewSessionResponse> getSession(
            @PathVariable Long userId,
            @PathVariable Long sessionId
    ) {
        return ResponseEntity.ok(interviewService.getInterview(userId, sessionId));
    }

    @PostMapping("/{sessionId}/next-question")
    public ResponseEntity<QuestionDTO> nextQuestion(
            @PathVariable Long userId,
            @PathVariable Long sessionId
    ) {
        return ResponseEntity.ok(interviewService.generateNextQuestion(userId, sessionId));
    }

    @PatchMapping("/{sessionId}/elapsed-time")
    public ResponseEntity<Void> updateElapsedTime(
            @PathVariable Long userId,
            @PathVariable Long sessionId,
            @RequestParam Integer seconds
    ) {
        interviewService.updateElapsedTime(userId, sessionId, seconds);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{sessionId}/terminate")
    public ResponseEntity<Void> terminate(
            @PathVariable Long userId,
            @PathVariable Long sessionId
    ) {
        interviewService.terminateInterview(userId, sessionId);
        return ResponseEntity.noContent().build();
    }
}
