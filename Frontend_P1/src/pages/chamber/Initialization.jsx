import React, { useState, useEffect } from "react";
import { Play, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import ParticleBackground from "../../components/ui/elements/ParticleBackground";
import { setInterviewConfig } from "../../redux/features/interviewSlice";
import { startLoading, stopLoading } from "../../redux/features/loadingSlice";
import { jobService } from "../../services/jobService";
import { interviewService } from "../../services/interviewService";
import { userService } from "../../services/userService";

const InitializePortal = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [questionCount, setQuestionCount] = useState(5);
    const [interviewLength, setInterviewLength] = useState(10);

    // Load user preferences on mount
    useEffect(() => {
        const loadPrefs = async () => {
            try {
                const prefs = await userService.getPreferences();
                setQuestionCount(prefs.questionCount || 5);
                setInterviewLength(prefs.interviewLength || 10);
            } catch {
                // use defaults silently
            }
        };
        loadPrefs();
    }, []);

    const [jobTitle, setJobTitle] = useState("");
    const [company, setCompany] = useState("");
    const [jobDesc, setJobDesc] = useState("");
    const [isCommencing, setIsCommencing] = useState(false);
    const [error, setError] = useState(null);

    const jdLength = jobDesc.length;
    const isReady = jdLength > 10 && jobTitle.trim().length > 2;
    const dynamicGlowSize = Math.min(100 + jdLength / 5, 200);

    const handleCommence = async () => {
        if (!isReady) return;
        setError(null);
        setIsCommencing(true);
        dispatch(startLoading());

        try {
            // Step 1: Save the job profile
            const jobProfile = await jobService.create({
                jobTitle,
                company,
                jobDescription: jobDesc,
            });

            // Step 2: Start the interview session
            const session = await interviewService.start(
                jobProfile.id,
                questionCount  // uses preference value
            );

            // Step 3: Store session data in Redux
            dispatch(setInterviewConfig({
                jobTitle,
                jobDesc,
                sessionId: session.sessionId,
                questions: session.questions,
                currentQuestionIndex: 0,
                interviewLengthMinutes: interviewLength, // store duration in Redux
            }));

            navigate("/interview");

        } catch (err) {
            setError(
                err.response?.data?.message || "Failed to initialize session. Try again."
            );
            setIsCommencing(false);
        } finally {
            dispatch(stopLoading());
        }
    };

    return (
        <div className={`relative w-full h-screen bg-abyss text-pure-white overflow-hidden transition-colors duration-500 flex flex-col ${isCommencing && !error ? "bg-pure-white" : ""}`}>

            <ParticleBackground count={120} />

            {/* Error banner */}
            {error && (
                <div className="absolute top-6 left-1/2 -translate-x-1/2 z-50 border border-danger/40 bg-danger/10 px-6 py-3 font-mono text-xs text-danger uppercase tracking-wider max-w-md text-center">
                    ⚠ {error}
                </div>
            )}

            <main className="relative flex-1 flex flex-col items-center justify-center w-full mt-18 z-10">

                <div
                    className={`relative flex flex-col items-center justify-center p-16 rounded-full border border-neon-blue/20 backdrop-blur-md transition-all duration-700 ease-[cubic-bezier(0.85,0,0.15,1)] group ${isCommencing && !error ? "scale-75 opacity-0" : "scale-100 opacity-100"}`}
                    style={{
                        width: "clamp(300px, 85vh, 700px)",
                        height: "clamp(300px, 85vh, 700px)",
                        background: "radial-gradient(circle, rgba(10, 18, 31, 0.8) 0%, rgba(5, 11, 20, 0.95) 70%)",
                        boxShadow: `0 0 ${dynamicGlowSize}px -20px rgba(0, 136, 255, 0.3), inset 0 0 60px rgba(0, 136, 255, 0.05)`,
                    }}
                >
                    {/* Decorative orbits */}
                    <div className="absolute top-1/2 left-1/2 w-[110%] h-[110%] rounded-full border border-dashed border-steel/10 pointer-events-none animate-[spin-orbit_60s_linear_infinite]" />
                    <div className="absolute top-1/2 left-1/2 w-[125%] h-[125%] rounded-full border border-dashed border-steel/10 pointer-events-none animate-[spin-orbit_90s_linear_infinite_reverse]" />

                    {/* Phase indicator */}
                    <div className="absolute -top-12 text-center w-full">
                        <div className="font-metadata text-neon-blue tracking-[0.6em] uppercase text-[10px] mb-2 drop-shadow-[0_0_10px_rgba(0,136,255,0.5)]">
                            NEURAL_INITIALIZE
                        </div>
                        <div className="h-px w-24 bg-neon-blue/30 mx-auto" />
                    </div>

                    {/* Job title input */}
                    <div className="w-full mb-8 relative z-10 pt-10">
                        <input
                            type="text"
                            value={jobTitle}
                            onChange={(e) => setJobTitle(e.target.value)}
                            placeholder="[ DESIGNATE TARGET ROLE ]"
                            disabled={isCommencing}
                            className="w-full bg-transparent pb-4 border-none text-center text-2xl md:text-3xl font-black uppercase tracking-tighter text-pure-white outline-none focus:ring-0 placeholder-pure-white/30 transition-all duration-300 focus:drop-shadow-[0_0_15px_rgba(0,136,255,0.5)] disabled:opacity-50"
                        />
                        <div className="h-px w-0 group-focus-within:w-full bg-gradient-to-r from-transparent via-neon-blue to-transparent transition-all duration-700 mx-auto mt-2" />
                    </div>

                    {/* Company input */}
                    <div className="w-full mb-6 relative z-10">
                        <input
                            type="text"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            placeholder="[ COMPANY / ORGANIZATION ]"
                            disabled={isCommencing}
                            className="w-full bg-transparent pb-2 border-none text-center text-sm md:text-base font-mono uppercase tracking-widest text-steel/60 outline-none focus:ring-0 placeholder-steel/25 transition-all duration-300 focus:text-neon-blue disabled:opacity-50"
                        />
                    </div>

                    {/* Job description textarea */}
                    <div className="flex-1 w-full flex items-center justify-center relative z-10">
                        <textarea
                            value={jobDesc}
                            onChange={(e) => setJobDesc(e.target.value)}
                            placeholder="PASTE JOB PROTOCOL STREAM..."
                            disabled={isCommencing}
                            className="w-full h-full bg-transparent border-none text-center text-lg md:text-xl font-medium text-steel/80 outline-none focus:ring-0 placeholder-steel/30 resize-none brutalist-scroll leading-relaxed overflow-y-auto pt-4 disabled:opacity-50"
                        />
                    </div>

                    {/* Telemetry overlays */}
                    <div className="absolute top-1/2 -left-16 -translate-y-1/2 rotate-90 pointer-events-none opacity-20">
                        <span className="font-metadata text-[9px] tracking-widest text-neon-blue uppercase">
                            SYSLOAD_ACTIVE
                        </span>
                    </div>
                    <div className="absolute top-1/2 -right-16 -translate-y-1/2 -rotate-90 pointer-events-none opacity-20">
                        <span className="font-metadata text-[9px] tracking-widest text-neon-blue uppercase">
                            {jdLength} BYTES
                        </span>
                    </div>

                    {/* Commence button */}
                    <button
                        onClick={handleCommence}
                        disabled={!isReady || isCommencing}
                        className={`
                            absolute -bottom-7 left-1/2 -translate-x-1/2
                            h-16 rounded-full
                            flex items-center justify-center
                            overflow-hidden group/btn
                            font-metadata tracking-[0.2em] font-bold
                            transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
                            ${!isReady || isCommencing
                                ? "w-16 border-2 border-frame bg-panel/50 text-steel cursor-not-allowed"
                                : "w-16 hover:w-56 border-2 border-neon-blue bg-abyss/80 backdrop-blur-lg text-pure-white cursor-pointer hover:bg-neon-blue hover:shadow-[0_0_40px_rgba(0,136,255,0.6)]"
                            }
                        `}
                    >
                        {isCommencing ? (
                            <Loader2
                                size={24}
                                className="animate-spin text-pure-white"
                                strokeWidth={3}
                            />
                        ) : (
                            <div className="flex items-center justify-center relative w-full h-full">
                                <Play
                                    size={20}
                                    className="fill-current shrink-0 transition-all duration-500 group-hover/btn:opacity-0 group-hover/btn:scale-50"
                                />
                                {isReady && (
                                    <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap opacity-0 scale-90 transition-all duration-500 group-hover/btn:opacity-100 group-hover/btn:scale-100">
                                        COMMENCE
                                    </span>
                                )}
                            </div>
                        )}
                    </button>
                </div>
            </main>
        </div>
    );
};

export default InitializePortal;
