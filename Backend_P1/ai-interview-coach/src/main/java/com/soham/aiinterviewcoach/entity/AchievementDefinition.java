package com.soham.aiinterviewcoach.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "achievement_definitions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AchievementDefinition {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "achievement_key", unique = true, nullable = false, length = 100)
    private String achievementKey;

    @Column(nullable = false, length = 150)
    private String title;

    @Column(length = 255)
    private String description;

    @Column(length = 50)
    private String icon;
}