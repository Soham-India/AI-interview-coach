import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Lock,
  Zap,
  ArrowLeft,
  RefreshCw,
  Terminal,
} from "lucide-react";

const RegistrationPortal = () => {
  const navigate = useNavigate();

  // Controlled input states
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  const handleRegistrationSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("KEY_MISMATCH: PASSWORDS DO NOT MATCH");
      return;
    }

    setIsRegistering(true);

    // Simulate mainframe directory injection protocol loop
    setTimeout(() => {
      setIsRegistering(false);
      navigate("/initialize");
    }, 2000);
  };

  return (
    <div className="w-full h-screen bg-abyss text-pure-white overflow-hidden relative selection:bg-neon-blue selection:text-abyss">
      {/* BACKGROUND WIREFRAME GRID LAYER */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 wireframe-grid opacity-20 pointer-events-none" />
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-neon-blue/5 to-transparent pointer-events-none" />
      </div>

      {/* FIXED TOP NAVIGATION BAR */}
      <header className="fixed top-0 w-full flex justify-between items-center px-margin-edge h-20 z-50 bg-abyss border-b border-frame select-none">
        <div className="font-mono text-xs font-black text-on-surface uppercase tracking-tighter">
          INTERVIEW AI
        </div>
        <nav className="flex space-x-unit items-center">
          <button
            onClick={() => navigate("/login")}
            className="font-mono text-xs uppercase tracking-widest text-pure-white px-4 py-2 hover:text-neon-blue transition-colors duration-300 cursor-pointer"
          >
            LOGIN
          </button>
        </nav>
      </header>

      {/* SIDE TELEMETRY SUBTEXT PANELS (LEFT) */}
      <aside className="fixed left-8 top-1/2 -translate-y-1/2 z-10 hidden xl:flex flex-col items-center space-y-12 opacity-40 select-none pointer-events-none">
        <div className="[writing-mode:vertical-rl] rotate-180 font-mono text-[10px] tracking-[0.4em] text-steel uppercase animate-pulse">
          NEW_OPERATOR_DETECTED // SYSTEM_ID: NULL
        </div>
        <div className="w-px h-24 bg-frame" />
        <div className="[writing-mode:vertical-rl] rotate-180 font-mono text-[10px] tracking-[0.4em] text-neon-blue uppercase font-bold">
          ENCRYPTION: AES-256
        </div>
      </aside>

      {/* SIDE TELEMETRY SUBTEXT PANELS (RIGHT) */}
      <aside className="fixed right-8 top-1/2 -translate-y-1/2 z-10 hidden xl:flex flex-col items-center space-y-12 opacity-40 select-none pointer-events-none">
        <div className="[writing-mode:vertical-rl] font-mono text-[10px] tracking-[0.4em] text-steel uppercase font-bold">
          LATENCY: 14MS
        </div>
        <div className="w-px h-24 bg-frame" />
        <div className="[writing-mode:vertical-rl] font-mono text-[10px] tracking-[0.4em] text-steel uppercase animate-pulse">
          STATUS: WAITING_FOR_INPUT
        </div>
      </aside>

      {/* MAIN REGISTRATION PORTAL MOUNT */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen pt-20 px-4">
        <div className="w-full max-w-xl">
          {/* CENTRAL BRUTALIST GRID MODULE */}
          <div className="bg-panel/90 border border-neon-blue/40 shadow-[0_0_40px_rgba(0,136,255,0.15)] p-10 relative backdrop-blur-md">
            {/* Structural High-Tech Framing Corners */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-neon-blue -translate-x-0.5 -translate-y-0.5" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-neon-blue translate-x-0.5 -translate-y-0.5" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-neon-blue -translate-x-0.5 translate-y-0.5" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-neon-blue translate-x-0.5 translate-y-0.5" />

            {/* Ingestion Panel Headers */}
            <div className="mb-8 text-center select-none">
              <h1 className="font-mono text-2xl md:text-3xl font-black text-pure-white uppercase tracking-tight mb-1 flex items-center justify-center gap-2">
                <Terminal size={18} className="text-neon-blue animate-pulse" />{" "}
                Initialize Protocol
              </h1>
              <p className="font-mono text-[10px] text-steel uppercase tracking-widest font-bold">
                Operator Credential Assignment
              </p>
            </div>

            {/* ACTIONS CONFIGURATION SUBMISSION */}
            <form onSubmit={handleRegistrationSubmit} className="space-y-6">
              {/* Field 01: Full Name */}
              <div className="space-y-1.5 group/field">
                <label className="block font-mono text-[9px] text-neon-blue uppercase tracking-widest opacity-80 group-focus-within/field:opacity-100 font-bold select-none">
                  01 // FULL NAME (Operator ID)
                </label>
                <div className="relative border-b border-frame focus-within:border-neon-blue transition-colors duration-300 flex items-center bg-abyss/30 px-2">
                  <User size={14} className="text-steel/40 mr-2.5 shrink-0" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="ENTER LEGAL NAME"
                    disabled={isRegistering}
                    className="w-full bg-transparent border-none focus:ring-0 text-pure-white font-mono text-xs md:text-sm py-3 px-0 placeholder:text-steel/40 tracking-[0.15em] outline-none uppercase"
                  />
                  <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-neon-blue transition-all duration-500 group-focus-within/field:w-full" />
                </div>
              </div>

              {/* Field 02: Email Address */}
              <div className="space-y-1.5 group/field">
                <label className="block font-mono text-[9px] text-neon-blue uppercase tracking-widest opacity-80 group-focus-within/field:opacity-100 font-bold select-none">
                  02 // EMAIL ADDRESS (Channel Link)
                </label>
                <div className="relative border-b border-frame focus-within:border-neon-blue transition-colors duration-300 flex items-center bg-abyss/30 px-2">
                  <Mail size={14} className="text-steel/40 mr-2.5 shrink-0" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="SECURE_CHANNEL@GATEWAY.AI"
                    disabled={isRegistering}
                    className="w-full bg-transparent border-none focus:ring-0 text-pure-white font-mono text-xs md:text-sm py-3 px-0 placeholder:text-steel/40 tracking-[0.15em] outline-none uppercase"
                  />
                  <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-neon-blue transition-all duration-500 group-focus-within/field:w-full" />
                </div>
              </div>

              {/* Field 03: Password */}
              <div className="space-y-1.5 group/field">
                <label className="block font-mono text-[9px] text-neon-blue uppercase tracking-widest opacity-80 group-focus-within/field:opacity-100 font-bold select-none">
                  03 // PASSWORD (Encryption Key)
                </label>
                <div className="relative border-b border-frame focus-within:border-neon-blue transition-colors duration-300 flex items-center bg-abyss/30 px-2">
                  <Lock size={14} className="text-steel/40 mr-2.5 shrink-0" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    disabled={isRegistering}
                    className="w-full bg-transparent border-none focus:ring-0 text-pure-white font-mono text-xs md:text-sm py-3 px-0 placeholder:text-steel/40 tracking-[0.15em] outline-none"
                  />
                  <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-neon-blue transition-all duration-500 group-focus-within/field:w-full" />
                </div>
              </div>

              {/* Field 04: Confirm Password */}
              <div className="space-y-1.5 group/field">
                <label className="block font-mono text-[9px] text-neon-blue uppercase tracking-widest opacity-80 group-focus-within/field:opacity-100 font-bold select-none">
                  04 // CONFIRM PASSWORD
                </label>
                <div className="relative border-b border-frame focus-within:border-neon-blue transition-colors duration-300 flex items-center bg-abyss/30 px-2">
                  <Lock size={14} className="text-steel/40 mr-2.5 shrink-0" />
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="RE-ENTER KEY"
                    disabled={isRegistering}
                    className="w-full bg-transparent border-none focus:ring-0 text-pure-white font-mono text-xs md:text-sm py-3 px-0 placeholder:text-steel/40 tracking-[0.15em] outline-none"
                  />
                  <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-neon-blue transition-all duration-500 group-focus-within/field:w-full" />
                </div>
              </div>

              {/* Execution Triggers */}
              <div className="pt-6 space-y-4">
                <button
                  type="submit"
                  disabled={
                    isRegistering ||
                    !fullName ||
                    !email ||
                    !password ||
                    !confirmPassword
                  }
                  className="w-full h-15 border border-neon-blue bg-neon-blue/5 group/btn relative overflow-hidden transition-all duration-500 hover:shadow-[0_0_30px_rgba(0,136,255,0.25)] button-cut cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <div className="absolute inset-0 bg-neon-blue/10 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500" />
                  <span className="relative z-10 font-mono text-xs font-black text-pure-white uppercase tracking-[0.25em] flex items-center justify-center gap-2">
                    {isRegistering ? (
                      <>
                        <RefreshCw
                          size={14}
                          className="animate-spin"
                          strokeWidth={2.5}
                        />
                        ALLOCATING MAIN_DIR...
                      </>
                    ) : (
                      <>
                        INITIATE ACCOUNT PROTOCOL
                        <Zap
                          size={14}
                          className="group-hover/btn:scale-110 transition-transform"
                        />
                      </>
                    )}
                  </span>
                </button>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => navigate("/login")}
                    className="font-mono text-[10px] text-steel hover:text-pure-white uppercase tracking-[0.2em] transition-colors duration-300 inline-flex items-center group/back cursor-pointer bg-transparent border-none outline-none"
                  >
                    <ArrowLeft
                      size={12}
                      className="mr-2 group-hover/back:-translate-x-1 transition-transform"
                    />
                    ACCESS EXISTING TERMINAL
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Footer Metadata Diagnostics */}
          <div className="mt-6 flex flex-col sm:flex-row justify-between items-center px-2 opacity-30 font-mono text-[8px] uppercase tracking-widest text-steel/80 gap-2 sm:gap-0 select-none pointer-events-none font-bold">
            <span>SYSTEM_STATUS: NOMINAL</span>
            <span>DATA_LOCALIZATION: REGION_01</span>
            <span>© 2026 INTERVIEW_AI_SYSTEMS</span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RegistrationPortal;
