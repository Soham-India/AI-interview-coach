import React, { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, Check, X } from "lucide-react";
import { AVATAR_OPTIONS } from "../../config/avatars";

const AvatarSelectScreen = ({ onConfirm, onCancel, initialAvatar = null, isSaving = false }) => {
    const [selectedIndex, setSelectedIndex] = useState(() => {
        if (initialAvatar) {
            const idx = AVATAR_OPTIONS.findIndex(a => a.url === initialAvatar);
            return idx >= 0 ? idx : AVATAR_OPTIONS.findIndex(a => a.id === "bee");
        }
        return AVATAR_OPTIONS.findIndex(a => a.id === "bee");
    });

    const containerRef = useRef(null);
    const isFirstRender = useRef(true);

    // Master Layout Centering Core
    useEffect(() => {
        const container = containerRef.current;
        if (container && container.children[selectedIndex]) {
            container.children[selectedIndex].scrollIntoView({
                behavior: isFirstRender.current ? "auto" : "smooth",
                block: "nearest",
                inline: "center",
            });
            
            if (isFirstRender.current) {
                isFirstRender.current = false;
            }
        }
    }, [selectedIndex]);

    const scrollLeft = () => {
        setSelectedIndex((prev) => Math.max(0, prev - 1));
    };

    const scrollRight = () => {
        setSelectedIndex((prev) => Math.min(AVATAR_OPTIONS.length - 1, prev + 1));
    };

    const handleConfirm = () => {
        if (AVATAR_OPTIONS[selectedIndex]) {
            onConfirm(AVATAR_OPTIONS[selectedIndex].url);
        }
    };

    return (
        /* Elevated to z-[9999] with solid fallback hex color code to block the dashboard footer */
        <div className="fixed inset-0 z-[9999] bg-[#050b14] flex flex-col items-center justify-between py-4 md:py-8 overflow-hidden select-none">

            {/* Background grid */}
            <div className="absolute inset-0 wireframe-grid opacity-10 pointer-events-none z-0" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,136,255,0.08)_0%,transparent_70%)] pointer-events-none z-0" />

            {/* Corner telemetry track */}
            <div className="absolute top-6 left-8 font-mono text-[9px] text-steel/40 uppercase tracking-widest space-y-1 pointer-events-none hidden lg:block z-10">
                <div>SECURE_LINE: ACTIVE</div>
                <div>ENCRYPTION: AES_256</div>
                <div>STATUS: SYNCED</div>
            </div>
            <div className="absolute top-6 right-8 font-mono text-[9px] text-steel/40 uppercase tracking-widest text-right space-y-1 pointer-events-none hidden lg:block z-10">
                <div>IDENTITY_INIT: PENDING</div>
                <div>AVATAR_LOCK: REQUIRED</div>
            </div>

            {/* Escape Close Action Button */}
            {onCancel && (
                <button
                    type="button"
                    onClick={onCancel}
                    className="absolute top-4 right-4 md:top-6 md:right-6 z-[310] text-steel hover:text-pure-white transition-colors cursor-pointer p-2"
                    disabled={isSaving}
                >
                    <X size={20} />
                </button>
            )}

            {/* HEADER COMPONENT */}
            <div className="text-center select-none px-4 mt-2 md:mt-0 z-10 shrink-0">
                <p className="font-mono text-[9px] text-neon-blue uppercase tracking-[0.4em] mb-1 font-bold">
                    OPERATOR_IDENTITY // STEP 2 OF 2
                </p>
                <h1 className="font-mono text-xl md:text-3xl font-black text-pure-white uppercase tracking-tighter">
                    SELECT YOUR <span className="text-neon-blue">AVATAR</span>
                </h1>
                <p className="font-mono text-[9px] md:text-10px text-steel/50 uppercase tracking-widest mt-1">
                    // THIS WILL REPRESENT YOUR OPERATOR PROFILE
                </p>
            </div>

            {/* CAROUSEL GRAPHIC RENDER TRACK */}
            <div className="w-full max-w-6xl relative my-auto z-10 shrink-0">
                {/* Edge fade gradient shields */}
                <div className="absolute left-0 top-0 h-full w-24 md:w-40 bg-gradient-to-r from-[#050b14] via-[#050b14]/70 to-transparent z-20 pointer-events-none" />
                <div className="absolute right-0 top-0 h-full w-24 md:w-40 bg-gradient-to-l from-[#050b14] via-[#050b14]/70 to-transparent z-20 pointer-events-none" />

                {/* Navigation Controls */}
                <button
                    type="button"
                    onClick={scrollLeft}
                    disabled={selectedIndex === 0}
                    className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 flex items-center justify-center bg-panel border border-frame text-steel hover:text-pure-white hover:border-neon-blue/40 transition-all duration-300 cursor-pointer disabled:opacity-10"
                >
                    <ChevronLeft size={18} />
                </button>

                <button
                    type="button"
                    onClick={scrollRight}
                    disabled={selectedIndex === AVATAR_OPTIONS.length - 1}
                    className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 flex items-center justify-center bg-panel border border-frame text-steel hover:text-pure-white hover:border-neon-blue/40 transition-all duration-300 cursor-pointer disabled:opacity-10"
                >
                    <ChevronRight size={18} />
                </button>

                {/* Scrollable Array Node Core */}
                <div
                    ref={containerRef}
                    className="flex items-center gap-5 overflow-x-auto no-scrollbar py-6 scroll-smooth snap-x snap-mandatory"
                    /* Tightened dimension profile down to 3.5rem to guarantee centered lock frames */
                    style={{ 
                        scrollbarWidth: "none",
                        paddingLeft: "calc(50% - 3.5rem)",
                        paddingRight: "calc(50% - 3.5rem)"
                    }}
                >
                    {AVATAR_OPTIONS.map((avatar, index) => {
                        const isSelected = index === selectedIndex;
                        return (
                            <button
                                key={avatar.id}
                                type="button"
                                onClick={() => setSelectedIndex(index)}
                                className={`flex-shrink-0 relative transition-all duration-500 cursor-pointer snap-center
                                    ${isSelected
                                        ? "scale-115 z-10"
                                        : "scale-90 opacity-30 hover:opacity-70 hover:scale-95 grayscale hover:grayscale-0"
                                    }`}
                            >
                                {/* Circle Frame - Optimized smaller size ratios for maximum vertical clearance */}
                                <div className={`rounded-full overflow-hidden transition-all duration-500
                                    ${isSelected
                                        ? "w-24 h-24 md:w-28 md:h-28 border-2 border-neon-blue shadow-[0_0_25px_rgba(0,136,255,0.4)]"
                                        : "w-16 h-16 md:w-20 md:h-20 border border-frame"
                                    }`}
                                >
                                    <img
                                        src={avatar.url}
                                        alt={avatar.label}
                                        className="w-full h-full object-cover bg-panel"
                                        loading="lazy"
                                    />

                                    {/* Laser scan lines */}
                                    {isSelected && (
                                        <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
                                            <div className="absolute inset-0 bg-neon-blue/10 animate-[scan_3s_linear_infinite]" />
                                        </div>
                                    )}
                                </div>

                                {/* Selection Checkmark Anchor */}
                                {isSelected && (
                                    <div className="absolute -bottom-0.5 -right-0.5 w-7 h-7 bg-neon-blue rounded-full flex items-center justify-center border-4 border-[#050b14] shadow-[0_0_12px_rgba(0,136,255,0.5)]">
                                        <Check size={10} className="text-abyss" strokeWidth={3} />
                                    </div>
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* ACTIONS & TELEMETRY COMMITMENT LAYER */}
            <div className="w-full flex flex-col items-center gap-4 z-10 shrink-0 mb-2 md:mb-0">
                
                {/* Active Choice Readout */}
                <div className="text-center select-none">
                    <p className="font-mono text-[8px] text-steel/50 uppercase tracking-widest">
                        SELECTED MATRIX INTEL
                    </p>
                    <p className="font-mono text-sm md:text-lg font-black text-pure-white uppercase tracking-widest mt-0.5">
                        {AVATAR_OPTIONS[selectedIndex]?.label || "UNKNOWN"}
                    </p>
                </div>

                {/* Operations Confirmation Buttons */}
                <div className="flex gap-4">
                    {onCancel && (
                        <button
                            type="button"
                            onClick={onCancel}
                            disabled={isSaving}
                            className="px-6 md:px-10 py-3 border border-frame text-steel font-mono text-xs uppercase tracking-widest hover:text-pure-white hover:border-pure-white transition-all duration-300 cursor-pointer disabled:opacity-40"
                        >
                            CANCEL
                        </button>
                    )}
                    <button
                        type="button"
                        onClick={handleConfirm}
                        disabled={isSaving}
                        className="px-10 md:px-14 py-3 border border-neon-blue bg-neon-blue/5 text-pure-white font-mono text-xs font-black uppercase tracking-[0.2em] hover:bg-neon-blue/15 hover:shadow-[0_0_25px_rgba(0,136,255,0.3)] active:scale-95 transition-all duration-300 cursor-pointer button-cut disabled:opacity-50"
                    >
                        {isSaving ? "LOGGING INTEL..." : "CONFIRM_IDENTITY →"}
                    </button>
                </div>

                {/* System identification line track */}
                <div className="font-mono text-[8px] text-steel/20 uppercase tracking-[0.5em] select-none pointer-events-none mt-1">
                    INTERVIEW_AI_SYSTEMS // IDENTITY_CONFIGURATION
                </div>
            </div>

        </div>
    );
};

export default AvatarSelectScreen;
