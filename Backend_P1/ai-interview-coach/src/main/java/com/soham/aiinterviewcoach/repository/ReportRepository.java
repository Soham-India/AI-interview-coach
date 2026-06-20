package com.soham.aiinterviewcoach.repository;

import com.soham.aiinterviewcoach.entity.Report;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ReportRepository extends JpaRepository<Report, Long> {
    // Mapped precisely to 'private InterviewSession session;'
    Optional<Report> findBySessionId(Long sessionId);
}
