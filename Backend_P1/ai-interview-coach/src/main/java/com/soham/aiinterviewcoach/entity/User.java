package com.soham.aiinterviewcoach.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.validator.constraints.UniqueElements;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(nullable = false, unique = true, length = 100)
    private String email;

    @Column(name = "password_hash", nullable = false)
    private String passwordHash;

    @Column(unique = true, nullable = false, length = 50)
    private String callsign;

    @Column(length = 100)
    private String role;

    @Column(name = "avatar_url", columnDefinition = "TEXT")
    private String avatarUrl;


    // Relationships
    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    private UserStats userStats;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    private UserPreferences userPreferences;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<JobProfile> jobProfiles;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<InterviewSession> interviewSessions;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<UserAchievement> userAchievements;
}