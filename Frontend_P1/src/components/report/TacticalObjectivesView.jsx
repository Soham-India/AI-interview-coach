import React from "react";
import { Rocket, Shield, History, PlusCircle, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";

const OBJECTIVES_DATA = [
  {
    id: "OBJ_01",
    icon: <Rocket size={28} className="text-neon-blue" />,
    title: "Master Saga Pattern",
    label: "MISSION"
  },
  {
    id: "OBJ_02",
    icon: <Shield size={28} className="text-neon-blue" />,
    title: "Design Failure Recovery Flow",
    label: "MISSION"
  },
  {
    id: "OBJ_03",
    icon: <History size={28} className="text-neon-blue" />,
    title: "Implement Rollback Strategy",
    label: "MISSION"
  }
];

const TacticalObjectivesView = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-full flex flex-col justify-between py-4 space-y-12">
      
      {/* SECTION 7: TACTICAL OBJECTIVES */}
      <div className="w-full">
        <div className="flex items-center space-x-4 mb-8 select-none">
          <h4 className="font-mono text-xs text-steel uppercase tracking-[0.4em] font-bold">
            TACTICAL_OBJECTIVES.EXE
          </h4>
          <div className="h-px flex-grow bg-frame/60" />
        </div>

        {/* Brutalist Grid Layout: Stacks on mobile, splits 3-columns on laptops */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-frame border border-frame">
          {OBJECTIVES_DATA.map((obj) => (
            <div 
              key={obj.id}
              className="p-6 md:p-8 bg-panel/40 flex flex-col items-start space-y-6 hover:bg-neon-blue/5 transition-all duration-300 group"
            >
              <div className="text-neon-blue/50 font-mono text-[10px] font-bold tracking-widest select-none">
                {obj.id}
              </div>
              
              <div className="p-3 bg-abyss/40 border border-frame group-hover:border-neon-blue/40 transition-colors duration-300">
                {obj.icon}
              </div>
              
              <div className="font-mono">
                <div className="text-[10px] text-steel mb-1 font-bold tracking-wider select-none">
                  {obj.label}
                </div>
                <div className="text-base md:text-lg text-pure-white uppercase font-black tracking-tight leading-snug">
                  {obj.title}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 8: TERMINUS ACTIONS */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-6 pt-8 border-t border-frame/60 w-full">
        
        {/* Primary Call To Action: Reinitializes standard portal configuration loops */}
        <button 
          onClick={() => navigate("/initialize")}
          className="w-full sm:w-auto px-10 h-14 bg-neon-blue text-abyss font-mono text-xs font-black uppercase tracking-widest hover:bg-pure-white hover:text-ink transition-all duration-300 button-cut flex items-center justify-center gap-3 cursor-pointer shadow-[0_0_30px_rgba(0,136,255,0.2)]"
        >
          <PlusCircle size={16} strokeWidth={2.5} />
          NEW_INTERVIEW
        </button>

        {/* Secondary Call To Action: Document Export Protocol */}
        <button 
          className="w-full sm:w-auto px-10 h-14 border border-frame text-steel font-mono text-xs font-bold uppercase tracking-widest hover:text-pure-white hover:border-pure-white transition-all duration-300 button-cut flex items-center justify-center gap-3 cursor-pointer bg-panel/20"
        >
          <Download size={16} strokeWidth={2} />
          EXPORT_ARCHIVE
        </button>

      </div>

    </div>
  );
};

export default TacticalObjectivesView;