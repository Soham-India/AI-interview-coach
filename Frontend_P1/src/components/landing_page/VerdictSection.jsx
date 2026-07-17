import React from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import FadeInSection from "../ui/FadeInSection";
import StarsBg from "../ui/elements/StarsBg";

const VerdictSection = () => {
  return (
    <section
      id="simulator"
      className="flex items-center justify-center bg-abyss relative overflow-hidden h-screen w-full flex-shrink-0 snap-start snap-always"
    >
      {/* Immersive radial blue focal blast */}
      <div className="absolute inset-0 hero-radial-gradient z-0 pointer-events-none select-none" />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon-blue/10 blur-[160px] rounded-full z-0 animate-pulse pointer-events-none select-none" />

      <StarsBg className="absolute inset-0 z-0 pointer-events-none select-none" />

      {/* Main content layer wrapped with your active visibility observer */}
      <FadeInSection className="z-10 px-margin-edge text-center max-w-container-max w-full flex flex-col items-center space-y-12">
        <h2 className="font-black text-5xl sm:text-6xl md:text-8xl lg:text-[120px] text-pure-white uppercase tracking-tighter leading-[0.85] break-words w-full drop-shadow-[0_0_15px_rgba(255,255,255,0.15)]">
          RECEIVE THE
          <br />
          VERDICT
        </h2>

        {/* High-Contrast Interactive Simulator Trigger */}

        <Link
          to="/initialize"
          className="bg-pure-white text-abyss font-scene-focus text-lg sm:text-2xl md:text-3xl uppercase px-8 py-6 sm:px-16 sm:py-10 border-2 border-pure-white hover:bg-transparent hover:text-pure-white transition-all duration-500 w-full md:w-auto text-center flex items-center justify-center gap-4 sm:gap-6 group relative overflow-hidden button-cut cursor-pointer"
        >
          <span className="relative z-10 font-black tracking-wide">
            [ ENTER THE SIMULATOR ]
          </span>
          <ArrowRight
            size={24}
            className="group-hover:translate-x-3 transition-transform duration-500 relative z-10 text-current sm:w-9 sm:h-9"
            strokeWidth={2}
          />
        </Link>
      </FadeInSection>
    </section>
  );
};

export default VerdictSection;
