package com.soham.aiinterviewcoach.dto.user;

import jakarta.validation.constraints.Size;

public record ProfileUpdateRequest(
        @Size(max = 100)
        String name,

        @Size(max = 50)
        String callsign,

        @Size(max = 100)
        String role,

        @Size(max = 500)
        String avatarUrl
) {}