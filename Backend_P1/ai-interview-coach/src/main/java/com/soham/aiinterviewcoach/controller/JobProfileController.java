package com.soham.aiinterviewcoach.controller;

import com.soham.aiinterviewcoach.dto.job.JobProfileRequest;
import com.soham.aiinterviewcoach.dto.job.JobProfileResponse;
import com.soham.aiinterviewcoach.service.JobProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users/{userId}/jobs")
@RequiredArgsConstructor
public class JobProfileController {

    private final JobProfileService jobProfileService;

    @PostMapping
    public ResponseEntity<JobProfileResponse> create(
            @PathVariable Long userId,
            @RequestBody JobProfileRequest request
    ) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(jobProfileService.createJobProfile(userId, request));
    }

    @GetMapping
    public ResponseEntity<List<JobProfileResponse>> getAll(@PathVariable Long userId) {
        return ResponseEntity.ok(jobProfileService.getAllJobProfiles(userId));
    }

    @GetMapping("/{jobProfileId}")
    public ResponseEntity<JobProfileResponse> getOne(
            @PathVariable Long userId,
            @PathVariable Long jobProfileId
    ) {
        return ResponseEntity.ok(jobProfileService.getJobProfile(userId, jobProfileId));
    }

    @DeleteMapping("/{jobProfileId}")
    public ResponseEntity<Void> delete(
            @PathVariable Long userId,
            @PathVariable Long jobProfileId
    ) {
        jobProfileService.deleteJobProfile(userId, jobProfileId);
        return ResponseEntity.noContent().build();
    }
}
