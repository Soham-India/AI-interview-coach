import React from "react";
import { Download, Brain, Terminal } from "lucide-react";

const AnalyticsInsightsView = ({ averageScore = 0, totalInterviews = 0 }) => {
  return (
    <div className="w-full h-full grid grid-cols-1 lg:grid-cols-12 gap-gutter lg:gap-16 items-center">
      
      {/* LEFT COLUMN: SYNTHESIZED ANALYSIS COPY (7 Columns wide on desktop) */}
      <div className="lg:col-span-7 space-y-6 md:space-y-8 order-2 lg:order-1">
        <div className="select-none">
          <span className="font-mono text-[10px] text-neon-blue mb-1 block uppercase tracking-[0.3em] font-bold flex items-center gap-2">
            <Brain size={12} /> Synthesized Analysis
          </span>
          <h2 className="font-scene-focus text-2xl md:text-4xl text-pure-white uppercase font-black tracking-tight">
            A.I. Insights
          </h2>
        </div>

        <div className="border-l-2 border-frame/60 pl-6 md:pl-8 space-y-4">
          <p className="font-mono text-sm md:text-base text-steel leading-[1.8] text-justify">
            "Operator performance across <span className="text-pure-white font-black">{totalInterviews} sessions</span> shows an average index of <span className="text-pure-white font-black">{averageScore}</span>. The logic gates used for technical depth are optimized for system scale."
          </p>
          <p className="font-mono text-sm md:text-base text-steel leading-[1.8] text-justify">
            "However, the telemetry suggests a critical bottleneck in{" "}
            <span className="text-neon-blue font-black drop-shadow-[0_0_10px_rgba(0,136,255,0.2)]">
              concise communication
            </span>
            —specifically during high-pressure narrative segments where output verbosity increases beyond efficient bounds."
          </p>
        </div>

        {/* Tactical Downloader Trigger */}
        <div className="pt-4">
          <button 
            className="h-12 px-6 border border-neon-blue text-neon-blue font-mono text-xs font-bold uppercase tracking-widest hover:bg-neon-blue/10 transition-all duration-300 button-cut flex items-center gap-2.5 cursor-pointer shadow-[0_0_15px_rgba(0,136,255,0.1)]"
          >
            <Download size={14} /> Download Log
          </button>
        </div>
      </div>

      {/* RIGHT COLUMN: 3D-EFFECT WIREFRAME NEURAL SYNC (5 Columns wide on desktop) */}
      <div className="lg:col-span-5 flex justify-center items-center order-1 lg:order-2 py-6 lg:py-0">
        <div className="w-72 h-72 xl:w-80 xl:h-80 border border-frame bg-panel/30 relative flex items-center justify-center group overflow-hidden">
          {/* Subtle background matrix backing grid */}
          <div className="absolute inset-0 wireframe-grid opacity-10 pointer-events-none" />
          
          {/* Top telemetry subtext token */}
          <div className="absolute top-4 left-4 font-mono text-[8px] text-steel/40 uppercase tracking-widest flex items-center gap-1.5 select-none">
            <Terminal size={10} /> LINK_INTEGRITY: 98.2%
          </div>

          {/* NEURAL SYNC SYSTEM CONTAINER (3D Wireframe Calibration sphere mockup) */}
          <div className="relative w-48 h-48 xl:w-56 xl:h-56 flex items-center justify-center">
            
            {/* Outer Concentric Static Calibration Ring */}
            <div className="absolute inset-0 border border-frame/60 rounded-full" />
            
            {/* Y-Axis Rotating Wireframe Ring (3D tilt rotation mockup) */}
            <div className="absolute inset-2 border-2 border-dashed border-neon-blue/10 rounded-full animate-[spin_30s_linear_infinite] [transform:rotateX(60deg)_rotateY(20deg)]" />
            
            {/* X-Axis Rotating Wireframe Ring (Inverted skew loop rotation) */}
            <div className="absolute inset-2 border border-dashed border-steel/20 rounded-full animate-[spin_20s_linear_infinite_reverse] [transform:rotateX(20deg)_rotateY(70deg)]" />
            
            {/* Horizontal Equator Grid Segment */}
            <div className="absolute w-full h-px bg-frame/40 top-1/2 left-0 [transform:rotateX(45deg)]" />
            
            {/* Core Focal Pulsating Star-Node */}
            <div className="relative w-16 h-16 rounded-full bg-abyss border border-neon-blue/40 flex items-center justify-center shadow-[0_0_30px_rgba(0,136,255,0.1)] group-hover:border-neon-blue group-hover:shadow-[0_0_40px_rgba(0,136,255,0.3)] transition-all duration-700">
              {/* Pulsing center engine cores */}
              <div className="w-4 h-4 bg-neon-blue rounded-full animate-pulse shadow-[0_0_20px_4px_#0088FF]" />
              <div className="w-8 h-8 border border-neon-blue/30 rounded-full absolute animate-ping duration-1000" />
            </div>

          </div>

          {/* Subtle corner tech trims */}
          <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-frame" />
          <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-frame" />
        </div>
      </div>

    </div>
  );
};

export default AnalyticsInsightsView;