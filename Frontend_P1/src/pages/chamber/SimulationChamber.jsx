import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
    CheckCircle2,
    RefreshCw,
    AlertTriangle,
    ArrowLeft,
    ArrowRight,
} from "lucide-react";
import Navbar from "../../components/navbar/Navbar";
import AbortPopup from "../../components/ui/AbortPopup";
import { resetInterview } from "../../redux/features/interviewSlice";
import { startLoading, stopLoading } from "../../redux/features/loadingSlice";
import { interviewService } from "../../services/interviewService";
import { evaluationService } from "../../services/evaluationService";

const SimulationChamber = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Pull everything from Redux — set by Initialization.jsx
    const { sessionId, questions, jobTitle, interviewLengthMinutes } = useSelector(
        (state) => state.interview
    );

    // Convert minutes to seconds
    const maxSeconds = interviewLengthMinutes * 60;

    // ── Local state ──────────────────────────────────────────────
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [response, setResponse] = useState("");
    const [isSynced, setIsSynced] = useState(true);
    const [seconds, setSeconds] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isCompleting, setIsCompleting] = useState(false);
    const [error, setError] = useState(null);
    const [expanded, setExpanded] = useState(false);

    const timerRef = useRef(null);
    const elapsedSyncRef = useRef(null);

    const currentQuestion = questions[currentIndex];
    const totalQuestions = questions.length;
    const progressPercent = totalQuestions
        ? Math.round(((currentIndex + 1) / totalQuestions) * 100)
        : 0;

    // ── Timer ────────────────────────────────────────────────────
    useEffect(() => {
        timerRef.current = setInterval(() => {
            setSeconds((prev) => prev + 1);
        }, 1000);

        // Sync elapsed time to backend every 30 seconds
        elapsedSyncRef.current = setInterval(() => {
            if (sessionId) {
                interviewService.updateElapsedTime(sessionId, seconds)
                    .catch(() => {}); // silent fail — non-critical
            }
        }, 30000);

        return () => {
            clearInterval(timerRef.current);
            clearInterval(elapsedSyncRef.current);
        };
    }, [sessionId]);

    // Auto-submit when timer expires
    useEffect(() => {
        if (seconds >= maxSeconds && maxSeconds > 0 && !isCompleting) {
            handleAutoComplete();
        }
    }, [seconds, maxSeconds]);

    const handleAutoComplete = async () => {
        if (isCompleting) return;
        setIsCompleting(true);
        dispatch(startLoading());

        try {
            // Submit current answer if user was mid-typing
            if (response.trim().length >= 3 && !submittedIndexes.has(currentIndex)) {
                try {
                    await evaluationService.submitAnswer(
                        sessionId,
                        currentQuestion.id,
                        response.trim()
                    );
                    setSubmittedIndexes(prev => new Set([...prev, currentIndex]));
                } catch {
                    // continue even if this fails
                }
            }

            // Complete session — unanswered questions stay null in DB
            // Backend handles partial reports correctly
            await evaluationService.complete(sessionId);
            navigate("/report");

        } catch (err) {
            setError("Auto-submission failed. Please submit manually.");
            setIsCompleting(false);
        } finally {
            dispatch(stopLoading());
        }
    };

    // ── Guard — redirect if no session ──────────────────────────
    useEffect(() => {
        if (!sessionId || questions.length === 0) {
            navigate("/initialize");
        }
    }, [sessionId, questions, navigate]);

    // ── Answer text handler ──────────────────────────────────────
    const handleTextChange = (e) => {
        const val = e.target.value;
        setResponse(val);
        setIsSynced(false);
        setAnswers((prev) => ({ ...prev, [currentIndex]: val }));
    };

    // Debounced autosave indicator
    useEffect(() => {
        if (!isSynced) {
            const timeout = setTimeout(() => setIsSynced(true), 600);
            return () => clearTimeout(timeout);
        }
    }, [response, isSynced]);

    // ── Navigation ───────────────────────────────────────────────
    const stepForward = () => {
        if (currentIndex < totalQuestions - 1) {
            const next = currentIndex + 1;
            setCurrentIndex(next);
            setResponse(answers[next] || "");
            setExpanded(false);
        }
    };

    const stepBackward = () => {
        if (currentIndex > 0) {
            const prev = currentIndex - 1;
            setCurrentIndex(prev);
            setResponse(answers[prev] || "");
            setExpanded(false);
        }
    };

    // ── Submit single answer ─────────────────────────────────────
    const handleSubmitAnswer = async () => {
        if (!response.trim() || isSubmitting) return;
        setError(null);
        setIsSubmitting(true);

        try {
            await evaluationService.submitAnswer(
                sessionId,
                currentQuestion.id,
                response.trim()
            );

            // Mark answer as submitted
            setAnswers((prev) => ({
                ...prev,
                [currentIndex]: response,
            }));

        } catch (err) {
            setError(
                err.response?.data?.message || "Failed to submit answer."
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    // ── Complete interview ───────────────────────────────────────
    const handleComplete = async () => {
        if (isCompleting) return;
        setError(null);
        setIsCompleting(true);
        dispatch(startLoading());

        try {
            // Submit current answer if not yet submitted
            if (response.trim() && !isAnswerSubmitted(currentIndex)) {
                await evaluationService.submitAnswer(
                    sessionId,
                    currentQuestion.id,
                    response.trim()
                );
            }

            // Complete the session — triggers Gemini final report
            await evaluationService.complete(sessionId);

            navigate("/report");

        } catch (err) {
            setError(
                err.response?.data?.message || "Failed to complete interview."
            );
            setIsCompleting(false);
        } finally {
            dispatch(stopLoading());
        }
    };

    // ── Abort ────────────────────────────────────────────────────
    const handleAbort = async () => {
        try {
            await interviewService.terminate(sessionId);
        } catch {
            // Even if terminate fails, reset locally
        } finally {
            dispatch(resetInterview());
            navigate("/");
        }
    };

    // ── Helpers ──────────────────────────────────────────────────
    const isAnswerSubmitted = (index) => {
        // An answer is "submitted" if it exists in answers map
        // and was already sent — track with a separate submitted set
        return submittedIndexes.has(index);
    };

    const [submittedIndexes, setSubmittedIndexes] = useState(new Set());

    const handleSubmitAndNext = async () => {
        if (!response.trim() || isSubmitting) return;
        setError(null);
        setIsSubmitting(true);

        try {
            await evaluationService.submitAnswer(
                sessionId,
                currentQuestion.id,
                response.trim()
            );

            setSubmittedIndexes((prev) => new Set([...prev, currentIndex]));

            if (currentIndex < totalQuestions - 1) {
                stepForward();
            }

        } catch (err) {
            setError(
                err.response?.data?.message || "Failed to submit answer."
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    const formatTime = (totalSecs) => {
        const h = Math.floor(totalSecs / 3600);
        const m = Math.floor((totalSecs % 3600) / 60);
        const s = totalSecs % 60;
        return [h, m, s].map((v) => String(v).padStart(2, "0")).join(":");
    };

    const questionText = currentQuestion?.questionText
        || "CALIBRATING ADVERSARIAL NEURAL MODULES...";

    const questionLength = questionText.length;
    const questionSize =
        questionLength > 900
            ? "text-base md:text-lg"
            : questionLength > 500
            ? "text-lg md:text-xl"
            : "text-xl md:text-2xl lg:text-3xl";

    const displayQuestion = expanded ? questionText : questionText.slice(0, 300);

    const isLastQuestion = currentIndex === totalQuestions - 1;
    const isCurrentSubmitted = submittedIndexes.has(currentIndex);

    const timeRemaining = maxSeconds - seconds;
    const isWarning = timeRemaining <= 120 && timeRemaining > 0;
    const isExpiring = timeRemaining <= 30 && timeRemaining > 0;

    return (
        <div className="w-full h-screen bg-abyss flex flex-col overflow-hidden relative select-none">

            <AbortPopup
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleAbort}
            />

            <div className={`flex flex-col h-full w-full transition-all duration-500 ${isModalOpen ? "blur-md grayscale opacity-40 pointer-events-none" : ""}`}>

                {/* Crosshair bg */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-5 z-0">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-steel" />
                    <div className="absolute top-1/2 left-0 w-full h-px bg-steel" />
                </div>

                <Navbar
                    isSimulation={true}
                    timeString={formatTime(seconds)}
                    progressPercent={progressPercent}
                />

                <main className="w-full max-w-7xl mx-auto px-margin-edge mt-18 h-[calc(100vh-4.5rem)] flex flex-col justify-between py-6 z-10 relative">

                    {/* Error banner */}
                    {error && (
                        <div className="mb-4 border border-danger/40 bg-danger/10 px-4 py-2 font-mono text-xs text-danger uppercase tracking-wider text-center">
                            ⚠ {error}
                        </div>
                    )}

                    {isWarning && (
                        <div className={`mb-4 border px-4 py-2 font-mono text-xs uppercase tracking-wider text-center transition-all duration-300
                            ${isExpiring
                                ? "border-danger/60 bg-danger/10 text-danger animate-pulse"
                                : "border-warning/60 bg-warning/10 text-warning"
                            }`}>
                            {isExpiring
                                ? `⚠ SESSION TERMINATING IN ${timeRemaining}S — SUBMIT NOW`
                                : `⏱ ${Math.ceil(timeRemaining / 60)} MINUTES REMAINING`
                            }
                        </div>
                    )}

                    {/* Question card */}
                    <div className="bg-panel border-l-4 border-neon-blue p-6 shadow-2xl relative max-h-[35vh] flex flex-col flex-shrink-0">
                        <p className="text-steel font-metadata text-[10px] tracking-[0.3em] mb-2 uppercase font-bold flex-shrink-0">
                            SEQUENCE {String(currentIndex + 1).padStart(2, "0")} / {String(totalQuestions).padStart(2, "0")}
                            {currentQuestion?.topic && (
                                <span className="ml-4 text-neon-blue">
                                    // {currentQuestion.topic}
                                </span>
                            )}
                        </p>
                        <div className={`flex-1 min-h-0 ${expanded ? 'overflow-y-auto brutalist-scroll pr-2' : 'overflow-hidden'}`}>
                            <h1 className={`text-pure-white ${questionSize} font-black leading-relaxed tracking-tight uppercase`}>
                                {displayQuestion}
                                {!expanded && questionLength > 300 && "..."}
                            </h1>
                        </div>
                        {questionLength > 300 && (
                            <button
                                onClick={() => setExpanded(!expanded)}
                                className="mt-3 text-neon-blue text-xs font-metadata tracking-widest cursor-pointer hover:text-pure-white transition-colors flex-shrink-0 text-left w-max"
                            >
                                {expanded ? "[ VIEW LESS ]" : "[ VIEW MORE ]"}
                            </button>
                        )}
                        {isCurrentSubmitted && (
                            <div className="absolute top-4 right-4 flex items-center gap-1.5 text-success font-metadata text-[10px] tracking-widest font-bold bg-panel px-2 py-1">
                                <CheckCircle2 size={12} />
                                ANSWER LOCKED IN
                            </div>
                        )}
                    </div>

                    {/* Pulse core */}
                    <div className="relative flex justify-center items-center h-14 flex-shrink-0">
                        <div className="w-2 h-2 bg-neon-blue rounded-full absolute shadow-[0_0_25px_4px_rgba(0,136,255,1)] animate-pulse" />
                        <div className="w-10 h-10 border border-neon-blue/20 rounded-full absolute animate-ping duration-1000" />
                    </div>

                    {/* Answer textarea */}
                    <div className="relative group flex-1 bg-panel/30 border border-frame/40 rounded p-4 flex flex-col min-h-0">
                        <textarea
                            value={response}
                            onChange={handleTextChange}
                            disabled={isCurrentSubmitted || isSubmitting || isCompleting}
                            className="w-full flex-1 min-h-0 overflow-y-auto bg-transparent border-none outline-none focus:ring-0 text-steel text-base md:text-lg font-light leading-relaxed tracking-wide resize-none placeholder-steel/20 brutalist-scroll disabled:opacity-60"
                            placeholder={
                                isCurrentSubmitted
                                    ? "Answer submitted. Move to next question."
                                    : "Initialize response protocol stream..."
                            }
                        />
                        <div className="absolute bottom-4 right-4 flex items-center gap-2 select-none pointer-events-none bg-abyss/80 px-2 py-1 rounded">
                            {isSynced ? (
                                <>
                                    <span className="text-success font-metadata text-[10px] tracking-widest font-bold">SYNCED</span>
                                    <CheckCircle2 size={12} className="text-success" />
                                </>
                            ) : (
                                <>
                                    <span className="text-warning font-metadata text-[10px] tracking-widest font-bold">SAVING</span>
                                    <RefreshCw size={12} className="text-warning animate-spin" />
                                </>
                            )}
                        </div>
                    </div>

                    {/* Footer controls */}
                    <div className="flex items-center justify-between pt-6 pb-2 flex-shrink-0">

                        {/* Left controls */}
                        <div className="flex items-center gap-4">
                            {currentIndex > 0 && (
                                <button
                                    onClick={stepBackward}
                                    className="text-steel hover:text-pure-white font-metadata text-xs tracking-widest uppercase transition-colors flex items-center gap-2 cursor-pointer"
                                >
                                    <ArrowLeft size={12} />
                                    <span>[ PREVIOUS ]</span>
                                </button>
                            )}

                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="text-danger border border-danger/30 hover:border-danger hover:bg-danger/10 px-4 py-2 font-metadata text-xs tracking-widest uppercase transition-all duration-300 flex items-center gap-1.5 cursor-pointer"
                            >
                                <AlertTriangle size={12} />
                                <span>[ ABORT ]</span>
                            </button>
                        </div>

                        {/* Right controls */}
                        <div className="flex items-center gap-4">

                            {/* Submit current answer */}
                            {!isCurrentSubmitted && response.trim().length >= 5 && (
                                <button
                                    onClick={handleSubmitAndNext}
                                    disabled={isSubmitting}
                                    className="flex items-center gap-2 px-6 py-3.5 border border-neon-blue text-neon-blue hover:bg-neon-blue/10 font-metadata text-xs uppercase tracking-widest transition-all duration-300 cursor-pointer disabled:opacity-50"
                                >
                                    {isSubmitting ? (
                                        <RefreshCw size={12} className="animate-spin" />
                                    ) : (
                                        <>
                                            <span>
                                                {isLastQuestion
                                                    ? "[ SUBMIT ANSWER ]"
                                                    : "[ SUBMIT + NEXT ]"}
                                            </span>
                                            <ArrowRight size={12} />
                                        </>
                                    )}
                                </button>
                            )}

                            {/* Complete interview — only on last question after submitting */}
                            {isLastQuestion && isCurrentSubmitted && (
                                <button
                                    onClick={handleComplete}
                                    disabled={isCompleting}
                                    className={`relative px-6 py-3.5 border overflow-hidden transition-all duration-300 group border-neon-blue text-neon-blue hover:shadow-[0_0_15px_rgba(0,136,255,0.35)] cursor-pointer disabled:opacity-50`}
                                    style={{
                                        clipPath: "polygon(6% 0, 100% 0, 100% 70%, 94% 100%, 0 100%, 0 30%)",
                                    }}
                                >
                                    <span className="relative z-10 font-metadata text-xs uppercase tracking-[0.2em] font-black group-hover:text-abyss transition-colors duration-300">
                                        {isCompleting ? (
                                            <RefreshCw size={12} className="animate-spin inline mr-2" />
                                        ) : null}
                                        [ TRANSMIT COMPLETE RESPONSE ]
                                    </span>
                                    <div className="absolute inset-0 bg-neon-blue translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                                </button>
                            )}

                            {/* Navigate forward without submitting */}
                            {!isLastQuestion && isCurrentSubmitted && (
                                <button
                                    onClick={stepForward}
                                    className="flex items-center gap-2 px-6 py-3.5 border border-neon-blue text-neon-blue hover:bg-neon-blue/10 font-metadata text-xs uppercase tracking-widest transition-all duration-300 cursor-pointer"
                                >
                                    <span>[ NEXT SEQUENCE ]</span>
                                    <ArrowRight size={12} />
                                </button>
                            )}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default SimulationChamber;
