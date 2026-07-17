import React, { useEffect, useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RefreshCw } from "lucide-react";
import Navbar from "../components/navbar/Navbar";
import FadeInSection from "../components/ui/FadeInSection";
import InitialVerdictView from "../components/report/InitialVerdictView";
import TelemetryAndMatrixView from "../components/report/TelemetryAndMatrixView";
import QuestionTelemetryView from "../components/report/QuestionTelemetryView";
import TacticalObjectivesView from "../components/report/TacticalObjectivesView";
import { evaluationService } from "../services/evaluationService";
import { archiveService } from "../services/archiveService";
import { resetInterview } from "../redux/features/interviewSlice";

const ReportDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { sessionId: urlSessionId } = useParams();

  // Redux session ID (active interview)
  const reduxSessionId = useSelector((state) => state.interview.sessionId);

  // Use URL param if present, otherwise fall back to Redux
  const sessionId = urlSessionId ? parseInt(urlSessionId) : reduxSessionId;

  // Detect if viewing from archive
  const isArchiveView = !!urlSessionId;

  const [report, setReport] = useState(null);
  const [sessionDetail, setSessionDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!sessionId) {
      navigate("/initialize");
      return;
    }

    const fetchReportData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Fetch final report and session transcript in parallel
        const [reportData, detailData] = await Promise.all([
          evaluationService.getReport(sessionId),
          archiveService.getDetail(sessionId),
        ]);

        setReport(reportData);
        setSessionDetail(detailData);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load report.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchReportData();
  }, [sessionId, navigate]);

  // Map API response to what InitialVerdictView expects
  const verdictData = useMemo(() => {
    if (!report || !sessionDetail) return null;
    return {
      score: report.overallScore,
      status:
        sessionDetail.status ||
        (report.overallScore >= 70 ? "APPROVED" : "REVIEW_REQUIRED"),
      probability: report.probability,
      risk: report.risk,
      summary: [report.executiveSummary],
    };
  }, [report, sessionDetail]);

  // Map transcript to what QuestionTelemetryView expects
  const questionFeed = useMemo(() => {
    if (!sessionDetail) return [];
    return (sessionDetail.transcript ?? []).map((q) => ({
      sequence: String(q.questionNumber).padStart(2, "0"),
      topic: q.topic || "GENERAL",
      verdict: q.verdict || "EVALUATED",
      score: q.overallScore ?? 0,
      question: q.questionText,
      userResponse: q.userAnswer || "No answer recorded.",
      aiAnalysis: q.aiFeedback || "No feedback available.",
      directives: q.directives || [],
    }));
  }, [sessionDetail]);

  // ── Loading state ────────────────────────────────────────────
  if (isLoading) {
    return (
      <div className="w-full h-screen bg-abyss flex items-center justify-center">
        <div className="flex flex-col items-center gap-6">
          <div className="w-16 h-16 border-t-2 border-l-2 border-neon-blue rounded-full animate-spin" />
          <p className="font-mono text-xs text-steel uppercase tracking-widest animate-pulse">
            COMPILING MISSION VERDICT...
          </p>
        </div>
      </div>
    );
  }

  // ── Error state ──────────────────────────────────────────────
  if (error) {
    return (
      <div className="w-full h-screen bg-abyss flex items-center justify-center">
        <div className="text-center space-y-4 max-w-md px-6">
          <p className="font-mono text-sm text-danger uppercase tracking-wider">
            ⚠ {error}
          </p>
          <button
            onClick={() => navigate("/initialize")}
            className="border border-neon-blue text-neon-blue font-mono text-xs uppercase tracking-widest px-8 py-3 hover:bg-neon-blue/10 transition-all duration-300 cursor-pointer"
          >
            [ RETURN TO INITIALIZE ]
          </button>
        </div>
      </div>
    );
  }

  if (!report || !sessionDetail) {
    return (
      <div className="w-full h-screen bg-abyss flex items-center justify-center">
        <div className="text-center space-y-4 max-w-md px-6">
          <p className="font-mono text-sm text-steel uppercase tracking-wider">
            Unable to load report data.
          </p>
          <button
            onClick={() => navigate("/initialize")}
            className="border border-neon-blue text-neon-blue font-mono text-xs uppercase tracking-widest px-8 py-3 hover:bg-neon-blue/10 transition-all duration-300 cursor-pointer"
          >
            [ RETURN TO INITIALIZE ]
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      id="report-root"
      className="w-full h-screen bg-abyss text-pure-white overflow-hidden relative"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(26,36,54,0.15)_0%,#050b14_100%)] overflow-hidden pointer-events-none z-0" />
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-5 z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-steel" />
        <div className="absolute top-1/2 left-0 w-full h-px bg-steel" />
      </div>

      <Navbar isSimulation={false} />

      <main className="h-screen w-full overflow-y-scroll md:snap-y md:snap-mandatory overflow-x-hidden scroll-smooth mt-18">
        {/* VIEWPORT 1: Verdict Header */}
        <section className="min-h-[calc(100vh-4.5rem)] w-full flex-shrink-0 md:snap-start md:snap-always max-w-7xl mx-auto px-margin-edge flex flex-col justify-center py-6">
          <FadeInSection className="w-full space-y-8">
            <InitialVerdictView data={verdictData} />
          </FadeInSection>
        </section>

        {/* VIEWPORT 2: Skill Metrics */}
        <section className="min-h-[calc(100vh-4.5rem)] w-full flex-shrink-0 md:snap-start md:snap-always max-w-7xl mx-auto px-margin-edge flex flex-col justify-center py-6">
          <FadeInSection className="w-full">
            <TelemetryAndMatrixView
              strengths={report.strengths}
              weaknesses={report.weaknesses}
            />
          </FadeInSection>
        </section>

        {/* VIEWPORT 3+: Per-question telemetry */}
        <div className="w-full max-w-7xl mx-auto px-margin-edge relative before:absolute before:left-[11px] before:top-0 before:bottom-0 before:w-px before:bg-frame/60">
          {questionFeed.map((q, index) => (
            <section
              key={q.sequence}
              className="min-h-[calc(100vh-4.5rem)] w-full flex-shrink-0 md:snap-start md:snap-always flex flex-col justify-center"
            >
              <FadeInSection className="w-full">
                <QuestionTelemetryView
                  data={q}
                  isLast={index === questionFeed.length - 1}
                />
              </FadeInSection>
            </section>
          ))}
        </div>

        {/* FINAL VIEWPORT: Tactical objectives */}
        <section className="min-h-[calc(100vh-4.5rem)] w-full flex-shrink-0 md:snap-start md:snap-always max-w-7xl mx-auto px-margin-edge flex flex-col justify-center py-6 pb-12 md:pb-6">
          <FadeInSection className="w-full">
            <TacticalObjectivesView
              recommendations={report.recommendations}
              sessionId={sessionId}
              reportData={{
                overallScore: report.overallScore,
                probability: report.probability,
                risk: report.risk,
                executiveSummary: report.executiveSummary,
                strengths: report.strengths,
                weaknesses: report.weaknesses,
                transcript: sessionDetail.transcript,
              }}
              isArchiveView={isArchiveView}
              onNewInterview={() => {
                if (isArchiveView) {
                  navigate("/archive");
                } else {
                  dispatch(resetInterview());
                  navigate("/initialize");
                }
              }}
            />
          </FadeInSection>
        </section>
      </main>
    </div>
  );
};

export default ReportDashboard;
