package com.soham.aiinterviewcoach.repository;

import com.soham.aiinterviewcoach.entity.QnaEvaluation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface QnaEvaluationRepository extends JpaRepository<QnaEvaluation, Long> {
    // Mapped precisely to 'private SessionQna qna;'
    Optional<QnaEvaluation> findByQnaId(Long qnaId);
}
