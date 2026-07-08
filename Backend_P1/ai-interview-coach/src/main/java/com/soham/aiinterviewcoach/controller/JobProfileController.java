package com.soham.aiinterviewcoach.controller;

import com.soham.aiinterviewcoach.dto.job.JobProfileRequest;
import com.soham.aiinterviewcoach.dto.job.JobProfileResponse;
import com.soham.aiinterviewcoach.security.AuthenticatedUserProvider;
import com.soham.aiinterviewcoach.service.JobProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users/me/jobs")
@RequiredArgsConstructor
public class JobProfileController {

    private final JobProfileService jobProfileService;
    private final AuthenticatedUserProvider userProvider;

    @PostMapping
    public ResponseEntity<JobProfileResponse> create(
            Authentication auth,
            @RequestBody JobProfileRequest request
    ) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(jobProfileService.createJobProfile(userProvider.getUserId(auth), request));
    }

    @GetMapping
    public ResponseEntity<List<JobProfileResponse>> getAll(Authentication auth) {
        return ResponseEntity.ok(jobProfileService.getAllJobProfiles(userProvider.getUserId(auth)));
    }

    @GetMapping("/{jobProfileId}")
    public ResponseEntity<JobProfileResponse> getOne(
            Authentication auth,
            @PathVariable Long jobProfileId
    ) {
        return ResponseEntity.ok(jobProfileService.getJobProfile(userProvider.getUserId(auth), jobProfileId));
    }

    @DeleteMapping("/{jobProfileId}")
    public ResponseEntity<Void> delete(
            Authentication auth,
            @PathVariable Long jobProfileId
    ) {
        jobProfileService.deleteJobProfile(userProvider.getUserId(auth), jobProfileId);
        return ResponseEntity.noContent().build();
    }
}
