package com.soham.aiinterviewcoach.controller;

import com.soham.aiinterviewcoach.dto.user.*;
import com.soham.aiinterviewcoach.security.AuthenticatedUser;
import com.soham.aiinterviewcoach.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users/me")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/profile")
    public ResponseEntity<UserResponse> getProfile(
            @AuthenticationPrincipal AuthenticatedUser user
    ) {
        return ResponseEntity.ok(userService.getProfile(user.getId()));
    }

    @PatchMapping("/profile")
    public ResponseEntity<UserResponse> updateProfile(
            @AuthenticationPrincipal AuthenticatedUser user,
            @RequestBody ProfileUpdateRequest request
    ) {
        return ResponseEntity.ok(userService.updateProfile(user.getId(), request));
    }

    @GetMapping("/stats")
    public ResponseEntity<UserStatsResponse> getStats(
            @AuthenticationPrincipal AuthenticatedUser user
    ) {
        return ResponseEntity.ok(userService.getUserStats(user.getId()));
    }

    @GetMapping("/preferences")
    public ResponseEntity<UserPreferencesDTO> getPreferences(
            @AuthenticationPrincipal AuthenticatedUser user
    ) {
        return ResponseEntity.ok(userService.getPreferences(user.getId()));
    }

    @PatchMapping("/preferences")
    public ResponseEntity<UserPreferencesDTO> updatePreferences(
            @AuthenticationPrincipal AuthenticatedUser user,
            @RequestBody UserPreferencesDTO request
    ) {
        return ResponseEntity.ok(userService.updatePreferences(user.getId(), request));
    }
}