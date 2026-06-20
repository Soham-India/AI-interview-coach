import React from "react";
import { Database, Activity } from "lucide-react";
import Navbar from "../components/navbar/Navbar";
import FadeInSection from "../components/ui/FadeInSection";
import VaultNode from "../components/archive/ArchiveTimelineNode";

import { useSelector, useDispatch } from "react-redux";

import {
  updateVaultSearchQuery,
  selectFilteredVaultLogs,
} from "../redux/features/archiveSlice";

const ArchiveVault = () => {
  const dispatch = useDispatch();

  const searchQuery = useSelector((state) => state.archive.searchQuery);

  const filteredLogs = useSelector(selectFilteredVaultLogs);

  return (
    <div className="app-shell">
      {/* ATMOSPHERIC PARALLAX LAYOUT BACKGROUND COMPONENTS */}
      <div className="absolute inset-0 perspective-grid opacity-25 pointer-events-none z-0" />

      {/* Moving tactical matrix scanline simulation filter overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neon-blue/[0.02] to-transparent animate-[pulse_4s_ease-in-out_infinite] pointer-events-none z-0" />

      {/* FIXED PERIPHERAL HEADS-UP GRAPHICS */}
      <div className="absolute top-24 left-margin-edge z-40 hidden lg:block select-none pointer-events-none">
        <div className="font-mono text-[10px] text-neon-blue border-l-2 border-neon-blue pl-3 py-0.5 bg-neon-blue/5 font-bold tracking-wider">
          VAULT_SYNC_STABLE // 0.0042MS
        </div>
      </div>

      <div className="absolute top-24 right-margin-edge z-40 hidden lg:block text-right select-none pointer-events-none">
        <div className="font-mono text-[10px] text-steel font-bold tracking-wider space-y-0.5">
          <div>SECTOR_07_ALPHA</div>
          <div className="text-[8px] text-frame font-bold tracking-normal">
            COORDINATES: 40.7128° N, 74.0060° W
          </div>
        </div>
      </div>

      <Navbar isSimulation={false} />

      <main className="h-[calc(100vh-4.5rem)] w-full overflow-y-auto mt-18 relative z-10 custom-scrollbar pb-32">
        <div className="max-w-[1200px] mx-auto px-margin-edge pt-12 space-y-16">
          {/* SEARCH */}
          <FadeInSection className="w-full">
            <div className="w-full border border-frame bg-panel/40 p-6 relative group focus-within:border-neon-blue/40 transition-colors duration-300">
              <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-frame group-focus-within:border-neon-blue transition-colors" />

              <div className="mb-4 select-none flex items-center gap-2 font-mono text-[10px] text-steel uppercase tracking-widest font-bold">
                <Database size={12} className="text-neon-blue" />
                Interrogate Local Simulation Repositories
              </div>

              <form
                onSubmit={(e) => e.preventDefault()}
                className="flex items-center gap-4 h-12 w-full"
              >
                <div className="flex-1 h-full relative border-b border-frame focus-within:border-neon-blue transition-colors flex items-center bg-abyss/40 px-3">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) =>
                      dispatch(updateVaultSearchQuery(e.target.value))
                    }
                    placeholder="QUERY VIA ROLE, TARGET OR REFERENCING TOKEN..."
                    className="w-full h-full bg-transparent border-none text-pure-white font-mono text-xs md:text-sm focus:ring-0 placeholder-steel/30 uppercase tracking-wider outline-none"
                  />

                  <div className="absolute bottom-0 left-0 h-[1.5px] w-0 bg-neon-blue transition-all duration-500 group-focus-within:w-full" />
                </div>

                <button
                  type="button"
                  className="h-full px-8 bg-neon-blue text-abyss font-mono text-xs font-black tracking-widest uppercase hover:bg-pure-white hover:text-ink transition-all duration-300 button-cut flex items-center gap-2 shadow-[0_0_20px_rgba(0,136,255,0.2)]"
                >
                  <Activity size={14} strokeWidth={2.5} />
                  SEARCH
                </button>
              </form>
            </div>
          </FadeInSection>

          {/* TIMELINE */}
          <FadeInSection className="w-full relative [perspective:1200px] [perspective-origin:center]">
            <div className="absolute left-[21px] md:left-[37px] top-2 bottom-2 w-px bg-frame/60 z-0 pointer-events-none select-none" />

            <div className="w-full space-y-12 [transform-style:preserve-3d] pb-24 relative z-10">
              {filteredLogs.length > 0 ? (
                filteredLogs.map((log) => (
                  <VaultNode key={log.id} log={log} />
                ))
              ) : (
                <div className="text-center p-16 border border-dashed border-frame bg-panel/20 font-mono text-xs text-steel/50 uppercase select-none font-bold ml-12 md:ml-24">
                  // NO SIMULATION CYCLES RECORDED WITHIN INDEX QUERY
                </div>
              )}
            </div>

            <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-abyss via-abyss/80 to-transparent z-20 pointer-events-none select-none" />
          </FadeInSection>
        </div>
      </main>
    </div>
  );
};

export default ArchiveVault;