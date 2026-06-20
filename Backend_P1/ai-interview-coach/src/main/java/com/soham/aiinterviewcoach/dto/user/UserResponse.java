package com.soham.aiinterviewcoach.dto.user;

public record UserResponse(
        Long id,
        String name,
        String email,
        String callsign,
        String role,
        String avatarUrl
) {}