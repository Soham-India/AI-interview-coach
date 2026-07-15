package com.soham.aiinterviewcoach.controller;

import com.soham.aiinterviewcoach.dto.quota.QuotaStatusResponse;
import com.soham.aiinterviewcoach.service.QuotaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/quota")
@RequiredArgsConstructor
public class QuotaController {

    private final QuotaService quotaService;

    @GetMapping("/status")
    public ResponseEntity<QuotaStatusResponse> getStatus() {
        return ResponseEntity.ok(quotaService.getStatus());
    }
}
