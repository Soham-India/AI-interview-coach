import React from "react";
import { Radar } from "lucide-react";
import FadeInSection from "../ui/FadeInSection";

const AnalyzeSection = () => {
  return (
    <section className="flex items-center border-b border-frame relative overflow-hidden bg-abyss wireframe-grid h-screen w-full flex-shrink-0 snap-start snap-always">
      <FadeInSection className="max-w-container-max mx-auto w-full px-margin-edge grid grid-cols-1 md:grid-cols-2 gap-gutter z-10 items-center pt-20 md:pt-0">
        <div className="flex flex-col justify-center space-y-8 pr-0 md:pr-16">
          <div className="flex items-center gap-4 select-none">
            <span className="font-metadata text-metadata text-neon-blue uppercase tracking-[0.3em] font-bold">
              PHASE 01
            </span>
            <div className="h-px flex-grow bg-neon-blue/20" />
          </div>

          <h3 className="font-scene-focus text-5xl md:text-6xl text-pure-white uppercase font-black tracking-tight">
            ANALYZE
          </h3>

          <p className="font-body-lg text-body-lg text-steel max-w-xl leading-relaxed">
            Upload your target role parameters. The system deconstructs the job
            description, historical company interview patterns, and core
            competencies to build a bespoke adversarial model.
          </p>

          <div className="pt-4 border-l-2 border-frame pl-6 italic text-steel/60 font-metadata text-sm tracking-wide">
            "Structural analysis reduces performance anxiety by 64%."
          </div>
        </div>

        <div className="h-[350px] md:h-[550px] xl:h-[614px] border border-frame bg-panel relative overflow-hidden flex items-center justify-center p-8 group">
          <div className="absolute inset-0 wireframe-grid opacity-30 select-none pointer-events-none" />

          <div className="relative w-full h-full border border-frame flex flex-col justify-between p-6 md:p-8 bg-abyss/40">
            <div className="flex justify-between items-start">
              <div className="w-1/2 space-y-2 select-none">
                <div className="h-1 bg-neon-blue/40 w-full" />
                <div className="h-1 bg-neon-blue/20 w-3/4" />
              </div>

              <div className="w-16 h-16 md:w-20 md:h-20 border border-neon-blue/30 rounded-none flex items-center justify-center group-hover:border-neon-blue/80 group-hover:bg-neon-blue/5 transition-all duration-700 transform group-hover:rotate-45">
                <Radar
                  size={28}
                  className="text-steel group-hover:text-neon-blue transition-colors duration-700 transform group-hover:-rotate-45"
                  strokeWidth={1.5}
                />
              </div>
            </div>

            <div className="space-y-6">
              <div className="font-metadata text-[10px] text-neon-blue tracking-[0.25em] uppercase font-bold animate-pulse">
                SCANNING TOPOLOGY...
              </div>
              <div className="space-y-2.5">
                <div className="w-full h-1 bg-frame relative overflow-hidden">
                  <div className="absolute top-0 left-0 h-full w-2/3 bg-neon-blue/60 transition-all duration-1000 ease-out group-hover:w-full" />
                </div>
                <div className="w-full h-1 bg-frame relative overflow-hidden">
                  <div className="absolute top-0 left-0 h-full w-4/5 bg-steel/40 transition-all duration-1000 ease-out delay-100 group-hover:w-1/3" />
                </div>
                <div className="w-full h-1 bg-frame relative overflow-hidden">
                  <div className="absolute top-0 left-0 h-full w-1/2 bg-steel/40 transition-all duration-1000 ease-out delay-200 group-hover:w-3/4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </FadeInSection>
    </section>
  );
};

export default AnalyzeSection;
