package com.soham.aiinterviewcoach.repository;

import com.soham.aiinterviewcoach.entity.AchievementDefinition;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AchievementDefinitionRepository extends JpaRepository<AchievementDefinition, Long> {
    Optional<AchievementDefinition> findByAchievementKey(String achievementKey);
}
