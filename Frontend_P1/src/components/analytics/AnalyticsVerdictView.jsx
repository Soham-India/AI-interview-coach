import React from "react";
import { useNavigate } from "react-router-dom";
import { PlusCircle } from "lucide-react";
import ParticleBackground from "../ui/elements/ParticleBackground";

const AnalyticsVerdictView = () => {
  const navigate = useNavigate();

  return (
    <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center text-center overflow-hidden">
      
      {/* Immersive starfield canvas pinned directly to this section's background */}
      <ParticleBackground count={140} />

      {/* Atmospheric center spotlight glow to isolate the typography */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,136,255,0.1)_0%,transparent_70%)] pointer-events-none z-0" />

      {/* Main interactive copy block */}
      <div className="relative z-10 px-margin-edge w-full max-w-container-max space-y-8 select-none">
        
        <span className="font-mono text-xs text-neon-blue uppercase tracking-[0.4em] block animate-[fade-up_1s_ease_forwards] drop-shadow-[0_0_10px_rgba(0,136,255,0.4)]">
          Simulation Cycle Terminated
        </span>
        
        <h2 className="font-hero-score text-6xl md:text-7xl lg:text-[120px] uppercase text-pure-white font-black tracking-tighter leading-none animate-[fade-up_1s_ease_forwards_delay-100] drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]">
          READY_
        </h2>

        {/* High-Impact Tactical CTA Trigger */}
        <div className="flex justify-center pt-6 animate-[fade-up_1s_ease_forwards_delay-300]">
          <button
            onClick={() => navigate("/initialize")}
            className="bg-pure-white text-abyss font-mono text-[10px] sm:text-xs md:text-base font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] md:tracking-[0.3em] px-6 sm:px-8 md:px-12 py-4 md:py-5 border-2 border-pure-white hover:bg-transparent hover:text-pure-white transition-all duration-500 button-cut cursor-pointer shadow-[0_0_40px_rgba(255,255,255,0.15)] hover:shadow-[0_0_40px_rgba(0,136,255,0.4)] flex items-center justify-center gap-2 md:gap-3 group whitespace-nowrap"
          >
            <PlusCircle size={18} className="group-hover:rotate-90 transition-transform duration-500" strokeWidth={2.5} />
            [ NEW INTERVIEW ]
          </button>
        </div>

      </div>

      {/* Embedded peripheral frame token */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[9px] text-steel/20 uppercase tracking-[0.6em] pointer-events-none select-none">
        SYSTEM_IDLE // DATA_VAULT_SYNCD
      </div>

    </div>
  );
};

export default AnalyticsVerdictView;