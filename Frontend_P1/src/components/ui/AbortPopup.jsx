import React from "react";
import { AlertTriangle } from "lucide-react";

const AbortPopup = ({ 
  isOpen, 
  onClose, 
  onConfirm,
  title = "TERMINATE NEURAL LINK?", 
  message = "Aborting the simulation will erase all current sequence progress. Are you prepared to disconnect?",
  confirmText = "CONFIRM ABORT",
  cancelText = "REMAIN IN CHAMBER"
}) => {

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-abyss/80 backdrop-blur-sm select-none">
      {/* The Modal Container */}
      <div className="relative w-full max-w-2xl mx-4">
        
        {/* Neon Edge Accent */}
        <div className="absolute -inset-[2px] bg-neon-blue opacity-30 architectural-cut" />
        
        <div className="relative bg-panel architectural-cut border border-frame p-8 md:p-16 flex flex-col items-center text-center shadow-[0_0_100px_rgba(0,136,255,0.1)] overflow-hidden">
          
          {/* Scanline FX */}
          <div className="absolute top-0 left-0 w-full h-[2px] bg-neon-blue/20 animate-[scan_4s_linear_infinite] z-10" />
          
          {/* Header */}
          <div className="mb-8 flex flex-col items-center">
            <AlertTriangle size={56} className="text-warning mb-6" strokeWidth={1.5} />
            <h1 className="font-scene-focus text-4xl md:text-5xl text-pure-white uppercase tracking-tighter leading-tight">
              {title}
            </h1>
          </div>
          
          {/* Body Text */}
          <div className="max-w-md mb-12">
            <p className="font-body-lg text-xl text-steel leading-relaxed">
              {message}
            </p>
          </div>
          
          {/* Actions */}
          <div className="flex flex-col md:flex-row gap-6 w-full justify-center">
            {/* Secondary Action (Cancel/Close) */}
            <button 
              onClick={onClose}
              className="button-cut border border-frame px-8 py-4 text-steel font-metadata text-xs uppercase tracking-widest hover:text-pure-white hover:border-pure-white transition-all duration-300 group flex items-center justify-center cursor-pointer"
            >
              <span className="mr-2 opacity-50 group-hover:opacity-100 transition-opacity">[</span>
              {cancelText}
              <span className="ml-2 opacity-50 group-hover:opacity-100 transition-opacity">]</span>
            </button>
            
            {/* Primary Action (Confirm/Execute) */}
            <button 
              onClick={onConfirm} // Execution callback passed down from the parent context
              className="button-cut border border-warning px-10 py-4 text-warning font-metadata text-xs uppercase tracking-[0.2em] font-black hover:bg-warning/10 transition-all duration-300 group flex items-center justify-center shadow-[0_0_20px_rgba(239,68,68,0.2)] cursor-pointer"
            >
              <span className="mr-2 animate-pulse">[</span>
              {confirmText}
              <span className="ml-2 animate-pulse">]</span>
            </button>
          </div>
          
          {/* Footer Technical Metadata */}
          <div className="mt-12 pt-8 border-t border-frame/50 w-full flex justify-between font-metadata text-[10px] text-steel/40 uppercase tracking-widest">
            <span>SYS_ID: 0x992-TERMINATION</span>
            <span>ENCRYPTION: AES-256-BIT</span>
          </div>
        </div>
        
        {/* Corner Accents */}
        <div className="absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-neon-blue/50" />
        <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 border-warning/50" />
      </div>
    </div>
  );
};

export default AbortPopup;