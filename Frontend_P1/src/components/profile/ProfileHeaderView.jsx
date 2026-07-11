import React from "react";
import { Award, Trophy, Code, Terminal } from "lucide-react";

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
  const { stats, achievements = [] } = user;

  return (
    <div className="w-full space-y-6 xl:space-y-8">
      
      {/* SECTION 1: PROFILE DOSSIER IDENTITY ACCENT */}
      <div className="flex flex-col md:flex-row items-center md:items-end gap-6 lg:gap-10 border-b-4 border-frame pb-6 select-none">
        
        {/* Avatar Profile Framing Container */}
        <div className="w-32 h-32 md:w-40 md:h-40 border-2 border-neon-blue p-1 shrink-0 bg-panel/40 relative">
          <div className="w-full h-full relative overflow-hidden bg-surface-container-high">
            <img 
              src={user.avatarUrl} 
              alt={user.name} 
              className="w-full h-full object-cover grayscale brightness-75 hover:grayscale-0 hover:brightness-100 transition-all duration-500"
            />
          </div>
        </div>

        {/* Name and Designation Segment */}
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