import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, RefreshCw, Terminal } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) return;

    setIsAuthenticating(true);

    // Simulate mainframe encryption crack / authentication loop
    setTimeout(() => {
      setIsAuthenticating(false);
      navigate("/initialize");
    }, 1800);
  };

  return (
    <div className="app-shell">
      
      {/* BACKGROUND MATRIX GRAPHICS & PULSING GRID */}
      <div className="absolute inset-0 z-0 overflow-hidden opacity-30 pointer-events-none">
        <div 
          className="absolute inset-0" 
          style={{ 
            backgroundImage: "radial-gradient(circle at 2px 2px, #1A2436 1px, transparent 0)", 
            backgroundSize: "40px 40px" 
          }} 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neon-blue/5 to-transparent animate-pulse" />
      </div>

      {/* FIXED CONTEXTUAL TOP NAVIGATION BAR (No bottom border as per design directives) */}
      <header className="flex justify-between items-center px-margin-edge h-20 w-full absolute top-0 left-0 z-50 select-none">
        <div className="font-mono text-xs uppercase tracking-widest text-primary font-bold">
          AI INTERVIEW COACH
        </div>
        <div className="font-mono text-xs uppercase tracking-widest text-steel hover:text-pure-white transition-colors duration-200 cursor-pointer">
          [ MENU ]
        </div>
      </header>

      {/* LEFT SIDE VERTICAL TELEMETRY PERIPHERALS */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 flex flex-col gap-12 z-20 hidden md:flex select-none pointer-events-none">
        <div className="font-mono text-[10px] text-neon-blue uppercase tracking-[0.5em] [writing-mode:vertical-lr] rotate-180 font-bold">
          SYSTEM_STATUS: ACTIVE
        </div>
        <div className="font-mono text-[10px] text-steel/60 uppercase tracking-[0.5em] [writing-mode:vertical-lr] rotate-180 font-bold">
          ENCRYPTION: AES-256
        </div>
      </div>

      {/* RIGHT SIDE VERTICAL TELEMETRY PERIPHERALS */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-12 z-20 hidden md:flex select-none pointer-events-none">
        <div className="font-mono text-[10px] text-neon-blue uppercase tracking-[0.5em] [writing-mode:vertical-lr] font-bold">
          OPERATOR_ID: UNKNOWN
        </div>
        <div className="font-mono text-[10px] text-steel/60 uppercase tracking-[0.5em] [writing-mode:vertical-lr] font-bold">
          LOCATION: SIM_CHAMBER_01
        </div>
      </div>

      {/* CENTRAL ACCESS INTERFACE CORE */}
      <main className="w-full h-full flex flex-col items-center justify-center p-6 relative z-10">
        
        {/* Core Stage Headers */}
        <div className="mb-10 text-center select-none">
          <p className="font-mono text-xs text-neon-blue mb-2 uppercase tracking-[0.25em] font-bold animate-pulse">
            OPERATOR ACCESS PROTOCOL
          </p>
          <h1 className="text-3xl md:text-5xl font-black text-pure-white uppercase tracking-tight max-w-2xl leading-none">
            ENTER THE SIMULATION CHAMBER
          </h1>
        </div>

        {/* SHUTTERED AUTHENTICATION BOX */}
        <div className="relative w-full max-w-lg p-10 md:p-12 bg-panel/80 backdrop-blur-md border border-neon-blue/20 shadow-[0_0_60px_rgba(0,136,255,0.05)]">
          
          {/* Outward-running crosshair laser lines */}
          <div className="absolute -top-16 -bottom-16 left-0 w-px bg-gradient-to-b from-transparent via-neon-blue/30 to-transparent pointer-events-none" />
          <div className="absolute -top-16 -bottom-16 right-0 w-px bg-gradient-to-b from-transparent via-neon-blue/30 to-transparent pointer-events-none" />
          <div className="absolute -left-16 -right-16 top-0 h-px bg-gradient-to-r from-transparent via-neon-blue/30 to-transparent pointer-events-none" />
          <div className="absolute -left-16 -right-16 bottom-0 h-px bg-gradient-to-r from-transparent via-neon-blue/30 to-transparent pointer-events-none" />

          {/* Blueprint Target Coordinate Overlays */}
          <div className="absolute -top-5 -left-5 font-mono text-[9px] text-neon-blue/40 select-none font-bold">X: 402.12</div>
          <div className="absolute -top-5 -right-5 font-mono text-[9px] text-neon-blue/40 select-none font-bold">Y: 881.04</div>
          <div className="absolute -bottom-5 -left-5 font-mono text-[9px] text-neon-blue/40 select-none font-bold">Z: 002.44</div>
          <div className="absolute -bottom-5 -right-5 font-mono text-[9px] text-neon-blue/40 select-none font-bold">REF: ARCH_01</div>

          {/* Lateral Vector Extenders */}
          <div className="absolute top-1/2 -left-[160px] w-[160px] h-px bg-gradient-to-r from-transparent to-neon-blue/20 hidden lg:block pointer-events-none" />
          <div className="absolute top-1/2 -right-[160px] w-[160px] h-px bg-gradient-to-l from-transparent to-neon-blue/20 hidden lg:block pointer-events-none" />

          <h2 className="font-mono text-pure-white text-base md:text-lg mb-8 uppercase tracking-[0.3em] text-center font-black select-none flex items-center justify-center gap-2">
            <Terminal size={14} className="text-neon-blue" /> OPERATOR LOGIN
          </h2>

          {/* LOGIN ACTIONS MATRIX */}
          <form onSubmit={handleLoginSubmit} className="space-y-8">
            
            {/* Input Node 1: Email */}
            <div className="relative group/input border-b border-frame focus-within:border-neon-blue transition-colors duration-300">
              <label 
                className="block font-mono text-[10px] text-steel uppercase tracking-wider font-bold mb-1 select-none" 
                htmlFor="email"
              >
                Email Address
              </label>
              <div className="flex items-center bg-abyss/40 border-l-2 border-neon-blue/20 focus-within:border-neon-blue px-3 relative">
                <Mail size={16} className="text-steel/50 mr-2 shrink-0" />
                <input 
                  type="email" 
                  id="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="operator@domain.com" 
                  required
                  disabled={isAuthenticating}
                  className="w-full bg-transparent border-none text-pure-white font-mono text-sm md:text-base focus:ring-0 placeholder-surface-variant/40 py-3 pl-1 outline-none"
                />
              </div>
              {/* Dynamic animated underscore pulse */}
              <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-neon-blue transition-all duration-500 group-focus-within/input:w-full" />
            </div>

            {/* Input Node 2: Password */}
            <div className="relative group/input border-b border-frame focus-within:border-neon-blue transition-colors duration-300">
              <label 
                className="block font-mono text-[10px] text-steel uppercase tracking-wider font-bold mb-1 select-none" 
                htmlFor="password"
              >
                Password
              </label>
              <div className="flex items-center bg-abyss/40 border-l-2 border-neon-blue/20 focus-within:border-neon-blue px-3 relative">
                <Lock size={16} className="text-steel/50 mr-2 shrink-0" />
                <input 
                  type="password" 
                  id="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••" 
                  required
                  disabled={isAuthenticating}
                  className="w-full bg-transparent border-none text-pure-white font-mono text-sm md:text-base focus:ring-0 placeholder-surface-variant/40 py-3 pl-1 outline-none"
                />
              </div>
              <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-neon-blue transition-all duration-500 group-focus-within/input:w-full" />
            </div>

            {/* Ingestion Submit Button Cut */}
            <div className="pt-4">
              <button 
                type="submit"
                disabled={isAuthenticating || !email || !password}
                className="w-full border-2 border-neon-blue text-neon-blue bg-neon-blue/5 font-mono text-xs font-black uppercase tracking-widest py-4.5 transition-all duration-500 hover:bg-neon-blue hover:text-abyss cursor-pointer flex items-center justify-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(0,136,255,0.1)] hover:shadow-[0_0_30px_rgba(0,136,255,0.4)] button-cut"
              >
                {isAuthenticating ? (
                  <>
                    <RefreshCw size={14} className="animate-spin" strokeWidth={2.5} />
                    DECRUNCHING CREDS...
                  </>
                ) : (
                  "[ ENTER THE SIMULATOR ]"
                )}
              </button>
            </div>

            {/* Secondary Option Anchor Links */}
            <div className="text-center pt-2 select-none">
              <a 
                href="#" 
                className="font-mono text-[10px] text-steel hover:text-pure-white uppercase tracking-widest transition-colors duration-200 font-bold"
              >
                NEW OPERATOR? INITIALIZE REGISTRATION
              </a>
            </div>

          </form>
        </div>

      </main>
    </div>
  );
};

export default Login;