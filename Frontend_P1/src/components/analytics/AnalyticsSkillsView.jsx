import React, { useEffect, useState } from "react";
import { Cpu } from "lucide-react";

const INITIAL_SKILLS = [
  { name: "Communication", targetValue: 91 },
  { name: "Technical Depth", targetValue: 82 },
  { name: "Problem Solving", targetValue: 95 },
  { name: "Leadership", targetValue: 71 },
];

const AnalyticsSkillsView = () => {
  const [skills, setSkills] = useState(INITIAL_SKILLS.map(s => ({ ...s, current: 0 })));

  // Smooth fill trigger cascade simulation
  useEffect(() => {
    const timer = setTimeout(() => {
      setSkills(
        INITIAL_SKILLS.map((skill) => ({
          ...skill,
          current: skill.targetValue,
        }))
      );
    }, 150);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center w-full h-full">
      
      {/* LEFT: PROGRESS COMPETENCY MATRICES */}
      <div className="space-y-6 md:space-y-8">
        <div className="select-none">
          <span className="font-mono text-[10px] text-neon-blue mb-1 block uppercase tracking-[0.3em] font-bold">
            Module Competency
          </span>
          <h2 className="font-scene-focus text-2xl md:text-4xl text-pure-white uppercase font-black tracking-tight">
            Core Breakdown
          </h2>
        </div>

        <div className="space-y-6 md:space-y-8">
          {skills.map((skill, index) => (
            <div key={index} className="group">
              <div className="flex justify-between mb-2 select-none">
                <span className="font-mono text-xs text-steel uppercase font-bold tracking-wider group-hover:text-pure-white transition-colors">
                  {skill.name}
                </span>
                <span className="font-mono text-xs text-neon-blue font-bold">
                  {skill.current}%
                </span>
              </div>
              
              <div className="h-3 w-full bg-frame relative overflow-hidden rounded-none border border-frame/30">
                <div
                  className="h-full bg-neon-blue shadow-[0_0_15px_#0088FF] transition-all cubic-bezier(0.65,0,0.35,1)"
                  style={{ 
                    width: `${skill.current}%`,
                    transitionDuration: "1500ms"
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT: TACTICAL TELEMETRY CENTERPIECE CORE */}
      <div className="hidden lg:flex justify-center items-center">
        <div className="w-80 h-80 xl:w-96 xl:h-96 border border-frame/50 rounded-full flex items-center justify-center relative select-none pointer-events-none">
          
          {/* Animated decorative outer orbital bands */}
          <div className="absolute inset-4 border border-dashed border-steel/10 rounded-full animate-[spin_40s_linear_infinite]" />
          <div className="absolute inset-8 border border-dashed border-neon-blue/10 rounded-full animate-[spin_20s_linear_infinite_reverse]" />
          
          {/* Visual core housing layout wrapper */}
          <div className="absolute w-44 h-44 xl:w-48 xl:h-48 border border-neon-blue/20 rounded-full animate-[spin_12s_linear_infinite] flex items-center justify-center">
            <div className="w-4 h-4 border border-neon-blue rotate-45" />
          </div>

          {/* Focal scoreboard centerpiece disk */}
          <div className="absolute w-28 h-28 xl:w-32 xl:h-32 border border-neon-blue bg-panel rounded-full flex flex-col items-center justify-center shadow-[0_0_50px_rgba(0,136,255,0.2)]">
            <Cpu size={14} className="text-neon-blue/60 mb-0.5 animate-pulse" />
            <span className="font-hero-score text-4xl xl:text-5xl text-pure-white font-black tracking-tighter leading-none">
              87
            </span>
            <span className="font-mono text-[8px] text-steel tracking-widest uppercase font-bold mt-1">
              MEAN_INDEX
            </span>
          </div>

        </div>
      </div>

    </div>
  );
};

export default AnalyticsSkillsView;