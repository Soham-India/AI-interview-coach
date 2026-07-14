import React from "react";
import { Activity, CornerDownRight, BrainCircuit, Compass } from "lucide-react";

const QuestionTelemetryView = ({ data, isLast }) => {
  // Determine color scheme based on performance index score
  const isStrong = data.score >= 7.0;
  const accentColor = isStrong ? "text-neon-blue" : "text-warning";
  const borderColor = isStrong ? "border-neon-blue/30" : "border-warning/30";
  const nodeBorder = isStrong ? "border-neon-blue" : "border-warning";
  const pulseBg = isStrong ? "bg-neon-blue" : "bg-warning";

  return (
    <div className="py-4 relative w-full h-full flex flex-col justify-center">
      
      {/* TIMELINE INTERFACE NODE — positioned exactly on the vertical line */}
      <div className={`absolute -left-12 top-1/2 -translate-y-1/2 w-[22px] h-[22px] bg-abyss border-2 ${nodeBorder} rounded-full z-10 flex items-center justify-center select-none`}>
        <div className={`w-2 h-2 ${pulseBg} rounded-full ${isStrong ? "animate-pulse" : ""}`} />
      </div>

      {/* Content — padded away from the timeline line */}
      <div className="pl-12">

      {/* COMPACT SUMMARY HEADER CARD */}
      <div className="border border-frame bg-panel/60 overflow-hidden flex flex-col justify-between flex-shrink-0">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between p-5 border-b border-frame/40">
          <div>
            <span className={`font-mono text-[10px] uppercase tracking-[0.25em] block mb-1 ${accentColor}`}>
              SEQUENCE_{data.sequence} // {data.topic}
            </span>
            <h5 className="font-scene-focus text-xl md:text-2xl text-pure-white uppercase font-black tracking-tight">
              {data.verdict}
            </h5>
          </div>

          <div className="text-left sm:text-right mt-4 sm:mt-0 select-none">
            <span className={`font-mono text-5xl md:text-6xl font-black leading-none tracking-tighter ${accentColor}`}>
              {data.score.toFixed(1)}
            </span>
            <span className="font-mono text-[10px] block text-steel uppercase tracking-widest mt-1 font-bold">
              INDEX_SCORE
            </span>
          </div>
        </div>

        {/* THREE-COLUMN DOSSIER MATRIX (Optimized for Laptop Heights) */}
        <div className="p-6 bg-abyss/40 grid grid-cols-1 lg:grid-cols-3 gap-4 text-xs md:text-sm">
          
          {/* Column 1: Core Prompt & Candidate Response */}
          <div className="space-y-4 border-r border-frame/20 pr-4">
            <div>
              <h6 className="font-mono text-[10px] text-steel uppercase tracking-[0.25em] mb-1.5 font-bold select-none">
                QUESTION PROTOCOL
              </h6>
              <p className="text-pure-white leading-relaxed font-medium">
                {data.question}
              </p>
            </div>
            <div>
              <h6 className={`font-mono text-[10px] uppercase tracking-[0.25em] mb-1.5 font-bold select-none ${accentColor}`}>
                YOUR RESPONSE FEED
              </h6>
              <div className="border border-frame bg-panel/80 p-3.5 max-h-[110px] overflow-y-auto brutalist-scroll">
                <p className="text-steel leading-relaxed font-mono text-xs">
                  {data.userResponse}
                </p>
              </div>
            </div>
          </div>

          {/* Column 2: AI Structural Evaluation */}
          <div className="space-y-2 border-r border-frame/20 lg:px-4">
            <h6 className="font-mono text-[10px] text-success uppercase tracking-[0.25em] mb-1.5 font-bold select-none flex items-center gap-1.5">
              <BrainCircuit size={12} /> AI_STRUCTURAL_ANALYSIS
            </h6>
            <div className="border border-success/20 bg-success/5 p-4 h-[175px] overflow-y-auto brutalist-scroll">
              <p className="text-on-surface leading-relaxed text-xs font-medium">
                {data.aiAnalysis}
              </p>
            </div>
          </div>

          {/* Column 3: Actionable Optimization Directives */}
          <div className="space-y-2 lg:pl-4">
            <h6 className="font-mono text-[10px] text-warning uppercase tracking-[0.25em] mb-1.5 font-bold select-none flex items-center gap-1.5">
              <Compass size={12} /> IMPROVEMENT_DIRECTIVES
            </h6>
            <div className="border border-warning/20 bg-warning/5 p-4 h-[175px] overflow-y-auto brutalist-scroll">
              <ul className="space-y-2 text-steel font-mono text-xs">
                {data.directives.map((directive, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CornerDownRight size={12} className="text-warning shrink-0 mt-0.5" />
                    <span>{directive}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </div>

      </div>
    </div>
  );
};

export default QuestionTelemetryView;