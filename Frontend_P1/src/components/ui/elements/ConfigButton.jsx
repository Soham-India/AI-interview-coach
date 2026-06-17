import React from "react";

const ConfigButton = ({ isActive, onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className={`
        px-6 py-3 border-2 font-mono text-sm md:text-base font-bold uppercase transition-all duration-300 button-cut cursor-pointer
        ${isActive 
          ? "border-neon-blue bg-neon-blue/10 text-neon-blue shadow-[0_0_20px_rgba(0,136,255,0.2)]" 
          : "border-frame text-steel hover:text-pure-white hover:border-neon-blue/40 bg-panel/20"
        }
      `}
    >
      {children}
    </button>
  );
};

export default ConfigButton;