import React, { useState } from "react";
import { X, Check, RefreshCw } from "lucide-react";
import { AVATAR_OPTIONS } from "../../config/avatars";

const AvatarPickerModal = ({
    isOpen,
    currentAvatarUrl,
    onSelect,
    onClose,
    isSaving = false,
}) => {
    const [selected, setSelected] = useState(currentAvatarUrl || null);

    if (!isOpen) return null;

    const handleConfirm = () => {
        if (selected) onSelect(selected);
    };

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-abyss/90 backdrop-blur-md">

            {/* Modal container */}
            <div className="relative w-full max-w-2xl mx-4 bg-panel border border-neon-blue/40 shadow-[0_0_60px_rgba(0,136,255,0.2)]">

                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-neon-blue" />
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-neon-blue" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-neon-blue" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-neon-blue" />

                {/* Header */}
                <div className="flex items-center justify-between px-8 py-5 border-b border-frame">
                    <div>
                        <h2 className="font-mono text-sm font-black text-pure-white uppercase tracking-widest">
                            SELECT OPERATOR AVATAR
                        </h2>
                        <p className="font-mono text-[9px] text-steel uppercase tracking-widest mt-0.5">
                            Choose your identity profile image
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-steel hover:text-pure-white transition-colors cursor-pointer"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Avatar grid */}
                <div className="p-6 grid grid-cols-5 sm:grid-cols-7 gap-3 max-h-[380px] overflow-y-auto no-scrollbar">
                    {AVATAR_OPTIONS.map((avatar) => {
                        const isSelected = selected === avatar.url;
                        return (
                            <button
                                key={avatar.id}
                                onClick={() => setSelected(avatar.url)}
                                className={`relative aspect-square rounded-full border-2 overflow-hidden transition-all duration-200 cursor-pointer group
                                    ${isSelected
                                        ? "border-neon-blue shadow-[0_0_20px_rgba(0,136,255,0.5)] scale-110"
                                        : "border-frame hover:border-neon-blue/50 hover:scale-105"
                                    }`}
                            >
                                <img
                                    src={avatar.url}
                                    alt={avatar.label}
                                    className="w-full h-full object-cover bg-surface-container-high"
                                />
                                {isSelected && (
                                    <div className="absolute inset-0 bg-neon-blue/20 flex items-center justify-center">
                                        <Check size={16} className="text-pure-white" strokeWidth={3} />
                                    </div>
                                )}
                            </button>
                        );
                    })}
                </div>

                {/* Selected preview + confirm */}
                <div className="px-8 py-5 border-t border-frame flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        {selected ? (
                            <>
                                <img
                                    src={selected}
                                    alt="Selected"
                                    className="w-12 h-12 rounded-full border-2 border-neon-blue object-cover bg-surface-container-high"
                                />
                                <div>
                                    <p className="font-mono text-[9px] text-steel uppercase tracking-widest">
                                        SELECTED
                                    </p>
                                    <p className="font-mono text-xs text-neon-blue font-black uppercase">
                                        {AVATAR_OPTIONS.find(a => a.url === selected)?.label || "CUSTOM"}
                                    </p>
                                </div>
                            </>
                        ) : (
                            <p className="font-mono text-[10px] text-steel/50 uppercase tracking-widest">
                                // NO AVATAR SELECTED
                            </p>
                        )}
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={onClose}
                            className="px-6 h-10 border border-frame text-steel font-mono text-xs uppercase tracking-widest hover:text-pure-white hover:border-pure-white transition-all duration-300 cursor-pointer"
                        >
                            CANCEL
                        </button>
                        <button
                            onClick={handleConfirm}
                            disabled={!selected || isSaving}
                            className="px-6 h-10 bg-neon-blue text-abyss font-mono text-xs font-black uppercase tracking-widest hover:bg-pure-white transition-all duration-300 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed button-cut flex items-center gap-2"
                        >
                            {isSaving ? (
                                <RefreshCw size={12} className="animate-spin" />
                            ) : (
                                <Check size={12} strokeWidth={3} />
                            )}
                            CONFIRM
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AvatarPickerModal;
