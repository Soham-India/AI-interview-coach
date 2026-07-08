package com.soham.aiinterviewcoach.dto.auth;

import com.soham.aiinterviewcoach.dto.user.UserResponse;

public record AuthResponse(
        String token,
        UserResponse user
) {
}
