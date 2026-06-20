package com.soham.aiinterviewcoach.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Entity
@Table(name = "qna_evaluations")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class QnaEvaluation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "qna_id", nullable = false, unique = true)
    private SessionQna qna;

    @Column(name = "technical_score", precision = 4, scale = 1)
    private BigDecimal technicalScore;

    @Column(name = "communication_score", precision = 4, scale = 1)
    private BigDecimal communicationScore;

    @Column(name = "confidence_score", precision = 4, scale = 1)
    private BigDecimal confidenceScore;

    @Column(name = "structure_score", precision = 4, scale = 1)
    private BigDecimal structureScore;

    @Column(name = "overall_score", precision = 4, scale = 1)
    private BigDecimal overallScore;
}