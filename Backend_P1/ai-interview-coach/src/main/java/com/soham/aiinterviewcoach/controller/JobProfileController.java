package com.soham.aiinterviewcoach.controller;

import com.soham.aiinterviewcoach.dto.job.JobProfileRequest;
import com.soham.aiinterviewcoach.dto.job.JobProfileResponse;
import com.soham.aiinterviewcoach.security.AuthenticatedUser;
import com.soham.aiinterviewcoach.service.JobProfileService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users/me/jobs")
@RequiredArgsConstructor
public class JobProfileController {

    private final JobProfileService jobProfileService;

    @PostMapping
    public ResponseEntity<JobProfileResponse> create(
            @AuthenticationPrincipal AuthenticatedUser user,
            @Valid @RequestBody JobProfileRequest request
    ) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(jobProfileService.createJobProfile(user.getId(), request));
    }

    @GetMapping
    public ResponseEntity<List<JobProfileResponse>> getAll(
            @AuthenticationPrincipal AuthenticatedUser user
    ) {
        return ResponseEntity.ok(jobProfileService.getAllJobProfiles(user.getId()));
    }

    @GetMapping("/{jobProfileId}")
    public ResponseEntity<JobProfileResponse> getOne(
            @AuthenticationPrincipal AuthenticatedUser user,
            @PathVariable Long jobProfileId
    ) {
        return ResponseEntity.ok(jobProfileService.getJobProfile(user.getId(), jobProfileId));
    }

    @DeleteMapping("/{jobProfileId}")
    public ResponseEntity<Void> delete(
            @AuthenticationPrincipal AuthenticatedUser user,
            @PathVariable Long jobProfileId
    ) {
        jobProfileService.deleteJobProfile(user.getId(), jobProfileId);
        return ResponseEntity.noContent().build();
    }
}
