import React from "react";
import { ShieldCheck, Activity, ShieldAlert } from "lucide-react";

const InitialVerdictView = ({ data }) => {
  return (
    <div className="w-full space-y-8">
      
      {/* SECTION 1: HEADER TERMINAL (FINAL VERDICT) */}
      <div className="relative border border-frame bg-panel overflow-hidden">
        {/* Dynamic Scanline FX running over the diagnostic header header frame */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-neon-blue/20 animate-[scan_4s_linear_infinite] z-10 pointer-events-none" />
        
        {/* Brutalist Terminal Chrome Title bar */}
        <div className="bg-frame/30 border-b border-frame px-4 py-2 flex justify-between items-center select-none">
          <div className="flex space-x-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-danger/40" />
            <div className="w-2.5 h-2.5 rounded-full bg-warning/40" />
            <div className="w-2.5 h-2.5 rounded-full bg-success/40" />
          </div>
          <div className="font-mono text-[9px] text-steel tracking-[0.2em] font-bold">
            MISSION_VERDICT_REPORT.EXEC
          </div>
        </div>

        {/* Metrics Grid Ingestion Interface */}
        <div className="p-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-8 relative z-10">
          <div className="space-y-4">
            <div className="inline-block px-3 py-1 bg-neon-blue/10 border border-neon-blue font-mono text-[10px] text-neon-blue uppercase tracking-wider font-bold">
              READINESS_INDEX_ANALYSIS
            </div>
            <div>
              <h2 className="font-mono text-[10px] uppercase tracking-[0.4em] text-steel mb-1 font-bold">
                SYSTEM_SCORE
              </h2>
              <div className="relative inline-flex items-baseline">
                <span className="font-mono text-7xl md:text-[110px] leading-none font-black text-neon-blue tracking-tighter drop-shadow-[0_0_30px_rgba(0,136,255,0.25)]">
                  {data.score}
                </span>
                <span className="font-mono text-lg text-neon-blue opacity-50 ml-1 font-bold">
                  .00%
                </span>
              </div>
            </div>
          </div>

          {/* Side Telemetry Metric Tags */}
          <div className="w-full md:w-auto grid grid-cols-3 md:grid-cols-1 gap-4 font-mono">
            <div className="border border-frame p-3.5 bg-abyss/50 flex flex-col justify-center">
              <div className="text-[9px] text-steel uppercase mb-1 tracking-wider font-bold flex items-center gap-1.5">
                <ShieldCheck size={10} className="text-success" /> AUTH_STATUS
              </div>
              <div className="text-base text-success font-black tracking-widest">
                {data.status}
              </div>
            </div>

            <div className="border border-frame p-3.5 bg-abyss/50 flex flex-col justify-center">
              <div className="text-[9px] text-steel uppercase mb-1 tracking-wider font-bold flex items-center gap-1.5">
                <Activity size={10} className="text-neon-blue" /> PROBABILITY
              </div>
              <div className="text-base text-neon-blue font-black tracking-widest">
                {data.probability}
              </div>
            </div>

            <div className="border border-frame p-3.5 bg-abyss/50 flex flex-col justify-center">
              <div className="text-[9px] text-steel uppercase mb-1 tracking-wider font-bold flex items-center gap-1.5">
                <ShieldAlert size={10} className="text-pure-white" /> THREAT_LEVEL
              </div>
              <div className="text-base text-pure-white font-black tracking-widest">
                {data.risk}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: NEURAL ANALYSIS (BRUTALIST LAYOUT) */}
      <div className="grid md:grid-cols-4 gap-gutter border-t border-frame pt-6">
        <div className="md:col-span-1 select-none">
          <h3 className="font-mono text-xs text-neon-blue font-black uppercase tracking-[0.3em] leading-relaxed">
            [ ANALYSIS_LOG ]<br />
            NEURAL_MAP
          </h3>
        </div>
        <div className="md:col-span-3 border-l border-frame/40 pl-6 md:pl-8 space-y-4">
          {data.summary.map((paragraph, index) => (
            <p key={index} className="font-mono text-sm md:text-base text-on-surface leading-relaxed text-justify">
              <span className="text-neon-blue font-bold mr-2">&gt;</span> {paragraph}
            </p>
          ))}
        </div>
      </div>

    </div>
  );
};

export default InitialVerdictView;