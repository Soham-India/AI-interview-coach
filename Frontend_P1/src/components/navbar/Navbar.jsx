import React from "react";
import { LogIn, Menu } from "lucide-react";
import { openMenu } from "../../redux/features/drawerSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const Navbar = ({ isSimulation = false, timeString = "00:00:00", progressPercent = 0 }) => {
  const dispatch = useDispatch();

  return (
    <header 
      id="main-header"
      className="fixed top-0 w-full bg-abyss flex justify-between items-center px-margin-edge h-18 z-50 border-b border-frame transition-all duration-300"
    >
      {/* Dynamic Branding vs Telemetry Left Track */}
      {!isSimulation ? (
        <div 
          className="font-scene-focus text-scene-focus font-bold text-icy-blue  uppercase tracking-tighter" 
          style={{ fontSize: "24px", lineHeight: "32px" }}
        >
          <Link to="/">INTERVIEW <span className="">AI</span></Link>
        </div>
      ) : (
        <div className="flex flex-col select-none">
          <span className="text-steel font-metadata text-[10px] uppercase tracking-wider">Elapsed Time</span>
          <span className="text-pure-white font-mono text-base font-bold tracking-widest">{timeString}</span>
        </div>
      )}

      {/* Center Progress Bar Segment - ONLY shows during active simulation */}
      {isSimulation && (
        <div className="flex-1 max-w-xl px-12 hidden md:block">
          <div className="h-[2px] w-full bg-frame relative rounded-full">
            <div 
              className="absolute top-0 left-0 h-full bg-neon-blue transition-all duration-300 shadow-[0_0_8px_#0088FF]" 
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex justify-between mt-1.5">
            <span className="text-steel font-metadata text-[9px] uppercase tracking-wider">Chamber Progression</span>
            <span className="text-neon-blue font-metadata text-[9px] font-bold">{progressPercent}%</span>
          </div>
        </div>
      )}

      {/* Right Control Actions Trigger */}
      <div 
        className="flex items-stretch h-10 overflow-hidden" 
        style={{ clipPath: "polygon(10% 0px, 100% 0px, 100% 90%, 90% 100%, 0px 100%, 0px 10%)" }}
      >
        <button className="bg-deep-panel hover:bg-raised-panel text-pure-white px-4 flex items-center gap-2 transition-colors duration-300 border-r border-frame">
          <LogIn size={14} strokeWidth={1.8} />
          <span className="font-metadata text-metadata tracking-widest">LOGIN</span>
        </button>
        
        <button 
          id="open-menu"
          onClick={() => dispatch(openMenu())}
          className="bg-icy-blue hover:bg-pure-white text-ink px-4 flex items-center gap-2 transition-colors duration-300"
        >
          <Menu size={14} strokeWidth={1.8} />
          <span className="font-metadata text-metadata tracking-widest">MENU</span>
        </button>
      </div>
    </header>
  );
};

export default Navbar;