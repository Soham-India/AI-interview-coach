import React, { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

const SIMULATION_LOGS = [
  "GENERATING BESPOKE ADVERSARIAL MATRIX...",
  "PARSING TARGET COMPETENCIES // SEC_DELTA",
  "CALIBRATING NEURAL TEXT WORKSPACE FLOW...",
  "ESTABLISHING TIMELINE LOGISTICS STREAM...",
  "SYNC STATUS: COGNITIVE OVERFLOW DEPLOYED",
  "ESTABLISHING AES-256 SECURE SHIELD LINK...",
  "INITIALIZING ADVERSARIAL INTERACTION KERNEL...",
];

const LoadingPortal = () => {
  const [logIndex, setLogIndex] = useState(0);

  // Rotate through tech diagnostic logs cleanly
  useEffect(() => {
    const logInterval = setInterval(() => {
      setLogIndex((prev) => (prev + 1) % SIMULATION_LOGS.length);
    }, 1800);

    return () => clearInterval(logInterval);
  }, []);

  return (
    <div className="fixed inset-0 z-[150] flex flex-col items-center justify-center bg-abyss select-none overflow-hidden">
      
      {/* Background visual blueprint calibration elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-5 z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-steel" />
        <div className="absolute top-1/2 left-0 w-full h-px bg-steel" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-dashed border-steel rounded-full" />
      </div>

      {/* Central Immersive Core Ring Container */}
      <div className="relative flex items-center justify-center w-80 h-80 z-10">
        
        {/* Infinite slow ambient glow track */}
        <div className="absolute inset-0 bg-neon-blue/5 rounded-full blur-[100px] animate-pulse duration-1000" />

        {/* Layered concentric framing rings */}
        <div className="absolute w-full h-full border border-frame/40 rounded-full" />
        <div className="absolute w-[85%] h-[85%] border border-dashed border-neon-blue/20 rounded-full animate-[spin_40s_linear_infinite]" />
        <div className="absolute w-[70%] h-[70%] border border-frame/60 rounded-full" />

        {/* Dynamic active spinner element */}
        <div className="absolute w-[70%] h-[70%] border-t-2 border-l-2 border-neon-blue rounded-full animate-spin" />

        {/* Core Vector Matrix Crosshair Grid Graphics */}
        <svg className="absolute w-24 h-24 text-neon-blue/30 select-none pointer-events-none" viewBox="0 0 100 100">
          <line x1="50" y1="5" x2="50" y2="95" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
          <line x1="5" y1="50" x2="95" y2="50" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
          <circle cx="50" cy="50" r="12" fill="none" stroke="currentColor" strokeWidth="0.5" />
        </svg>

        {/* Center Loading Status Icon Indicator */}
        <div className="relative z-20 flex flex-col items-center justify-center">
          <Loader2 size={32} className="text-neon-blue animate-spin drop-shadow-[0_0_15px_rgba(0,136,255,0.6)]" strokeWidth={1.5} />
        </div>

        {/* Sharp Tech Corner Markers bounding the outer structure */}
        <div className="absolute -top-4 -left-4 w-4 h-4 border-t border-l border-neon-blue/40" />
        <div className="absolute -top-4 -right-4 w-4 h-4 border-t border-r border-neon-blue/40" />
        <div className="absolute -bottom-4 -left-4 w-4 h-4 border-b border-l border-neon-blue/40" />
        <div className="absolute -bottom-4 -right-4 w-4 h-4 border-b border-r border-neon-blue/40" />
      </div>

      {/* Telemetry Status Diagnostic Stream Footer */}
      <div className="mt-16 text-center z-10 px-6 max-w-md h-12 flex flex-col justify-center">
        <div className="font-metadata text-neon-blue tracking-[0.4em] uppercase text-[10px] mb-2 animate-pulse">
          TUNING PROTOCOL VECTOR
        </div>
        <p className="font-mono text-steel text-xs uppercase tracking-widest leading-relaxed transition-all duration-300">
          &gt; {SIMULATION_LOGS[logIndex]}
        </p>
      </div>

      {/* Frame identification token metadata */}
      <div className="absolute bottom-6 font-metadata text-[8px] text-steel/30 tracking-[0.5em] uppercase select-none pointer-events-none">
        CHAMBER_CALIBRATION_SEQUENCE_ACTIVE
      </div>

    </div>
  );
};

export default LoadingPortal;