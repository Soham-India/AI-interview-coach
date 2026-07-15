package com.soham.aiinterviewcoach.dto.quota;

public record QuotaStatusResponse(
        int used,
        int limit,
        boolean warning,
        boolean blocked
) {}
