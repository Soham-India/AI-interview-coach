package com.soham.aiinterviewcoach.controller;

import com.soham.aiinterviewcoach.dto.user.*;
import com.soham.aiinterviewcoach.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/{userId}/profile")
    public ResponseEntity<UserResponse> getProfile(@PathVariable Long userId) {
        return ResponseEntity.ok(userService.getProfile(userId));
    }

    @PatchMapping("/{userId}/profile")
    public ResponseEntity<UserResponse> updateProfile(
            @PathVariable Long userId,
            @RequestBody ProfileUpdateRequest request
    ) {
        return ResponseEntity.ok(userService.updateProfile(userId, request));
    }

    @GetMapping("/{userId}/stats")
    public ResponseEntity<UserStatsResponse> getStats(@PathVariable Long userId) {
        return ResponseEntity.ok(userService.getUserStats(userId));
    }

    @GetMapping("/{userId}/preferences")
    public ResponseEntity<UserPreferencesDTO> getPreferences(@PathVariable Long userId) {
        return ResponseEntity.ok(userService.getPreferences(userId));
    }

    @PatchMapping("/{userId}/preferences")
    public ResponseEntity<UserPreferencesDTO> updatePreferences(
            @PathVariable Long userId,
            @RequestBody UserPreferencesDTO request
    ) {
        return ResponseEntity.ok(userService.updatePreferences(userId, request));
    }
}
