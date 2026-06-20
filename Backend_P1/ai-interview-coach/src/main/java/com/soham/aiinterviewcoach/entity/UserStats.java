package com.soham.aiinterviewcoach.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "user_stats")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserStats {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    @Column(name = "interviews_completed")
    private Integer interviewsCompleted = 0;

    @Column(name = "best_score")
    private Integer bestScore = 0;

    private Integer streak = 0;

    @Column(name = "study_hours")
    private Integer studyHours = 0;
}