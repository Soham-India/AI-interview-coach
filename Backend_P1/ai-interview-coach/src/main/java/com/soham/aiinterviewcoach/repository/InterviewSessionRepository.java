package com.soham.aiinterviewcoach.repository;

import com.soham.aiinterviewcoach.entity.InterviewSession;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface InterviewSessionRepository extends JpaRepository<InterviewSession, Long> {
    List<InterviewSession> findByUserIdOrderByCreatedAtDesc(Long userId);

    Optional<InterviewSession> findByReferenceCode(String referenceCode);

    List<InterviewSession> findByUserIdAndStatus(Long userId, String status);
}
