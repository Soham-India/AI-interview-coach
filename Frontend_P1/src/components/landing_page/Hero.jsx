import { SquareTerminal, ChevronsDown } from "lucide-react";
import { Link } from "react-router-dom";
import React from "react";
import FadeInSection from "../ui/FadeInSection";

const Hero = () => {
  return (
    <section className="relative h-screen w-full flex flex-col shrink-0 items-center justify-center overflow-hidden wireframe-grid bg-abyss blueprint-scan snap-start snap-always border-b border-frame">
      <div className="absolute inset-0 z-0  bg-gradient-to-b from-abyss/90 via-transparent to-abyss" />

      <FadeInSection
        className="z-10 flex flex-col items-center justify-center space-y-12 max-w-container-max px-margin-edge w-full text-center  
      "
      >
        <div className="relative w-80 h-80 flex items-center justify-center group ">
          <div className="animate-ai-core  w-56 h-56 border border-neon-blue/40 rounded-none transform rotate-45 backdrop-blur-sm bg-panel/20 flex items-center justify-center ">
            <div className="w-40 h-40 border-2 border-neon-blue/60 transform -rotate-45 flex items-center justify-center">
              <div className="w-16 h-16 bg-neon-blue/20 blur-xl absolute" />
              <SquareTerminal
                size={48}
                className="text-neon-blue"
                strokeWidth={1.5}
              />
            </div>
          </div>

          <div className="absolute inset-0 bg-neon-blue/5 rounded-full blur-[120px] z-[-1]" />

          <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-neon-blue" />
          <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-neon-blue" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-neon-blue" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-neon-blue" />
        </div>
        <div className="space-y-6 text-center">
          <div className="font-metadata text-metadata text-neon-blue tracking-[0.4em] uppercase opacity-60">
            SYSTEM INITIALIZED
          </div>
          <h1 className="font-headline-xl-mobile md:font-headline-xl text-headline-xl-mobile md:text-[72px] uppercase text-pure-white max-w-5xl mx-auto leading-[0.95] tracking-tighter">
            PRACTICE BEFORE THE INTERVIEW THAT{" "}
            <span className="text-neon-blue">MATTERS.</span>
          </h1>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 pt-4">
            <Link
              to="/initialize" // Changed from "/interview"
              className="inline-block border border-neon-blue text-neon-blue font-metadata text-metadata uppercase tracking-widest px-10 py-5 hover:bg-neon-blue hover:text-abyss hover:shadow-[0_0_30px_rgba(0,136,255,0.4)] transition-all duration-500 backdrop-blur-sm relative overflow-hidden group"
            >
              <span className="relative z-10">[ ENTER THE SIMULATOR ]</span>
            </Link>

            {/* <div className="hidden md:block w-32 h-px bg-frame" /> */}

            {/* <div className="font-metadata text-[10px] text-steel uppercase text-left leading-relaxed opacity-50">
              LATENCY: 14MS
              <br />
              MODALITY: ADVERSARIAL
              <br />
              KERNEL: NEURAL_V3
            </div> */}
          </div>
        </div>
      </FadeInSection>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce-smooth opacity-40">
        <span className="font-metadata text-[10px] text-steel tracking-[0.5em] mb-3">
          INITIALIZE
        </span>
        <ChevronsDown size={20} className="text-steel" strokeWidth={2} />
      </div>
    </section>
  );
};

export default Hero;
