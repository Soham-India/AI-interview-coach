import React from "react";
import { Mic, Video, Keyboard } from "lucide-react";
import FadeInSection from "../ui/FadeInSection";

const SimulateSection = () => {
  return (
    <section className="flex items-center border-b border-frame relative overflow-hidden bg-abyss wireframe-grid h-screen w-full flex-shrink-0 snap-start snap-always">
      <div className="max-w-container-max mx-auto w-full px-margin-edge grid grid-cols-1 md:grid-cols-2 gap-gutter z-10 items-center pt-20 md:pt-0">
        <div className="order-2 md:order-1 h-[380px] md:h-[550px] xl:h-[614px] border border-frame bg-panel relative overflow-hidden flex items-center justify-center group">
          <div className="absolute inset-0 bg-gradient-to-tr from-panel via-panel to-frame opacity-50 pointer-events-none select-none" />

          <div className="flex items-center gap-1.5 z-10 h-40">
            <div className="w-2 bg-neon-blue animate-bar-wave [animation-duration:0.9s]" />
            <div className="w-2 bg-neon-blue animate-bar-wave [animation-duration:0.6s] [animation-delay:0.15s]" />
            <div className="w-2 bg-neon-blue animate-bar-wave [animation-duration:0.5s] [animation-delay:0.05s]" />
            <div className="w-2 bg-neon-blue animate-bar-wave [animation-duration:0.6s] [animation-delay:0.15s]" />
            <div className="w-2 bg-neon-blue animate-bar-wave [animation-duration:0.9s] [animation-delay:0.1s]" />
          </div>

          <div className="absolute top-8 left-8 flex items-center gap-2 select-none">
            <div className="w-2 h-2 bg-danger rounded-full animate-pulse" />
            <span className="font-metadata text-[10px] text-steel tracking-widest uppercase font-bold">
              REC ACTIVE
            </span>
          </div>

          <div className="absolute bottom-8 left-8 font-metadata text-metadata text-neon-blue tracking-widest font-bold opacity-60">
            AUDIO STREAM ANALYTICS V.04
          </div>
        </div>

        <FadeInSection className="order-1 md:order-2 flex flex-col justify-center space-y-8 pl-0 md:pl-16">
          <div className="flex items-center gap-4 select-none">
            <span className="font-metadata text-metadata text-neon-blue uppercase tracking-[0.3em] font-bold">
              PHASE 02
            </span>
            <div className="h-px flex-grow bg-neon-blue/20" />
          </div>

          <h3 className="font-scene-focus text-5xl md:text-6xl text-pure-white uppercase font-black tracking-tight">
            SIMULATE
          </h3>

          <p className="font-body-lg text-body-lg text-steel max-w-xl leading-relaxed">
            Engage in real-time text or vocal (future updates) combat. The
            engine dynamically adapts to your responses, probing weaknesses and
            enforcing rigid time constraints to induce authentic cognitive load.
          </p>

          <div className="flex gap-4">
            <div className="p-3 border border-frame bg-abyss/50 hover:border-neon-blue/60 hover:bg-panel/40 transition-colors duration-300 cursor-pointer text-neon-blue">
              <Mic size={20} strokeWidth={1.75} />
            </div>
            <div className="p-3 border border-frame bg-abyss/50 hover:border-neon-blue/60 hover:bg-panel/40 transition-colors duration-300 cursor-pointer text-neon-blue">
              <Video size={20} strokeWidth={1.75} />
            </div>
            <div className="p-3 border border-frame bg-abyss/50 hover:border-neon-blue/60 hover:bg-panel/40 transition-colors duration-300 cursor-pointer text-neon-blue">
              <Keyboard size={20} strokeWidth={1.75} />
            </div>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
};

export default SimulateSection;
