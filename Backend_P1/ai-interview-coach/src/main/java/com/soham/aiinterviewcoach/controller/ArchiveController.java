package com.soham.aiinterviewcoach.controller;

import com.soham.aiinterviewcoach.dto.archive.*;
import com.soham.aiinterviewcoach.security.AuthenticatedUser;
import com.soham.aiinterviewcoach.service.ArchiveService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users/me/archive")
@RequiredArgsConstructor
public class ArchiveController {

    private final ArchiveService archiveService;

    @GetMapping
    public ResponseEntity<List<ArchiveSessionResponse>> getArchive(
            @AuthenticationPrincipal AuthenticatedUser user,
            @RequestParam(required = false) String status
    ) {
        if (status != null && !status.isBlank()) {
            return ResponseEntity.ok(
                    archiveService.getSessionsByStatus(user.getId(), status.toUpperCase())
            );
        }
        return ResponseEntity.ok(archiveService.getAllSessions(user.getId()));
    }

    @GetMapping("/{sessionId}")
    public ResponseEntity<SessionDetailsResponse> getDetail(
            @AuthenticationPrincipal AuthenticatedUser user,
            @PathVariable Long sessionId
    ) {
        return ResponseEntity.ok(
                archiveService.getSessionDetail(user.getId(), sessionId)
        );
    }
}
