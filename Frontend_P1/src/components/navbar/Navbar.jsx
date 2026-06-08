import React from "react";
import { LogIn, Menu } from "lucide-react";
import { openMenu } from "../../redux/features/drawerSlice";
import {useDispatch} from 'react-redux'


const Navbar = () => {
  const dispatch = useDispatch();
  return (
    <header 
      id="main-header"
      className="fixed top-0 w-full bg-abyss flex justify-between items-center px-margin-edge h-20 z-50 border-b border-frame transition-all duration-300"
    >
      <div 
        className="font-scene-focus text-scene-focus font-bold text-on-surface uppercase tracking-tighter" 
        style={{ fontSize: "24px", lineHeight: "32px" }}
      >
        INTERVIEW AI
      </div>

      <div 
        className="flex items-stretch h-10 overflow-hidden" 
        style={{ clipPath: "polygon(10% 0px, 100% 0px, 100% 90%, 90% 100%, 0px 100%, 0px 10%)" }}
      >
        <button className="bg-deep-panel hover:bg-raised-panel text-pure-white px-4 flex items-center gap-2 transition-colors duration-300 border-r border-frame">
          <LogIn size={14} strokeWidth={1.8} />
          <span className="font-metadata text-metadata tracking-widest">
            LOGIN
          </span>
        </button>
        
        <button 
          id="open-menu"
          onClick={()=> dispatch(openMenu())}
          className="bg-icy-blue hover:bg-pure-white text-ink px-4 flex items-center gap-2 transition-colors duration-300"
        >
          <Menu size={14} strokeWidth={1.8} />
          <span className="font-metadata text-metadata tracking-widest">
            MENU
          </span>
        </button>
      </div>
    </header>
  );
};

export default Navbar;