package com.soham.aiinterviewcoach.repository;

import com.soham.aiinterviewcoach.entity.JobProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobProfileRepository extends JpaRepository<JobProfile, Long> {
    List<JobProfile> findByUserIdOrderByCreatedAtDesc(Long userId);
}
