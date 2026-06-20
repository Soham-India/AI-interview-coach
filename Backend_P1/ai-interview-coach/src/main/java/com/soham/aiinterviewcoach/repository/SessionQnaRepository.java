package com.soham.aiinterviewcoach.repository;

import com.soham.aiinterviewcoach.entity.SessionQna;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SessionQnaRepository extends JpaRepository<SessionQna, Long> {
    // Mapped precisely to 'private InterviewSession session;'
    List<SessionQna> findBySessionIdOrderByQuestionNumberAsc(Long sessionId);
}
