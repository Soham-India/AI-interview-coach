package com.soham.aiinterviewcoach.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "session_qna")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SessionQna extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "session_id", nullable = false)
    private InterviewSession session;

    @Column(name = "question_number", nullable = false)
    private Integer questionNumber;

    @Column(length = 100)
    private String topic;

    @Column(name = "question_text", columnDefinition = "TEXT", nullable = false)
    private String questionText;

    @Column(name = "user_answer", columnDefinition = "TEXT")
    private String userAnswer;

    @Column(name = "ai_feedback", columnDefinition = "TEXT")
    private String aiFeedback;

    @Column(length = 150)
    private String verdict;

    @Column(name = "overall_score", precision = 4, scale = 1)
    private BigDecimal overallScore;


    @OneToOne(mappedBy = "qna", cascade = CascadeType.ALL)
    private QnaEvaluation qnaEvaluation;

    @OneToMany(mappedBy = "qna", cascade = CascadeType.ALL)
    private List<SessionDirective> sessionDirectives;
}