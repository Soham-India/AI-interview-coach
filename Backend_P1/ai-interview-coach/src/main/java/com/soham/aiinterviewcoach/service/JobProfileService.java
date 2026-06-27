package com.soham.aiinterviewcoach.service;

import com.soham.aiinterviewcoach.dto.job.JobProfileRequest;
import com.soham.aiinterviewcoach.dto.job.JobProfileResponse;
import com.soham.aiinterviewcoach.entity.JobProfile;
import com.soham.aiinterviewcoach.entity.User;
import com.soham.aiinterviewcoach.repository.JobProfileRepository;
import com.soham.aiinterviewcoach.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class JobProfileService {

    private final JobProfileRepository jobProfileRepository;
    private final UserRepository userRepository;

    @Transactional
    public JobProfileResponse createJobProfile(Long userId, JobProfileRequest request) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "User not found"
                ));

        JobProfile profile = new JobProfile();
        profile.setUser(user);
        profile.setJobTitle(request.jobTitle());
        profile.setCompany(request.company());
        profile.setJobDescription(request.jobDescription());

        // skillsRequired and analysisSummary stay null here —
        // they get populated later by GeminiService in Phase 2

        JobProfile saved = jobProfileRepository.save(profile);

        return mapToResponse(saved);
    }

    public JobProfileResponse getJobProfile(Long userId, Long jobProfileId) {

        JobProfile profile = findOwnedProfileOrThrow(userId, jobProfileId);
        return mapToResponse(profile);
    }

    public List<JobProfileResponse> getAllJobProfiles(Long userId) {

        return jobProfileRepository.findByUserIdOrderByCreatedAtDesc(userId)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Transactional
    public void deleteJobProfile(Long userId, Long jobProfileId) {

        JobProfile profile = findOwnedProfileOrThrow(userId, jobProfileId);
        jobProfileRepository.delete(profile);
    }

    // ============================================================
    // Used internally by InterviewService in Phase 2 —
    // returns the raw entity, not a DTO, since GeminiService needs
    // the full job description text, not the API-facing shape.
    // ============================================================
    public JobProfile getJobProfileEntityOrThrow(Long userId, Long jobProfileId) {
        return findOwnedProfileOrThrow(userId, jobProfileId);
    }

    private JobProfile findOwnedProfileOrThrow(Long userId, Long jobProfileId) {

        JobProfile profile = jobProfileRepository.findById(jobProfileId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Job profile not found"
                ));

        if (!profile.getUser().getId().equals(userId)) {
            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN, "You do not have access to this job profile"
            );
        }

        return profile;
    }

    private JobProfileResponse mapToResponse(JobProfile profile) {
        return new JobProfileResponse(
                profile.getId(),
                profile.getJobTitle(),
                profile.getCompany(),
                profile.getJobDescription(),
                profile.getSkillsRequired(),
                profile.getAnalysisSummary(),
                profile.getCreatedAt()
        );
    }
}