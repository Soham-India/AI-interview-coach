import React, { useState } from "react";
import { Sliders, Hash, Save, RefreshCw } from "lucide-react";
import ConfigButton from "../ui/elements/ConfigButton";

const LENGTH_OPTIONS = [10, 15, 30, 45];
const QUESTION_OPTIONS = [2, 5, 8, 10, 15];

const ProfileConfigView = ({ preferences, onUpdate }) => {
    const [length, setLength] = useState(preferences.interviewLength || 10);
    const [questionCount, setQuestionCount] = useState(preferences.questionCount || 5);
    const [isSaving, setIsSaving] = useState(false);
    const [saveStatus, setSaveStatus] = useState(null);
    const [error, setError] = useState(null);

    // Derive difficulty label for display
    const getDifficultyLabel = () => {
        if (length >= 45) return "ADAPTIVE";
        if (length >= 30 && questionCount >= 10) return "ADAPTIVE";
        if (length >= 30) return "HARD";
        if (length >= 15 && questionCount >= 8) return "HARD";
        if (length >= 15 && questionCount >= 5) return "MEDIUM";
        if (length >= 10 && questionCount >= 5) return "MEDIUM";
        return "EASY";
    };

    const getDifficultyColor = () => {
        const d = getDifficultyLabel();
        if (d === "EASY") return "text-success";
        if (d === "MEDIUM") return "text-warning";
        if (d === "HARD") return "text-danger";
        return "text-neon-blue";
    };

    const handleSave = async () => {
        setIsSaving(true);
        setError(null);
        setSaveStatus(null);

        try {
            await onUpdate({
                interviewLength: length,
                questionCount,
            });
            setSaveStatus("SAVED");
            setTimeout(() => setSaveStatus(null), 3000);
        } catch (err) {
            setError(
                err.response?.data?.message || "Failed to save configuration."
            );
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="w-full h-full flex flex-col justify-center space-y-10 xl:space-y-14">

            {/* Section header */}
            <div className="select-none">
                <span className="font-mono text-[10px] text-neon-blue mb-1 block uppercase tracking-[0.3em] font-bold">
                    System Preferences // Global
                </span>
                <h2 className="font-scene-focus text-2xl md:text-4xl text-pure-white uppercase font-black tracking-tight border-b-4 border-frame pb-3">
                    System Configuration
                </h2>
            </div>

            <div className="space-y-8 md:space-y-10 max-w-4xl w-full">

                {/* ROW 1: Interview Length */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-1 select-none">
                        <h4 className="font-mono text-base text-pure-white font-black tracking-wide uppercase flex items-center gap-2">
                            <Sliders size={14} className="text-neon-blue" />
                            Interview Duration
                        </h4>
                        <p className="font-mono text-xs text-steel tracking-wide">
                            // Total time allocated per simulation session
                        </p>
                    </div>
                    <div className="flex gap-4 flex-wrap">
                        {LENGTH_OPTIONS.map((val) => (
                            <ConfigButton
                                key={val}
                                isActive={length === val}
                                onClick={() => setLength(val)}
                            >
                                {val} MIN
                            </ConfigButton>
                        ))}
                    </div>
                </div>

                <div className="h-px w-full bg-frame/40 select-none pointer-events-none" />

                {/* ROW 2: Question Count */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-1 select-none">
                        <h4 className="font-mono text-base text-pure-white font-black tracking-wide uppercase flex items-center gap-2">
                            <Hash size={14} className="text-neon-blue" />
                            Question Count
                        </h4>
                        <p className="font-mono text-xs text-steel tracking-wide">
                            // Number of adversarial questions per session
                        </p>
                    </div>
                    <div className="flex gap-4 flex-wrap">
                        {QUESTION_OPTIONS.map((val) => (
                            <ConfigButton
                                key={val}
                                isActive={questionCount === val}
                                onClick={() => setQuestionCount(val)}
                            >
                                {val < 10 ? `0${val}` : val}
                            </ConfigButton>
                        ))}
                    </div>
                </div>

                <div className="h-px w-full bg-frame/40 select-none pointer-events-none" />

                {/* AUTO-DIFFICULTY DISPLAY */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-1 select-none">
                        <h4 className="font-mono text-base text-pure-white font-black tracking-wide uppercase flex items-center gap-2">
                            <span className="text-neon-blue text-sm">⚡</span>
                            Auto Difficulty
                        </h4>
                        <p className="font-mono text-xs text-steel tracking-wide">
                            // Calculated from duration + question count
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className={`font-mono text-lg font-black tracking-widest uppercase ${getDifficultyColor()}`}>
                            {getDifficultyLabel()}
                        </div>
                        <div className="font-mono text-[9px] text-steel/50 uppercase tracking-wider">
                            // AUTO-CALCULATED
                        </div>
                    </div>
                </div>

                <div className="h-px w-full bg-frame/40 select-none pointer-events-none" />

                {/* Error */}
                {error && (
                    <div className="border border-danger/40 bg-danger/10 px-4 py-2 font-mono text-xs text-danger uppercase tracking-wider">
                        ⚠ {error}
                    </div>
                )}

                {/* Save button */}
                <div className="flex justify-end pt-4">
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="h-14 px-10 border border-neon-blue bg-neon-blue/5 font-mono text-xs font-black uppercase tracking-[0.25em] text-pure-white flex items-center gap-3 hover:bg-neon-blue/10 hover:shadow-[0_0_20px_rgba(0,136,255,0.2)] transition-all duration-300 button-cut cursor-pointer disabled:opacity-40"
                    >
                        {isSaving ? (
                            <>
                                <RefreshCw size={14} className="animate-spin" />
                                SAVING...
                            </>
                        ) : saveStatus === "SAVED" ? (
                            <>
                                <span className="text-success">✓</span>
                                CONFIGURATION SAVED
                            </>
                        ) : (
                            <>
                                <Save size={14} />
                                SAVE CONFIGURATION
                            </>
                        )}
                    </button>
                </div>

            </div>
        </div>
    );
};

export default ProfileConfigView;