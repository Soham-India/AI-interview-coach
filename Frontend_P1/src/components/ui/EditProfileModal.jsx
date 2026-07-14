import React, { useState } from "react";
import { X, User, Shield, Cpu, RefreshCw, Check } from "lucide-react";

const EditProfileModal = ({
    isOpen,
    currentProfile,
    onSave,
    onClose,
    isSaving = false,
}) => {
    const [name, setName] = useState(currentProfile?.name || "");
    const [callsign, setCallsign] = useState(currentProfile?.callsign || "");
    const [role, setRole] = useState(currentProfile?.role || "");
    const [error, setError] = useState(null);

    if (!isOpen) return null;

    const handleSave = async () => {
        if (!name.trim()) {
            setError("Name is required.");
            return;
        }
        setError(null);
        await onSave({ name: name.trim(), callsign: callsign.trim(), role: role.trim() });
    };

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-abyss/90 backdrop-blur-md">

            <div className="relative w-full max-w-lg mx-4 bg-panel border border-neon-blue/40 shadow-[0_0_60px_rgba(0,136,255,0.2)]">

                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-neon-blue" />
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-neon-blue" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-neon-blue" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-neon-blue" />

                {/* Header */}
                <div className="flex items-center justify-between px-8 py-5 border-b border-frame">
                    <div>
                        <h2 className="font-mono text-sm font-black text-pure-white uppercase tracking-widest">
                            EDIT OPERATOR PROFILE
                        </h2>
                        <p className="font-mono text-[9px] text-steel uppercase tracking-widest mt-0.5">
                            Update your identity configuration
                        </p>
                    </div>
                    <button onClick={onClose} className="text-steel hover:text-pure-white transition-colors cursor-pointer">
                        <X size={18} />
                    </button>
                </div>

                {/* Form */}
                <div className="px-8 py-6 space-y-6">

                    {error && (
                        <div className="border border-danger/40 bg-danger/10 px-4 py-2 font-mono text-xs text-danger uppercase tracking-wider">
                            ⚠ {error}
                        </div>
                    )}

                    {/* Name */}
                    <div className="space-y-1.5 group/field">
                        <label className="block font-mono text-[9px] text-neon-blue uppercase tracking-widest font-bold select-none">
                            IDENTITY NAME *
                        </label>
                        <div className="relative border-b border-frame focus-within:border-neon-blue transition-colors flex items-center bg-abyss/30 px-2">
                            <User size={13} className="text-steel/40 mr-2.5 shrink-0" />
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="LEGAL NAME"
                                className="w-full bg-transparent border-none focus:ring-0 text-pure-white font-mono text-xs py-3 px-0 placeholder:text-steel/40 tracking-[0.15em] outline-none uppercase"
                            />
                            <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-neon-blue transition-all duration-500 group-focus-within/field:w-full" />
                        </div>
                    </div>

                    {/* Callsign */}
                    <div className="space-y-1.5 group/field">
                        <label className="block font-mono text-[9px] text-neon-blue uppercase tracking-widest font-bold select-none">
                            CALLSIGN
                        </label>
                        <div className="relative border-b border-frame focus-within:border-neon-blue transition-colors flex items-center bg-abyss/30 px-2">
                            <Shield size={13} className="text-steel/40 mr-2.5 shrink-0" />
                            <input
                                type="text"
                                value={callsign}
                                onChange={(e) => setCallsign(e.target.value)}
                                placeholder="GHOST / PHANTOM / NEXUS"
                                className="w-full bg-transparent border-none focus:ring-0 text-pure-white font-mono text-xs py-3 px-0 placeholder:text-steel/40 tracking-[0.15em] outline-none uppercase"
                            />
                            <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-neon-blue transition-all duration-500 group-focus-within/field:w-full" />
                        </div>
                    </div>

                    {/* Role */}
                    <div className="space-y-1.5 group/field">
                        <label className="block font-mono text-[9px] text-neon-blue uppercase tracking-widest font-bold select-none">
                            OPERATIONAL ROLE
                        </label>
                        <div className="relative border-b border-frame focus-within:border-neon-blue transition-colors flex items-center bg-abyss/30 px-2">
                            <Cpu size={13} className="text-steel/40 mr-2.5 shrink-0" />
                            <input
                                type="text"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                placeholder="BACKEND ENGINEER / FULL STACK DEV"
                                className="w-full bg-transparent border-none focus:ring-0 text-pure-white font-mono text-xs py-3 px-0 placeholder:text-steel/40 tracking-[0.15em] outline-none uppercase"
                            />
                            <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-neon-blue transition-all duration-500 group-focus-within/field:w-full" />
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="px-8 py-5 border-t border-frame flex items-center justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-6 h-10 border border-frame text-steel font-mono text-xs uppercase tracking-widest hover:text-pure-white hover:border-pure-white transition-all duration-300 cursor-pointer"
                    >
                        CANCEL
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={isSaving || !name.trim()}
                        className="px-6 h-10 bg-neon-blue text-abyss font-mono text-xs font-black uppercase tracking-widest hover:bg-pure-white transition-all duration-300 cursor-pointer disabled:opacity-40 button-cut flex items-center gap-2"
                    >
                        {isSaving ? (
                            <RefreshCw size={12} className="animate-spin" />
                        ) : (
                            <Check size={12} strokeWidth={3} />
                        )}
                        SAVE PROFILE
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditProfileModal;
