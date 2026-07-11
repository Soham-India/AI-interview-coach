import React, { useState } from "react";
import { Sliders, ShieldAlert, Paintbrush, Save } from "lucide-react";
import ConfigButton from "../ui/elements/ConfigButton";

const ProfileConfigView = ({ preferences, onUpdate }) => {
  const [length, setLength] = useState(preferences?.interviewLength || 5);
  const [difficulty, setDifficulty] = useState(preferences?.difficulty || "MEDIUM");
  const [theme, setTheme] = useState(preferences?.theme || "CYBER");
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    try {
      setIsSaving(true);
      await onUpdate({ interviewLength: length, difficulty, theme });
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-center space-y-10 xl:space-y-14">
      
      {/* SECTION HEADER TRACK */}
      <div className="select-none">
        <span className="font-mono text-[10px] text-neon-blue mb-1 block uppercase tracking-[0.3em] font-bold">
          System Preferences // Global
        </span>
        <h2 className="font-scene-focus text-2xl md:text-4xl text-pure-white uppercase font-black tracking-tight border-b-4 border-frame pb-3">
          System Configuration
        </h2>
      </div>

      {/* CORE CONFIGURATION CONTROL STACKS */}
      <div className="space-y-8 md:space-y-10 max-w-4xl w-full">
        
        {/* ROW 1: INTERVIEW LENGTH LOOP CONTROL */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1 select-none">
            <h4 className="font-mono text-base text-pure-white font-black tracking-wide uppercase flex items-center gap-2">
              <Sliders size={14} className="text-neon-blue" /> Default Interview Length
            </h4>
            <p className="font-mono text-xs text-steel tracking-wide">
              // Minutes allocated per adaptive session loop
            </p>
          </div>
          <div className="flex gap-4">
            {[5, 10, 15].map((val) => (
              <ConfigButton
                key={val}
                isActive={length === val}
                onClick={() => setLength(val)}
              >
                {val < 10 ? `0${val}` : val}
              </ConfigButton>
            ))}
          </div>
        </div>

        <div className="h-px w-full bg-frame/40 select-none pointer-events-none" />

        {/* ROW 2: DIFFICULTY STRESS TRACK CONFIGURATION */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1 select-none">
            <h4 className="font-mono text-base text-pure-white font-black tracking-wide uppercase flex items-center gap-2">
              <ShieldAlert size={14} className="text-neon-blue" /> Preferred Difficulty
            </h4>
            <p className="font-mono text-xs text-steel tracking-wide">
              // AI adversarial cognitive stress load threshold parameters
            </p>
          </div>
          <div className="grid grid-cols-2 sm:flex gap-4">
            {["EASY", "MEDIUM", "HARD", "ADAPTIVE"].map((diff) => (
              <ConfigButton
                key={diff}
                isActive={difficulty === diff}
                onClick={() => setDifficulty(diff)}
              >
                {diff}
              </ConfigButton>
            ))}
          </div>
        </div>

        <div className="h-px w-full bg-frame/40 select-none pointer-events-none" />

        {/* ROW 3: INTERFACE COLOR THEME CONTROLS */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1 select-none">
            <h4 className="font-mono text-base text-pure-white font-black tracking-wide uppercase flex items-center gap-2">
              <Paintbrush size={14} className="text-neon-blue" /> Interface Theme
            </h4>
            <p className="font-mono text-xs text-steel tracking-wide">
              // Chromatic telemetry environment styling mapping
            </p>
          </div>
          <div className="flex gap-4">
            {["CYBER", "BLUEPRINT", "TERMINAL"].map((t) => (
              <ConfigButton
                key={t}
                isActive={theme === t}
                onClick={() => setTheme(t)}
              >
                {t}
              </ConfigButton>
            ))}
          </div>
        </div>

        {/* ROW 4: SAVE BUTTON */}
        <div className="flex justify-end pt-4">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="h-12 px-8 border border-neon-blue bg-neon-blue/10 text-neon-blue font-mono text-sm font-bold uppercase tracking-widest hover:bg-neon-blue hover:text-abyss transition-all duration-300 button-cut flex items-center gap-2.5 cursor-pointer shadow-[0_0_15px_rgba(0,136,255,0.2)] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save size={16} />
            {isSaving ? "SAVING..." : "SAVE CONFIGURATION"}
          </button>
        </div>

      </div>

    </div>
  );
};

export default ProfileConfigView;