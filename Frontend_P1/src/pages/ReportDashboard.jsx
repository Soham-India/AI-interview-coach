import React from "react";
import Navbar from "../components/navbar/Navbar";
import FadeInSection from "../components/ui/FadeInSection";
import InitialVerdictView from "../components/report/InitialVerdictView";
import TelemetryAndMatrixView from "../components/report/TelemetryAndMatrixView";
import QuestionTelemetryView from "../components/report/QuestionTelemetryView";
import TacticalObjectivesView from "../components/report/TacticalObjectivesView"; // <-- Import the final section

const MOCK_DOSSIER_DATA = {
  score: 94,
  status: "APPROVED",
  probability: "HIGH_CONF",
  risk: "LOW_RISK",
  summary: [
    "Candidate demonstrated exceptional systems thinking, clear communication under pressure, and strong architectural decision-making. Weaknesses were primarily observed in distributed transaction management and rollback strategy planning.",
    "The cognitive map suggests a preference for monolithic-to-microservices transitional architectures with a high degree of safety awareness, though edge-case failure modes require deeper tactical refinement."
  ]
};

const MOCK_QUESTIONS_FEED = [
  {
    sequence: "01",
    topic: "SYSTEM_SCALING",
    verdict: "STRONG ARCHITECTURAL REASONING",
    score: 9.2,
    question: "Describe a situation where you had to refactor a legacy monolithic application into microservices.",
    userResponse: "I would identify bounded contexts, gradually extract services using the Strangler Fig pattern, and maintain compatibility during migration.",
    aiAnalysis: "Strong architectural reasoning and clear understanding of migration patterns. Demonstrated senior-level thinking around risk reduction via phased decoupling protocols.",
    directives: ["Mention system monitoring strategy.", "Discuss rollback data synchronizations.", "Include execution performance metrics."]
  },
  {
    sequence: "02",
    topic: "DISTRIBUTED_SYSTEMS",
    verdict: "LACKED PRACTICAL ARCHITYPES",
    score: 4.1,
    question: "How do you handle distributed transactions across multiple services without using two-phase commit?",
    userResponse: "I would use asynchronous messaging and retries between services to maintain eventual consistency.",
    aiAnalysis: "The response correctly identified eventual consistency benchmarks but failed to explicitly evaluate Saga orchestration patterns, compensating loops, or idempotent keys.",
    directives: ["Deeply study Saga Orchestration vs Choreography.", "Map explicit compensating transaction logic.", "Understand token idempotency keys."]
  }
];

const ReportDashboard = () => {
  return (
    <div className="w-full h-screen bg-abyss text-pure-white overflow-hidden relative">
      {/* Immersive radial layout tracking matrix fields */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(26,36,54,0.15)_0%,#050b14_100%)] overflow-hidden pointer-events-none z-0" />
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-5 z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-steel" />
        <div className="absolute top-1/2 left-0 w-full h-px bg-steel" />
      </div>

      <Navbar isSimulation={false} />

      {/* Main Snap Scroller Container Pipeline */}
      <main className="h-screen w-full overflow-y-scroll snap-y snap-mandatory overflow-x-hidden scroll-smooth mt-18">
        
        {/* VIEWPORT 1: Verdict Header Summary */}
        <section className="h-auto min-h-[calc(100vh-4.5rem)] md:h-[calc(100vh-4.5rem)] w-full flex-shrink-0 snap-start snap-always max-w-7xl mx-auto px-margin-edge flex flex-col justify-center py-6">
          <FadeInSection className="w-full space-y-8">
            <InitialVerdictView data={MOCK_DOSSIER_DATA} />
          </FadeInSection>
        </section>

        {/* VIEWPORT 2: Skill Metrix Metrics Grid */}
        <section className="h-auto min-h-[calc(100vh-4.5rem)] md:h-[calc(100vh-4.5rem)] w-full flex-shrink-0 snap-start snap-always max-w-7xl mx-auto px-margin-edge flex flex-col justify-center py-6">
          <FadeInSection className="w-full">
            <TelemetryAndMatrixView />
          </FadeInSection>
        </section>

        {/* VIEWPORT 3 LOOP: Sequenced Timeline Evaluation Nodes */}
        <div className="w-full max-w-7xl mx-auto px-margin-edge relative before:absolute before:left-[11px] before:top-0 before:bottom-0 before:w-px before:bg-frame/60">
          {MOCK_QUESTIONS_FEED.map((q, index) => (
            <section 
              key={q.sequence} 
              className="h-auto min-h-[calc(100vh-4.5rem)] md:h-[calc(100vh-4.5rem)] w-full flex-shrink-0 snap-start snap-always flex flex-col justify-center"
            >
              <FadeInSection className="w-full">
                <QuestionTelemetryView 
                  data={q} 
                  isLast={index === MOCK_QUESTIONS_FEED.length - 1} 
                />
              </FadeInSection>
            </section>
          ))}
        </div>

        {/* VIEWPORT 4: Tactical Action Targets & Command Links */}
        <section className="h-auto min-h-[calc(100vh-4.5rem)] md:h-[calc(100vh-4.5rem)] w-full flex-shrink-0 snap-start snap-always max-w-7xl mx-auto px-margin-edge flex flex-col justify-center py-6 pb-12 md:pb-6">
          <FadeInSection className="w-full">
            <TacticalObjectivesView />
          </FadeInSection>
        </section>

      </main>
    </div>
  );
};

export default ReportDashboard;