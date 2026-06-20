package com.soham.aiinterviewcoach.repository;

import com.soham.aiinterviewcoach.entity.SessionDirective;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SessionDirectiveRepository extends JpaRepository<SessionDirective, Long> {
    // Mapped precisely to 'private SessionQna qna;'
    List<SessionDirective> findByQnaIdOrderByDisplayOrderAsc(Long qnaId);
}
