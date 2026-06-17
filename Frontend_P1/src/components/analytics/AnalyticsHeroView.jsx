import React from "react";
import { Layers, BarChart3, Zap, Award } from "lucide-react";

const AnalyticsHeroView = ({ data }) => {
  return (
    <div className="w-full space-y-8 xl:space-y-10">
      
      {/* VIEW TITLE CONTROLS */}
      <div className="select-none flex justify-between items-end">
        <div>
          <span className="font-mono text-[10px] text-neon-blue mb-1 block uppercase tracking-[0.3em] font-bold">
            Telemetry Stream 0824
          </span>
          <h1 className="font-headline-xl text-3xl md:text-5xl lg:text-6xl uppercase text-pure-white tracking-tight font-black leading-none">
            ANALYTICS
          </h1>
        </div>
        <div className="font-mono text-[9px] text-steel/40 uppercase tracking-widest hidden sm:block">
          DATAROOM_CONNECTED // SECURE_ACCESS
        </div>
      </div>

      {/* METRIC SUMMATION GRID */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-gutter">
        
        {/* Card 1 */}
        <div className="border border-frame bg-panel/40 p-5 flex flex-col justify-between relative group hover:border-neon-blue/40 transition-colors duration-300">
          <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-frame group-hover:border-neon-blue transition-colors" />
          <div className="space-y-1">
            <span className="font-mono text-[10px] text-steel uppercase tracking-wider font-bold flex items-center gap-2 select-none">
              <Layers size={11} className="text-steel" /> Total Interviews
            </span>
            <span className="font-mono text-3xl md:text-4xl text-pure-white font-black leading-tight block">
              {data.totalInterviews}
            </span>
          </div>
          <div className="h-px w-full bg-frame/40 mt-3 group-hover:bg-neon-blue/40 transition-colors" />
        </div>

        {/* Card 2 */}
        <div className="border border-frame bg-panel/40 p-5 flex flex-col justify-between relative group hover:border-neon-blue/40 transition-colors duration-300">
          <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-frame group-hover:border-neon-blue transition-colors" />
          <div className="space-y-1">
            <span className="font-mono text-[10px] text-steel uppercase tracking-wider font-bold flex items-center gap-2 select-none">
              <BarChart3 size={11} className="text-neon-blue" /> Average Score
            </span>
            <span className="font-mono text-3xl md:text-4xl text-neon-blue font-black leading-tight block drop-shadow-[0_0_15px_rgba(0,136,255,0.15)]">
              {data.averageScore}
            </span>
          </div>
          <div className="h-px w-full bg-frame/40 mt-3 group-hover:bg-neon-blue/40 transition-colors" />
        </div>

        {/* Card 3 */}
        <div className="border border-frame bg-panel/40 p-5 flex flex-col justify-between relative group hover:border-neon-blue/40 transition-colors duration-300">
          <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-frame group-hover:border-neon-blue transition-colors" />
          <div className="space-y-1">
            <span className="font-mono text-[10px] text-steel uppercase tracking-wider font-bold flex items-center gap-2 select-none">
              <Award size={11} className="text-steel" /> Best Performance
            </span>
            <span className="font-mono text-3xl md:text-4xl text-pure-white font-black leading-tight block">
              {data.bestPerformance}
            </span>
          </div>
          <div className="h-px w-full bg-frame/40 mt-3 group-hover:bg-neon-blue/40 transition-colors" />
        </div>

        {/* Card 4 */}
        <div className="border border-frame bg-panel/40 p-5 flex flex-col justify-between relative group hover:border-neon-blue/40 transition-colors duration-300">
          <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-frame group-hover:border-neon-blue transition-colors" />
          <div className="space-y-1">
            <span className="font-mono text-[10px] text-steel uppercase tracking-wider font-bold flex items-center gap-2 select-none">
              <Zap size={11} className="text-neon-blue" /> Success Rate
            </span>
            <span className="font-mono text-3xl md:text-4xl text-neon-blue font-black leading-tight block drop-shadow-[0_0_15px_rgba(0,136,255,0.15)]">
              {data.successRate}%
            </span>
          </div>
          <div className="h-px w-full bg-frame/40 mt-3 group-hover:bg-neon-blue/40 transition-colors" />
        </div>

      </div>

      {/* TEMPORAL TREND VECTOR CHART BLOCK */}
      <div className="border border-frame bg-panel/20 p-6 relative">
        <div className="flex justify-between items-center mb-6 select-none">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-neon-blue rounded-full animate-ping" />
            <span className="font-mono text-[10px] text-steel uppercase tracking-widest font-bold">
              READINESS TIMELINE TREND MATRIX
            </span>
          </div>
          <span className="font-mono text-[9px] text-steel/50 uppercase tracking-wider hidden sm:block">
            Status: Continuous Improvement Delta
          </span>
        </div>

        {/* Scaled SVG Vector Chart Wrapper */}
        <div className="relative h-44 md:h-52 w-full border-l border-b border-frame/80 bg-abyss/20">
          <svg className="w-full h-full overflow-visible p-1" viewBox="0 0 1000 400" preserveAspectRatio="none">
            {/* Trend Polyline Trace Vector */}
            <polyline
              fill="none"
              stroke="#0088FF"
              strokeWidth="4"
              points="0,320 250,260 500,240 750,210 1000,160"
              className="drop-shadow-[0_0_12px_rgba(0,136,255,0.7)]"
            />
            {/* Coordinate Connection Keyframes */}
            <circle cx="0" cy="320" fill="#0088FF" r="6" />
            <circle cx="250" cy="260" fill="#0088FF" r="6" />
            <circle cx="500" cy="240" fill="#0088FF" r="6" />
            <circle cx="750" cy="210" fill="#0088FF" r="6" />
            <circle cx="1000" cy="160" fill="#0088FF" r="8" className="animate-pulse" />
          </svg>

          {/* Graphical Data Timeline Labels Mapping */}
          <div className="absolute inset-x-0 bottom-3 flex justify-between items-end px-4 font-mono text-[9px] text-steel select-none pointer-events-none font-bold">
            {data.timelinePoints.map((point, index) => (
              <span 
                key={index} 
                className={index === data.timelinePoints.length - 1 ? "text-neon-blue" : ""}
              >
                {point.label} ({point.score}%)
              </span>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

export default AnalyticsHeroView;