import React, { useState } from "react";
import { Award, Trophy, Code, Terminal, Edit2, Camera } from "lucide-react";
import AvatarSelectScreen from "../ui/AvatarSelectScreen";
import EditProfileModal from "../ui/EditProfileModal";

// Helper map to resolve achievement string tokens to vector components dynamically
const getAchievementIcon = (iconName) => {
  switch (iconName?.toLowerCase()) {
    case "award":
      return <Award size={24} className="text-neon-blue animate-pulse" />;
    case "trophy":
      return <Trophy size={24} className="text-neon-blue" />;
    case "code":
      return <Code size={24} className="text-neon-blue" />;
    default:
      return <Terminal size={24} className="text-neon-blue" />;
  }
};

const ProfileHeaderView = ({ user, onUpdate }) => {
  const [isAvatarPickerOpen, setIsAvatarPickerOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isSavingAvatar, setIsSavingAvatar] = useState(false);
  const [isSavingProfile, setIsSavingProfile] = useState(false);

  const { stats, achievements = [] } = user;

  const handleAvatarSelect = async (avatarUrl) => {
      setIsSavingAvatar(true);
      try {
          await onUpdate({ avatarUrl });
          setIsAvatarPickerOpen(false);
      } catch (err) {
          console.error("Failed to update avatar:", err);
      } finally {
          setIsSavingAvatar(false);
      }
  };

  const handleProfileSave = async (profileData) => {
      setIsSavingProfile(true);
      try {
          await onUpdate(profileData);
          setIsEditProfileOpen(false);
      } catch (err) {
          console.error("Failed to update profile:", err);
      } finally {
          setIsSavingProfile(false);
      }
  };

  return (
    <div className="w-full space-y-6 xl:space-y-8">

      {/* Modals */}
      {isAvatarPickerOpen && (
          <AvatarSelectScreen
              initialAvatar={user.avatarUrl}
              onConfirm={handleAvatarSelect}
              onCancel={() => setIsAvatarPickerOpen(false)}
              isSaving={isSavingAvatar}
          />
      )}
      <EditProfileModal
          isOpen={isEditProfileOpen}
          currentProfile={user}
          onSave={handleProfileSave}
          onClose={() => setIsEditProfileOpen(false)}
          isSaving={isSavingProfile}
      />

      {/* Profile identity header */}
      <div className="flex flex-col md:flex-row items-center md:items-end gap-6 lg:gap-10 border-b-4 border-frame pb-6 select-none">

          {/* Avatar with camera overlay */}
          <div className="relative group/avatar shrink-0">
              <div className="w-32 h-32 md:w-40 md:h-40 border-2 border-neon-blue p-1 bg-panel/40">
                  <div className="w-full h-full relative overflow-hidden bg-surface-container-high">
                      {user.avatarUrl ? (
                          <img
                              src={user.avatarUrl}
                              alt={user.name}
                              className="w-full h-full object-cover transition-all duration-500"
                          />
                      ) : (
                          <div className="w-full h-full flex items-center justify-center bg-panel">
                              <span className="font-mono text-4xl font-black text-neon-blue/40">
                                  {user.name?.charAt(0).toUpperCase()}
                              </span>
                          </div>
                      )}
                  </div>
              </div>

              {/* Camera overlay on hover */}
              <button
                  onClick={() => setIsAvatarPickerOpen(true)}
                  className="absolute inset-0 bg-abyss/70 opacity-0 group-hover/avatar:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center cursor-pointer border-2 border-neon-blue/60"
              >
                  <Camera size={20} className="text-neon-blue mb-1" />
                  <span className="font-mono text-[8px] text-neon-blue uppercase tracking-widest font-bold">
                      CHANGE
                  </span>
              </button>
          </div>

          {/* Name and edit button */}
          <div className="flex-grow text-center md:text-left space-y-2 md:space-y-4">
              <span className="font-mono text-[10px] text-steel uppercase tracking-[0.3em] font-bold block">
                  Operator Identity Profile // Verified
              </span>
              <h1 className="font-headline-xl text-4xl md:text-5xl lg:text-7xl font-black text-pure-white tracking-tighter uppercase leading-none break-all">
                  {user.name}
              </h1>
              <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 pt-1">
                  <span className="bg-neon-blue text-abyss px-4 py-1.5 font-mono text-sm md:text-base font-black tracking-widest select-none flex items-center gap-2 border border-neon-blue shadow-[0_0_15px_rgba(0,136,255,0.4)] uppercase button-cut">
                      CALLSIGN: "{user.callsign}"
                  </span>
                  <span className="font-mono text-sm md:text-base text-steel uppercase tracking-wider font-bold">
                      {user.role}
                  </span>

                  {/* Edit profile button */}
                  <button
                      onClick={() => setIsEditProfileOpen(true)}
                      className="flex items-center gap-2 border border-frame text-steel hover:border-neon-blue/40 hover:text-neon-blue px-4 py-1.5 font-mono text-xs uppercase tracking-widest transition-all duration-300 cursor-pointer"
                  >
                      <Edit2 size={11} />
                      EDIT PROFILE
                  </button>
              </div>
          </div>
      </div>

      {/* SECTION 2: METRICS & ACHIEVEMENTS DUAL CORES */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
        
        {/* Left Column: Metric Vector Tracks */}
        <div className="flex flex-col justify-between space-y-3.5">
          <div className="font-mono text-[10px] text-steel uppercase tracking-[0.3em] font-bold select-none">
            OPERATIONAL ANALYTICS
          </div>
          
          <div className="flex justify-between items-end border-b border-frame/60 pb-2 group hover:border-pure-white transition-colors duration-300">
            <span className="font-mono text-xs text-steel group-hover:text-pure-white transition-colors font-bold">INTERVIEWS</span>
            <span className="font-mono text-3xl font-black tracking-tighter text-pure-white leading-none">
              {stats.interviews < 10 ? `0${stats.interviews}` : stats.interviews}
            </span>
          </div>

          <div className="flex justify-between items-end border-b-2 border-neon-blue pb-2 select-none">
            <span className="font-mono text-xs text-pure-white font-black tracking-wide">BEST SCORE</span>
            <span className="font-mono text-3xl font-black tracking-tighter text-neon-blue leading-none drop-shadow-[0_0_15px_rgba(0,136,255,0.3)]">
              {stats.bestScore}%
            </span>
          </div>

          <div className="flex justify-between items-end border-b border-frame/60 pb-2 group hover:border-pure-white transition-colors duration-300">
            <span className="font-mono text-xs text-steel group-hover:text-pure-white transition-colors font-bold">STREAK</span>
            <span className="font-mono text-3xl font-black tracking-tighter text-pure-white leading-none">
              {stats.streak < 10 ? `0${stats.streak}` : stats.streak}
            </span>
          </div>

          <div className="flex justify-between items-end border-b border-frame/60 pb-2 group hover:border-pure-white transition-colors duration-300">
            <span className="font-mono text-xs text-steel group-hover:text-pure-white transition-colors font-bold">HOURS</span>
            <span className="font-mono text-3xl font-black tracking-tighter text-pure-white leading-none">
              {stats.hours < 10 ? `0${stats.hours}` : stats.hours}
            </span>
          </div>
        </div>

        {/* Right Column: Accomplishment Medal Rows */}
        <div className="flex flex-col justify-between space-y-4">
          <div className="font-mono text-[10px] text-steel uppercase tracking-[0.3em] font-bold select-none">
            ACHIEVEMENTS_LOG
          </div>

          <div className="space-y-3 max-h-[220px] overflow-y-auto brutalist-scroll pr-1">
            {achievements.length === 0 ? (
              <div className="flex items-center gap-5 border border-frame bg-panel/30 p-4">
                <Terminal size={20} className="text-steel/40 shrink-0" />
                <div className="font-mono text-xs text-steel uppercase tracking-wider">
                  No achievements unlocked yet. Complete interviews to earn medals.
                </div>
              </div>
            ) : (
              achievements.map((achievement) => (
              <div 
                key={achievement.id}
                className="flex items-center gap-5 border border-frame bg-panel/30 p-3 group hover:border-neon-blue/30 transition-colors duration-300"
              >
                <div className="p-2.5 bg-abyss/40 border border-frame group-hover:border-neon-blue/20 transition-colors shrink-0">
                  {getAchievementIcon(achievement.icon)}
                </div>
                <div>
                  <div className="font-mono text-xs text-pure-white font-black tracking-wide uppercase">
                    {achievement.title}
                  </div>
                  <div className="font-mono text-[9px] text-steel tracking-widest mt-0.5 select-none font-bold">
                    {achievement.description}
                  </div>
                </div>
              </div>
              ))
            )}
          </div>

        </div>
      </div>

    </div>
  );
};

export default ProfileHeaderView;