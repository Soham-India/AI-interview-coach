package com.soham.aiinterviewcoach.controller;

import com.soham.aiinterviewcoach.dto.user.*;
import com.soham.aiinterviewcoach.security.AuthenticatedUserProvider;
import com.soham.aiinterviewcoach.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users/me")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final AuthenticatedUserProvider userProvider;

    @GetMapping("/profile")
    public ResponseEntity<UserResponse> getProfile(Authentication auth) {
        return ResponseEntity.ok(
                userService.getProfile(userProvider.getUserId(auth))
        );
    }

    @PatchMapping("/profile")
    public ResponseEntity<UserResponse> updateProfile(
            Authentication auth,
            @RequestBody ProfileUpdateRequest request
    ) {
        return ResponseEntity.ok(
                userService.updateProfile(userProvider.getUserId(auth), request)
        );
    }

    @GetMapping("/stats")
    public ResponseEntity<UserStatsResponse> getStats(Authentication auth) {
        return ResponseEntity.ok(
                userService.getUserStats(userProvider.getUserId(auth))
        );
    }

    @GetMapping("/preferences")
    public ResponseEntity<UserPreferencesDTO> getPreferences(Authentication auth) {
        return ResponseEntity.ok(
                userService.getPreferences(userProvider.getUserId(auth))
        );
    }

    @PatchMapping("/preferences")
    public ResponseEntity<UserPreferencesDTO> updatePreferences(
            Authentication auth,
            @RequestBody UserPreferencesDTO request
    ) {
        return ResponseEntity.ok(
                userService.updatePreferences(userProvider.getUserId(auth), request)
        );
    }
}