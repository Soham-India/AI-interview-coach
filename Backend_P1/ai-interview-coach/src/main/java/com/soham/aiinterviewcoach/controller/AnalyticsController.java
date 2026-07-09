package com.soham.aiinterviewcoach.controller;

import com.soham.aiinterviewcoach.dto.analytics.*;
import com.soham.aiinterviewcoach.security.AuthenticatedUser;
import com.soham.aiinterviewcoach.service.AnalyticsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users/me/analytics")
@RequiredArgsConstructor
public class AnalyticsController {

    private final AnalyticsService analyticsService;

    @GetMapping("/summary")
    public ResponseEntity<AnalyticsSummaryResponse> getSummary(
            @AuthenticationPrincipal AuthenticatedUser user
    ) {
        return ResponseEntity.ok(analyticsService.getSummary(user.getId()));
    }

    @GetMapping("/skills")
    public ResponseEntity<SkillBreakdownResponse> getSkills(
            @AuthenticationPrincipal AuthenticatedUser user
    ) {
        return ResponseEntity.ok(analyticsService.getSkillBreakdown(user.getId()));
    }

    @GetMapping("/distribution")
    public ResponseEntity<List<TopicDistributionDTO>> getDistribution(
            @AuthenticationPrincipal AuthenticatedUser user
    ) {
        return ResponseEntity.ok(analyticsService.getTopicDistribution(user.getId()));
    }
}
