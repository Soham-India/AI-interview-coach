import React from "react";
import { PieChart, TrendingUp, ArrowUpRight } from "lucide-react";

const DELTAS_DATA = [
  {
    increment: "+8",
    title: "COMMUNICATION CLARITY",
    desc: "Reduction in vocal fillers and improved technical articulation.",
  },
  {
    increment: "+5",
    title: "OPERATOR CONFIDENCE",
    desc: "Increased stability in system design delivery phases.",
  },
];

const AnalyticsDistributionView = ({ distribution = [] }) => {
  const distributionData = distribution.map(item => ({
    sector: item.topic,
    count: item.count,
    ratio: `${Math.round((item.count / distribution.reduce((a, b) => a + b.count, 0)) * 100)}%`,
  }));
  return (
    <div className="w-full h-full grid grid-cols-1 lg:grid-cols-2 gap-gutter lg:gap-16 items-center">
      
      {/* LEFT COLUMN: INTERVIEW DISTRIBUTION PANEL */}
      <div className="border border-frame bg-panel/30 p-6 md:p-8 relative group hover:border-neon-blue/20 transition-colors duration-300">
        <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-frame group-hover:border-neon-blue transition-colors" />
        
        <div className="mb-8 select-none">
          <span className="font-mono text-[10px] text-neon-blue mb-1 block uppercase tracking-[0.3em] font-bold flex items-center gap-2">
            <PieChart size={12} /> Interrogation Types
          </span>
          <h3 className="font-scene-focus text-2xl md:text-3xl text-pure-white uppercase font-black tracking-tight">
            Interview Distribution
          </h3>
        </div>

        <div className="space-y-4">
          {distributionData.map((item, idx) => (
            <div 
              key={idx} 
              className="flex items-center justify-between border border-frame/50 bg-abyss/40 p-4 hover:bg-neon-blue/5 transition-colors duration-300 group/row"
            >
              <div className="flex flex-col">
                <span className="font-mono text-xs text-steel group-hover/row:text-pure-white transition-colors font-bold tracking-wider">
                  {item.sector}
                </span>
                <span className="font-mono text-[9px] text-steel/40 uppercase mt-0.5">
                  Allocation: {item.ratio}
                </span>
              </div>
              <span className="font-mono text-xl md:text-2xl text-pure-white font-black tracking-tighter">
                {item.count < 10 ? `0${item.count}` : item.count}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT COLUMN: OPTIMIZATION DELTAS */}
      <div className="border border-frame bg-panel/30 p-6 md:p-8 relative group hover:border-neon-blue/20 transition-colors duration-300">
        <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-frame group-hover:border-neon-blue transition-colors" />

        <div className="mb-8 select-none">
          <span className="font-mono text-[10px] text-neon-blue mb-1 block uppercase tracking-[0.3em] font-bold flex items-center gap-2">
            <TrendingUp size={12} /> Optimization Deltas
          </span>
          <h3 className="font-scene-focus text-2xl md:text-3xl text-pure-white uppercase font-black tracking-tight">
            Recent Improvement
          </h3>
        </div>

        <div className="space-y-6">
          {DELTAS_DATA.map((delta, idx) => (
            <div key={idx} className="flex items-start gap-4 group/delta">
              
              {/* Telemetry Index Value Box */}
              <div className="w-12 h-12 flex items-center justify-center border border-neon-blue/40 bg-neon-blue/5 text-neon-blue font-mono font-black text-sm tracking-tighter shrink-0 select-none group-hover/delta:border-neon-blue group-hover/delta:bg-neon-blue group-hover/delta:text-abyss transition-all duration-300 shadow-[0_0_15px_rgba(0,136,255,0.05)]">
                {delta.increment}
              </div>
              
              <div className="space-y-0.5">
                <h4 className="font-mono text-xs text-pure-white uppercase font-black tracking-wider flex items-center gap-1">
                  {delta.title} <ArrowUpRight size={12} className="text-neon-blue opacity-0 group-hover/delta:opacity-100 transition-all duration-300" />
                </h4>
                <p className="font-mono text-[11px] text-steel leading-relaxed">
                  {delta.desc}
                </p>
              </div>

            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default AnalyticsDistributionView;