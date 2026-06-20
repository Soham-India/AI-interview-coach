package com.soham.aiinterviewcoach.repository;

import com.soham.aiinterviewcoach.entity.UserAchievement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserAchievementRepository extends JpaRepository<UserAchievement, Long> {
    // Added the recommended unlockedAt descending order
    List<UserAchievement> findByUserIdOrderByUnlockedAtDesc(Long userId);
    
    // Mapped precisely to 'private AchievementDefinition achievement;'
    boolean existsByUserIdAndAchievementId(Long userId, Long achievementId);
}
