package com.soham.aiinterviewcoach.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "interview_sessions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InterviewSession extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "job_profile_id", nullable = false)
    private JobProfile jobProfile;

    @Column(name = "reference_code", unique = true, length = 50)
    private String referenceCode;

    @Column(name = "overall_score")
    private Integer overallScore;

    @Column(length = 50)
    private String probability;

    @Column(length = 50)
    private String risk;

    @Column(length = 20)
    private String status = "IN_PROGRESS";

    @Column(name = "elapsed_seconds")
    private Integer elapsedSeconds = 0;


    @OneToOne(mappedBy = "session", cascade = CascadeType.ALL)
    private Report report;

    @OneToMany(mappedBy = "session", cascade = CascadeType.ALL)
    private List<SessionQna> sessionQnas;
}