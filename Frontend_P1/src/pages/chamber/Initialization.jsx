import React, { useState } from "react";
import { Play, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
// import Navbar from "../components/navbar/Navbar";
import ParticleBackground from "../../components/ui/elements/ParticleBackground";
import { useDispatch } from "react-redux";
import { setInterviewConfig } from "../../redux/features/interviewSlice";

const InitializePortal = () => {
  const navigate = useNavigate();
  const [jobTitle, setJobTitle] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [isCommencing, setIsCommencing] = useState(false);
  const dispatch = useDispatch();

  // Note: All the particle useState and useEffect logic is completely gone!

  const jdLength = jobDesc.length;
  const isReady = jdLength > 10 && jobTitle.trim().length > 2;
  const dynamicGlowSize = Math.min(100 + jdLength / 5, 200);

  const handleCommence = () => {
    setIsCommencing(true);

    dispatch(setInterviewConfig({ jobTitle, jobDesc }));

    setTimeout(() => {
      navigate("/interview");
    }, 800);
  };

  return (
    <div
      className={`relative w-full h-screen bg-abyss text-pure-white overflow-hidden transition-colors duration-500 flex flex-col ${isCommencing ? "bg-pure-white" : ""}`}
    >
      {/* Drop in your reusable background! */}
      <ParticleBackground count={120} />

      <main className="relative flex-1 flex flex-col items-center justify-center w-full mt-18 z-10">
        {/* Central Concentration Core */}
        <div
          className={`relative flex flex-col items-center justify-center p-16 rounded-full border border-neon-blue/20 backdrop-blur-md transition-all duration-700 ease-[cubic-bezier(0.85,0,0.15,1)] group ${isCommencing ? "scale-75 opacity-0" : "scale-100 opacity-100"}`}
          style={{
            width: "clamp(300px, 85vh, 700px)",
            height: "clamp(300px, 85vh, 700px)",
            background:
              "radial-gradient(circle, rgba(10, 18, 31, 0.8) 0%, rgba(5, 11, 20, 0.95) 70%)",
            boxShadow: `0 0 ${dynamicGlowSize}px -20px rgba(0, 136, 255, 0.3), inset 0 0 60px rgba(0, 136, 255, 0.05)`,
          }}
        >
          {/* Decorative Orbits */}
          <div className="absolute top-1/2 left-1/2 w-[110%] h-[110%] rounded-full border border-dashed border-steel/10 pointer-events-none animate-[spin-orbit_60s_linear_infinite]" />
          <div className="absolute top-1/2 left-1/2 w-[125%] h-[125%] rounded-full border border-dashed border-steel/10 pointer-events-none animate-[spin-orbit_90s_linear_infinite_reverse]" />

          {/* Phase Indicator */}
          <div className="absolute -top-12 text-center w-full">
            <div className="font-metadata text-neon-blue tracking-[0.6em] uppercase text-[10px] mb-2 drop-shadow-[0_0_10px_rgba(0,136,255,0.5)]">
              NEURAL_INITIALIZE
            </div>
            <div className="h-px w-24 bg-neon-blue/30 mx-auto" />
          </div>

          {/* Job Title Input */}
          <div className="w-full mb-8 relative z-10 pt-10">
            <input
              type="text"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              placeholder="[ DESIGNATE TARGET ROLE ]"
              className="w-full bg-transparent pb-4 border-none text-center text-2xl md:text-3xl font-black uppercase tracking-tighter text-pure-white outline-none focus:ring-0 placeholder-pure-white/30 transition-all duration-300 focus:drop-shadow-[0_0_15px_rgba(0,136,255,0.5)]"
            />
            <div className="h-px w-0 group-focus-within:w-full bg-gradient-to-r from-transparent via-neon-blue to-transparent transition-all duration-700 mx-auto mt-2" />
          </div>

          {/* Description Textarea */}
          <div className="flex-1 w-full flex items-center justify-center relative z-10">
            <textarea
              value={jobDesc}
              onChange={(e) => setJobDesc(e.target.value)}
              placeholder="PASTE JOB PROTOCOL STREAM..."
              className="w-full h-full bg-transparent border-none text-center text-lg md:text-xl font-medium text-steel/80 outline-none focus:ring-0 placeholder-steel/30 resize-none brutalist-scroll leading-relaxed overflow-y-auto pt-4"
            />
          </div>

          {/* Telemetry Overlays */}
          <div className="absolute top-1/2 -left-16 -translate-y-1/2 rotate-90 pointer-events-none opacity-20">
            <span className="font-metadata text-[9px] tracking-widest text-neon-blue uppercase">
              SYSLOAD_ACTIVE
            </span>
          </div>
          <div className="absolute top-1/2 -right-16 -translate-y-1/2 -rotate-90 pointer-events-none opacity-20">
            <span className="font-metadata text-[9px] tracking-widest text-neon-blue uppercase">
              {jdLength} BYTES
            </span>
          </div>

          {/* The Expanding YOLO Button */}
          <button
            onClick={handleCommence}
            disabled={!isReady || isCommencing}
            className={`
              absolute -bottom-7 left-1/2 -translate-x-1/2
              h-16 rounded-full
              flex items-center justify-center
              overflow-hidden group/btn
              font-metadata tracking-[0.2em] font-bold
              transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
              ${
                !isReady || isCommencing
                  ? "w-16 border-2 border-frame bg-panel/50 text-steel cursor-not-allowed"
                  : "w-16 hover:w-56 border-2 border-neon-blue bg-abyss/80 backdrop-blur-lg text-pure-white cursor-pointer hover:bg-neon-blue hover:shadow-[0_0_40px_rgba(0,136,255,0.6)]"
              }
            `}
          >
            {isCommencing ? (
              <Loader2
                size={24}
                className="animate-spin text-pure-white"
                strokeWidth={3}
              />
            ) : (
              /* Added w-full h-full to the wrapper so it centers perfectly */
              <div className="flex items-center justify-center relative w-full h-full">
                {/* Play icon now fades out (opacity-0) and scales down slightly on hover */}
                <Play
                  size={20}
                  className="fill-current shrink-0 transition-all duration-500 group-hover/btn:opacity-0 group-hover/btn:scale-50"
                />

                {isReady && (
                  <span
                    className="
                      absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                      whitespace-nowrap
                      opacity-0
                      scale-90
                      transition-all duration-500
                      group-hover/btn:opacity-100
                      group-hover/btn:scale-100
                    "
                  >
                    COMMENCE
                  </span>
                )}
              </div>
            )}
          </button>
        </div>

        {/* Atmospheric Status Footer */}
        {/* <div className="fixed bottom-8 left-1/2 -translate-x-1/2 text-center pointer-events-none">
          <div className="font-metadata text-[10px] text-steel/30 uppercase tracking-[1em]">
            Portal_Stable // Ready_to_initiate
          </div>
        </div> */}
      </main>
    </div>
  );
};

export default InitializePortal;
