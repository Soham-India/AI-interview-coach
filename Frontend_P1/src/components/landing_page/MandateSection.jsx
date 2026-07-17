import React from "react";
import FadeInSection from "../ui/FadeInSection";

const MandateSection = () => {
  return (
    <section className="relative h-screen w-full flex flex-col shrink-0 items-center justify-center overflow-hidden bg-abyss snap-start snap-always border-b border-frame wireframe-grid ">
      <div className="absolute inset-0 hero-radial-blue z-0" />
      <FadeInSection className="z-10 px-margin-edge text-center w-full max-w-container-max">
        <h2 className="font-black text-5xl sm:text-6xl md:text-8xl lg:text-[120px] text-pure-white break-words leading-[0.85] tracking-tighter uppercase selection:bg-pure-white selection:text-ink">
          {" "}
          MASTER THE <br />
          INTERVIEW.
        </h2>

        <div className="mt-16 flex items-center justify-center gap-4 select-none">
          <div className="h-px w-24 bg-neon-blue/30" />
          <div className="w-2 h-2 bg-neon-blue rotate-45 animate-pulse" />
          <div className="h-px w-24 bg-neon-blue/30" />
        </div>
      </FadeInSection>
    </section>
  );
};

export default MandateSection;
