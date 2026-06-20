package com.soham.aiinterviewcoach.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "user_preferences")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserPreferences {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    @Column(name = "interview_length")
    private Integer interviewLength = 10;

    @Column(length = 20)
    private String difficulty = "ADAPTIVE";

    @Column(length = 20)
    private String theme = "CYBER";
}