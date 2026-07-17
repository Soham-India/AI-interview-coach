import React from "react";
import FadeInSection from "../ui/FadeInSection";

const AssessSection = () => {
  return (
    <section className="flex items-center border-b border-frame relative overflow-hidden bg-abyss wireframe-grid h-screen w-full flex-shrink-0 snap-start snap-always">
      <div className="max-w-container-max mx-auto w-full px-margin-edge grid grid-cols-1 md:grid-cols-2 gap-gutter z-10 items-center">
        <FadeInSection className="flex flex-col justify-center space-y-8 pr-0 md:pr-16">
          <div className="flex items-center gap-4 select-none">
            <span className="font-metadata text-metadata text-neon-blue uppercase tracking-[0.3em] font-bold">
              PHASE 03
            </span>
            <div className="h-px flex-grow bg-neon-blue/20" />
          </div>

          <h3 className="font-scene-focus text-5xl md:text-6xl text-pure-white uppercase font-black tracking-tight">
            ASSESS
          </h3>

          <p className="font-body-lg text-body-lg text-steel max-w-xl leading-relaxed">
            Post-simulation telemetry provides brutal, unvarnished feedback.
            Review your pacing, keyword density, hesitation markers, and overall
            structural integrity of your arguments.
          </p>
        </FadeInSection>

        <div className="h-[380px] md:h-[550px] xl:h-[614px] border border-frame bg-panel relative overflow-hidden flex items-center justify-center p-8 group">
          <div className="relative w-80 h-80 border border-frame/50 rounded-full flex items-center justify-center select-none pointer-events-none">
            <div className="absolute inset-0 border border-steel/10 rounded-full scale-[0.8]" />
            <div className="absolute inset-0 border border-steel/10 rounded-full scale-[0.6]" />
            <div className="absolute inset-0 border border-steel/10 rounded-full scale-[0.4]" />

            <svg
              className="absolute inset-0 w-full h-full text-neon-blue/40 fill-current p-12"
              viewBox="0 0 100 100"
            >
              <polygon
                className="text-neon-blue/40 group-hover:text-neon-blue/60 transition-all duration-1000 ease-in-out"
                points="50,10 90,45 75,90 25,90 10,45"
                stroke="currentColor"
                strokeWidth="0.5"
              />
            </svg>

            <div className="absolute top-[10%] left-[50%] -translate-x-1/2 flex flex-col items-center">
              <div className="w-2 h-2 bg-neon-blue rounded-full shadow-[0_0_15px_rgba(0,136,255,1)]" />
              <span className="font-metadata text-[8px] text-neon-blue mt-1 font-bold tracking-wider">
                LOGIC
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AssessSection;
