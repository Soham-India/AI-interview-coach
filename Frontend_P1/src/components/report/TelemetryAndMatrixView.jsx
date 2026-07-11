import React from "react";
import { CheckCircle, AlertTriangle } from "lucide-react";

const SKILLS_DATA = [
  { id: "01", name: "SYSTEM DESIGN", score: 95.0 },
  { id: "02", name: "COMMUNICATION", score: 91.0 },
  { id: "03", name: "PROBLEM SOLVING", score: 89.0 },
  { id: "04", name: "LEADERSHIP", score: 78.0 },
];


const TelemetryAndMatrixView = ({ strengths = [], weaknesses = [] }) => {
  return (
    <div className="w-full h-full flex flex-col justify-between py-2 space-y-8 xl:space-y-12">
      
      {/* SECTION 3: PERFORMANCE TELEMETRY */}
      <div className="w-full">
        <div className="flex items-center space-x-4 mb-6 select-none">
          <h4 className="font-mono text-xs text-steel uppercase tracking-[0.4em] font-bold">
            PERFORMANCE_TELEMETRY
          </h4>
          <div className="h-px flex-grow bg-frame/60" />
        </div>

        <div className="grid grid-cols-1 gap-2">
          {SKILLS_DATA.map((skill) => (
            <div 
              key={skill.id}
              className="group border border-frame bg-panel/40 p-4 md:p-5 flex flex-col sm:flex-row sm:items-center justify-between hover:bg-neon-blue/5 transition-all duration-300"
            >
              <div className="font-mono text-xs md:text-sm text-steel mb-3 sm:mb-0">
                <span className="text-neon-blue font-bold mr-4">{skill.id}</span>
                <span className="group-hover:text-pure-white transition-colors tracking-wider">
                  {skill.name}
                </span>
              </div>
              
              <div className="flex items-center space-x-6 flex-grow max-w-3xl w-full">
                <div className="h-1.5 w-full bg-frame relative overflow-hidden rounded-full">
                  <div 
                    className="absolute inset-y-0 left-0 bg-neon-blue shadow-[0_0_10px_#0088FF] transition-all duration-1000 ease-out" 
                    style={{ width: `${skill.score}%` }}
                  />
                </div>
                <span className="font-mono text-neon-blue text-right text-xs md:text-sm font-bold w-14 select-none">
                  {skill.score.toFixed(1)}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTIONS 4 & 5: STRENGTHS & VULNERABILITIES (BRUTALIST ROW GRID) */}
      <div className="grid md:grid-cols-2 gap-px bg-frame border border-frame">
        
        {/* STRENGTH NODES */}
        <div className="bg-panel/40 p-6 md:p-8 relative group">
          <h4 className="font-mono text-xs text-neon-blue mb-6 uppercase tracking-[0.4em] flex items-center font-bold select-none">
            <CheckCircle size={14} className="mr-2 text-neon-blue" strokeWidth={2.5} /> 
            STRENGTH_NODES
          </h4>
          <ul className="space-y-2.5">
            {strengths.map((strength, idx) => (
              <li 
                key={idx} 
                className="font-mono text-sm border border-frame bg-abyss/40 p-3.5 flex justify-between items-center group-hover:border-neon-blue/30 transition-colors duration-300"
              >
                <span className="text-pure-white uppercase text-xs tracking-wide">{strength}</span>
                <span className="text-neon-blue text-xs font-black select-none">[ + ]</span>
              </li>
            ))}
          </ul>
        </div>

        {/* EXPOSED VULNERABILITIES */}
        <div className="bg-panel/40 p-6 md:p-8 relative group">
          <h4 className="font-mono text-xs text-warning mb-6 uppercase tracking-[0.4em] flex items-center font-bold select-none">
            <AlertTriangle size={14} className="mr-2 text-warning" strokeWidth={2.5} /> 
            EXPOSED_VULNS
          </h4>
          <ul className="space-y-2.5">
            {weaknesses.map((vuln, idx) => (
              <li 
                key={idx} 
                className="font-mono text-sm border border-frame bg-abyss/40 p-3.5 flex justify-between items-center group-hover:border-warning/30 transition-colors duration-300"
              >
                <span className="text-pure-white uppercase text-xs tracking-wide">{vuln}</span>
                <span className="text-warning text-xs font-black select-none">[ ! ]</span>
              </li>
            ))}
          </ul>
        </div>

      </div>

    </div>
  );
};

export default TelemetryAndMatrixView;