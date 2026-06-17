import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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
// IMPORT ACTIONS: Replace with your actual loading action paths
// import { startLoading, stopLoading } from "../../store/loadingSlice";

const SimulationChamber = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 1. Grab initialized context from Redux
  const { jobTitle, jobDesc } = useSelector((state) => state.interview);

  // 2. Local simulation telemetry states
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [response, setResponse] = useState("");
  const [userAnswers, setUserAnswers] = useState({}); // Stores answers per question index
  const [isSynced, setIsSynced] = useState(true);
  const [seconds, setSeconds] = useState(892);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Dedicated execution route strategy
  const handleAbortSimulation = () => {
    dispatch(resetInterview()); // Erases global initialization states cleanly
    navigate("/");              // Re-routes back to landing matrix safely
  };

  const navToReport= () => {
    navigate("/report");
  }

  // 3. Clock Ticker Engine
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // 4. Async AI Question Generation Fetch
  useEffect(() => {
    const generateQuestions = async () => {
      // Direct guard: if someone bypassed initialization somehow, send them back
      if (!jobTitle) {
        navigate("/initialize");
        return;
      }

      try {
        // dispatch(startLoading()); // Turn on your loading portal overlay

        // Replace with your real backend endpoint route when ready
        // const res = await fetch("/api/generate-questions", {
        //   method: "POST",
        //   headers: { "Content-Type": "application/json" },
        //   body: JSON.stringify({ jobTitle, jobDesc })
        // });
        // const data = await res.json();
        // setQuestions(data.questions);

        // Simulated network latency matching your theme style
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // Mock generation profile structured specifically to your inputs
        const mockGeneratedQuestions = [
          {
            id: 1,
            text: `As a ${jobTitle}, how do you handle scale and optimization architectures under stress testing parameters?`,
          },
          {
            id: 2,
            text: `Based on your protocol stream details, walk me through your tactical mitigation process when dealing with data drift.`,
          },
          {
            id: 3,
            text: `Explain a time you had to compromise clean system architecture for an immediate business deployment window.`,
          },
          {
            id: 4,
            text: `How do you calibrate dependencies in a multi-layered ecosystem similar to the environment referenced in your prompt?`,
          },
        ];

        setQuestions(mockGeneratedQuestions);
      } catch (error) {
        console.error("Telemetry fetch failure:", error);
      } finally {
        // dispatch(stopLoading()); // Extinguish loading screen portal
      }
    };

    generateQuestions();
  }, [jobTitle, jobDesc, navigate]);

  // 5. Save/Load current input response text buffer when toggling through steps
  const handleTextChange = (e) => {
    const val = e.target.value;
    setResponse(val);
    setIsSynced(false);

    // Track input updates in local memory map
    setUserAnswers((prev) => ({
      ...prev,
      [currentIndex]: val,
    }));
  };

  // Debounced auto-save status simulator
  useEffect(() => {
    if (!isSynced) {
      const delayDebounce = setTimeout(() => {
        setIsSynced(true);
      }, 600);
      return () => clearTimeout(delayDebounce);
    }
  }, [response, isSynced]);

  // 6. Navigation Controls
  const stepForward = () => {
    if (currentIndex < questions.length - 1) {
      const nextIdx = currentIndex + 1;
      setCurrentIndex(nextIdx);
      setResponse(userAnswers[nextIdx] || ""); // Hydrate previous text or set blank
    }
  };

  const stepBackward = () => {
    if (currentIndex > 0) {
      const prevIdx = currentIndex - 1;
      setCurrentIndex(prevIdx);
      setResponse(userAnswers[prevIdx] || ""); // Hydrate previous text
    }
  };

  const formatTime = (totalSecs) => {
    const h = Math.floor(totalSecs / 3600);
    const m = Math.floor((totalSecs % 3600) / 60);
    const s = totalSecs % 60;
    return [h, m, s].map((v) => (v < 10 ? `0${v}` : v)).join(":");
  };

  

  // Safe fallback render line if state arrays are processing
  const currentQuestionText =
    questions[currentIndex]?.text ||
    "CALIBRATING ADVERSARIAL NEURAL MODULES...";

  return (
    <div className="w-full h-screen bg-abyss flex flex-col overflow-hidden relative select-none">
      <AbortPopup isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onConfirm={handleAbortSimulation}/>

      <div
        className={`flex flex-col h-full w-full transition-all duration-500 ${isModalOpen ? "blur-md grayscale opacity-40 pointer-events-none" : ""}`}
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-5 z-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-steel" />
          <div className="absolute top-1/2 left-0 w-full h-px bg-steel" />
        </div>

        <Navbar
          isSimulation={true}
          timeString={formatTime(seconds)}
          progressPercent={
            questions.length ? ((currentIndex + 1) / questions.length) * 100 : 0
          }
        />

        <main className="w-full max-w-7xl mx-auto px-margin-edge mt-18 h-[calc(100vh-4.5rem)] flex flex-col justify-between py-6 z-10 relative">
          {/* Top: AI Dynamic Question Module */}
          <div className="bg-panel border-l-4 border-neon-blue p-6 shadow-2xl relative overflow-hidden flex-shrink-0">
            <p className="text-steel font-metadata text-[10px] tracking-[0.3em] mb-2 uppercase font-bold">
              SEQUENCE{" "}
              {questions.length
                ? `${currentIndex + 1} / ${questions.length}`
                : "00 / 00"}
            </p>
            <h1 className="text-pure-white text-xl md:text-2xl lg:text-3xl font-black leading-snug tracking-tight uppercase">
              {currentQuestionText}
            </h1>
          </div>

          {/* Pulse Core Visualization */}
          <div className="relative flex justify-center items-center h-14 flex-shrink-0">
            <div className="w-2 h-2 bg-neon-blue rounded-full absolute shadow-[0_0_25px_4px_rgba(0,136,255,1)] animate-pulse" />
            <div className="w-10 h-10 border border-neon-blue/20 rounded-full absolute animate-ping duration-1000" />
          </div>

          {/* Mid-Lower: Workspace Frame */}
          <div className="relative group flex-1 bg-panel/30 border border-frame/40 rounded p-4 flex flex-col min-h-[180px]">
            <textarea
              value={response}
              onChange={handleTextChange}
              disabled={!questions.length}
              className="w-full flex-1 bg-transparent border-none outline-none focus:ring-0 text-steel text-base md:text-lg font-light leading-relaxed tracking-wide resize-none placeholder-steel/20"
              placeholder={
                questions.length
                  ? "Initialize response protocol stream..."
                  : "Awaiting sync stream parameters..."
              }
            />

            <div className="absolute bottom-4 right-4 flex items-center gap-2 select-none pointer-events-none">
              {isSynced ? (
                <>
                  <span className="text-success font-metadata text-[10px] tracking-widest font-bold">
                    SYNCED
                  </span>
                  <CheckCircle2 size={12} className="text-success" />
                </>
              ) : (
                <>
                  <span className="text-warning font-metadata text-[10px] tracking-widest font-bold">
                    SAVING
                  </span>
                  <RefreshCw size={12} className="text-warning animate-spin" />
                </>
              )}
            </div>
          </div>

          {/* Bottom: Sequence Controller Footers */}
          <div className="flex items-center justify-between pt-6 pb-2 flex-shrink-0">
            {/* Left Controls Container */}
            <div className="flex items-center gap-4">
              {/* Previous button only shows if we are past the first question */}
              {currentIndex > 0 && (
                <button
                  onClick={stepBackward}
                  className="text-steel hover:text-pure-white font-metadata text-xs tracking-widest uppercase transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <ArrowLeft size={12} /> <span><span className="hidden sm:inline">[</span> PREVIOUS <span className="hidden sm:inline">]</span></span>
                </button>
              )}

              {/* Abort button is now permanently visible on all question screens */}
              <button
                onClick={() => setIsModalOpen(true)}
                className="text-danger border border-danger/30 hover:border-danger hover:bg-danger/10 px-4 py-2 font-metadata text-xs tracking-widest uppercase transition-all duration-300 flex items-center gap-1.5 cursor-pointer"
              >
                <AlertTriangle size={12} /> <span><span className="hidden sm:inline">[</span> ABORT <span className="hidden sm:inline">]</span></span>
              </button>
            </div>

            {/* Right Controls Container */}
            {currentIndex < questions.length - 1 ? (
              <button
                onClick={stepForward}
                disabled={response.trim().length < 5}
                className={`flex items-center gap-2 px-6 py-3.5 border font-metadata text-xs uppercase tracking-widest transition-all duration-300 ${
                  response.trim().length < 5
                    ? "border-frame/30 text-steel/40 cursor-not-allowed"
                    : "border-neon-blue text-neon-blue hover:bg-neon-blue/10 cursor-pointer"
                }`}
              >
                <span><span className="hidden sm:inline">[</span> NEXT SEQUENCE <span className="hidden sm:inline">]</span></span> <ArrowRight size={12} />
              </button>
            ) : (
              <button
                className={`relative px-6 py-3.5 border overflow-hidden transition-all duration-300 ${
                  response.trim().length < 5
                    ? "border-frame/30 text-steel/40 cursor-not-allowed"
                    : "group border-neon-blue text-neon-blue hover:shadow-[0_0_15px_rgba(0,136,255,0.35)] cursor-pointer"
                }`}
                style={{
                  clipPath:
                    "polygon(6% 0, 100% 0, 100% 70%, 94% 100%, 0 100%, 0 30%)",
                }}
                disabled={response.trim().length < 5}
                onClick={navToReport}
              >
                <span className="relative z-10 font-metadata text-xs uppercase tracking-[0.2em] font-black group-hover:text-abyss transition-colors duration-300">
                  <span><span className="hidden sm:inline">[</span> TRANSMIT COMPLETE RESPONSE <span className="hidden sm:inline">]</span></span>
                </span>
                <div className="absolute inset-0 bg-neon-blue translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              </button>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default SimulationChamber;
