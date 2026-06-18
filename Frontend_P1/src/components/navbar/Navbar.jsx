import React from "react";
import { LogIn, Menu } from "lucide-react";
import { openMenu } from "../../redux/features/drawerSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { selectOperatorIdentity } from "../../redux/features/profileSlice";

const Navbar = ({
  isSimulation = false,
  timeString = "00:00:00",
  progressPercent = 0,
  isLoggedIn = true, 
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const operator = useSelector(selectOperatorIdentity);

  return (
    <header
      id="main-header"
      className="fixed top-0 left-0 w-full bg-abyss flex justify-between items-center px-margin-edge h-18 z-50 border-b border-frame transition-all duration-300 select-none"
    >
      {/* Dynamic Branding vs Telemetry Left Track */}
      {!isSimulation ? (
        <div className="font-scene-focus text-[24px] font-extrabold uppercase tracking-tighter text-icy-blue leading-none">
          <Link to="/" className="hover:opacity-90 transition-opacity">
            INTERVIEW{" "}
            <span className="text-inverse-primary drop-shadow-[0_0_12px_rgba(0,136,255,0.65)]">
              AI
            </span>{" "}
          </Link>
        </div>
      ) : (
        <div className="flex flex-col">
          <span className="text-steel font-mono text-[9px] uppercase tracking-wider font-bold opacity-60">
            Elapsed Time
          </span>
          <span className="text-pure-white font-mono text-sm md:text-base font-black tracking-widest leading-tight">
            {timeString}
          </span>
        </div>
      )}

      {/* Center Progress Bar Segment - Only renders during an active simulation run */}
      {isSimulation && (
        <div className="flex-1 max-w-xl px-12 hidden md:block">
          <div className="h-[2px] w-full bg-frame relative rounded-full">
            <div
              className="absolute top-0 left-0 h-full bg-neon-blue transition-all duration-300 shadow-[0_0_8px_#0088FF]"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex justify-between mt-1.5 font-mono text-[9px] uppercase tracking-widest font-bold">
            <span className="text-steel">Chamber Progression</span>
            <span className="text-neon-blue">{progressPercent}%</span>
          </div>
        </div>
      )}

      {/* Right Control Actions Trigger (Brutalist Angular Poly-Clip-Path) */}
      <div
        className="flex items-stretch h-10 overflow-hidden"
        style={{
          clipPath:
            "polygon(10% 0px, 100% 0px, 100% 90%, 90% 100%, 0px 100%, 0px 10%)",
        }}
      >
        {isLoggedIn ? (
          /* AUTHENTICATED PROFILE LINK TRIGGER BUTTON */
          <button
            onClick={() => navigate("/profile")}
            className="bg-[#0F1422] hover:bg-[#232A3A] text-pure-white px-5 flex items-center gap-3.5 transition-colors duration-300 border-r border-frame font-mono text-xs font-bold uppercase tracking-widest cursor-pointer"
          >
            <img
              alt={operator.name}
              src={operator.avatarUrl}
              className="w-4 h-4 rounded-full object-cover grayscale group-hover:grayscale-0 border border-neon-blue/20 shrink-0"
            />
            <span>{operator.callsign}</span>
            
          </button>
        ) : (
          /* PUBLIC/UNAUTHENTICATED ACCOUNT ACCESS BUTTON */
          <button
            onClick={() => navigate("/login")}
            className="bg-[#0A121F] hover:bg-surface-container-highest text-pure-white px-5 flex items-center gap-2 transition-colors duration-300 border-r border-frame font-mono text-xs font-bold uppercase tracking-widest cursor-pointer"
          >
            <LogIn size={13} strokeWidth={2.5} />
            <span>LOGIN</span>
          </button>
        )}

        {/* GLOBAL PERSISTENT SIDE DRAWER SWITCH TRIGGER BUTTON */}
        <button
          id="open-menu"
          onClick={() => dispatch(openMenu())}
          className="bg-icy-blue hover:bg-pure-white text-ink px-5 flex items-center gap-2 transition-colors duration-300 font-mono text-xs font-black uppercase tracking-widest cursor-pointer"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
          >
            <line x1="4" x2="20" y1="12" y2="12"></line>
            <line x1="4" x2="20" y1="6" y2="6"></line>
            <line x1="4" x2="20" y1="18" y2="18"></line>
          </svg>
          <span>MENU</span>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
