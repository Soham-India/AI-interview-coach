import React from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, AlertTriangle, Rocket, Eye, CreditCard, Terminal } from "lucide-react";

// Helper map to swap out context icons based on target companies dynamically
const ICON_MAP = {
  spacex: <Rocket size={160} className="translate-x-1/4 -translate-y-1/4" />,
  palantir: <Eye size={160} className="translate-x-1/4 -translate-y-1/4" />,
  stripe: <CreditCard size={160} className="translate-x-1/4 -translate-y-1/4" />,
  default: <Terminal size={160} className="translate-x-1/4 -translate-y-1/4" />
};

const VaultNode = ({ log }) => {
  const navigate = useNavigate();
  const isCompleted = log.status === "COMPLETED";
  const bgIcon = ICON_MAP[log.company.toLowerCase()] || ICON_MAP.default;

  const handleClick = () => {
    if (isCompleted) {
      navigate(`/report/${log.id}`);
    }
  };

  return (
    <div className="relative w-full group select-none [perspective:1200px]">
      
      {/* TIMELINE DOT: Fixed absolute anchor node over the left track layout line */}
      <div 
        className={`absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-3 h-3 rounded-none z-30 border border-abyss transition-all duration-500
          ${isCompleted 
            ? "bg-neon-blue shadow-[0_0_12px_#0088FF] group-hover:scale-125" 
            : "bg-frame group-hover:bg-warning group-hover:scale-125"
          }
        `}
      />

      {/* 3D PRESSED VAULT PANEL */}
      <div 
        onClick={handleClick}
        className={`ml-12 md:ml-24 bg-panel/80 border border-frame p-8 md:p-10 flex flex-col md:flex-row justify-between items-start md:items-center relative overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] backdrop-blur-md
          hover:border-neon-blue hover:shadow-[0_0_40px_rgba(0,136,255,0.25)] 
          hover:[transform:translateZ(50px)_scale(1.02)]
          ${isCompleted 
            ? "opacity-100 cursor-pointer" 
            : "opacity-60 hover:opacity-100 cursor-not-allowed"
          }
        `}
      >
        {/* Left side vertical status glow tracker */}
        <div className={`absolute top-0 left-0 h-full w-1 transition-colors duration-500 ${isCompleted ? "bg-neon-blue/20 group-hover:bg-neon-blue" : "bg-frame group-hover:bg-warning"}`} />

        {/* Primary Telemetry Stream Data */}
        <div className="space-y-2 relative z-10 flex-1">
          <div className="font-mono text-[10px] text-steel uppercase tracking-widest font-bold">
            {log.reference}
          </div>
          <h2 className="font-headline-xl text-2xl md:text-4xl lg:text-5xl text-pure-white uppercase font-black tracking-tight leading-none group-hover:text-neon-blue transition-colors duration-300">
            {log.company}
          </h2>
          <div className="font-mono text-[11px] text-steel font-bold tracking-wider uppercase pt-1">
            {log.role} // <span className="text-steel/50">{log.timestamp}</span>
          </div>
        </div>

        {/* Readiness Index Score Output */}
        <div className="flex flex-col items-start md:items-end justify-center shrink-0 relative z-10 mt-6 md:mt-0 select-none">
          <span className="font-mono text-[10px] text-steel uppercase tracking-wider font-bold mb-1 block">
            READINESS_SCORE
          </span>
          <div className="flex items-center gap-3">
            <span className={`font-mono text-5xl md:text-7xl font-black tracking-tighter leading-none ${isCompleted ? "text-neon-blue" : "text-warning"}`}>
              {isCompleted ? log.score : "--"}
              <span className="text-xl md:text-2xl font-mono text-steel/40 ml-0.5 font-bold">%</span>
            </span>
            {isCompleted ? (
              <CheckCircle2 size={24} className="text-neon-blue drop-shadow-[0_0_10px_rgba(0,136,255,0.4)]" />
            ) : (
              <AlertTriangle size={24} className="text-warning animate-pulse" />
            )}
          </div>
        </div>

        {/* Ambient watermark background icon mesh geometry */}
        <div className={`absolute right-0 top-0 opacity-5 group-hover:opacity-15 transition-all duration-700 pointer-events-none select-none text-neon-blue ${isCompleted ? "text-neon-blue" : "text-warning"}`}>
          {bgIcon}
        </div>

        {/* VIEW REPORT hint on hover for completed sessions */}
        {isCompleted && (
          <div className="absolute bottom-3 right-4 font-mono text-[9px] text-neon-blue/0 group-hover:text-neon-blue/60 tracking-widest uppercase transition-all duration-500 select-none pointer-events-none font-bold">
            CLICK TO VIEW REPORT →
          </div>
        )}

      </div>
    </div>
  );
};

export default VaultNode;