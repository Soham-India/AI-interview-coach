import React from "react";
import Navbar from "../components/navbar/Navbar";
import FadeInSection from "../components/ui/FadeInSection";
import AnalyticsHeroView from "../components/analytics/AnalyticsHeroView";
import AnalyticsSkillsView from "../components/analytics/AnalyticsSkillsView";
import AnalyticsDistributionView from "../components/analytics/AnalyticsDistributionView";
import AnalyticsInsightsView from "../components/analytics/AnalyticsInsightsView";
import AnalyticsVerdictView from "../components/analytics/AnalyticsVerdictView";

const MOCK_ANALYTICS_SUMMARY = {
  totalInterviews: 24,
  averageScore: 87,
  bestPerformance: 96,
  successRate: 78,
  timelinePoints: [
    { label: "SESSION 01", x: 0, y: 320, score: 76 },
    { label: "SESSION 06", x: 250, y: 260, score: 84 },
    { label: "SESSION 12", x: 500, y: 240, score: 88 },
    { label: "SESSION 18", x: 750, y: 210, score: 92 },
    { label: "CURRENT", x: 1000, y: 160, score: 96 }
  ]
};

// ... your existing imports

const AnalyticsDashboard = () => {
  return (
    <div className="w-full h-screen bg-abyss text-pure-white overflow-hidden relative selection:bg-neon-blue selection:text-abyss">
      
      <div className="absolute inset-0 wireframe-grid opacity-20 pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050b14_95%)] pointer-events-none z-0" />
      
      <Navbar isSimulation={false} />

      {/* CHANGED: Changed h-screen to h-[calc(100vh-4.5rem)] to match section heights perfectly */}
      <main className="h-[calc(100vh-4.5rem)] w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth mt-18 relative z-10">
        
        {/* VIEWPORT 1 */}
        <section className="h-[calc(100vh-4.5rem)] w-full flex-shrink-0 snap-start snap-always max-w-7xl mx-auto px-margin-edge flex flex-col justify-center py-4">
          <FadeInSection className="w-full">
            <AnalyticsHeroView data={MOCK_ANALYTICS_SUMMARY} />
          </FadeInSection>
        </section>

        {/* VIEWPORT 2 */}
        <section className="h-[calc(100vh-4.5rem)] w-full flex-shrink-0 snap-start snap-always max-w-7xl mx-auto px-margin-edge flex flex-col justify-center py-4">
          <FadeInSection className="w-full">
            <AnalyticsSkillsView />
          </FadeInSection>
        </section>

        {/* VIEWPORT 3 */}
        <section className="h-[calc(100vh-4.5rem)] w-full flex-shrink-0 snap-start snap-always max-w-7xl mx-auto px-margin-edge flex flex-col justify-center py-4">
          <FadeInSection className="w-full">
            <AnalyticsDistributionView />
          </FadeInSection>
        </section>

        {/* VIEWPORT 4 */}
        <section className="h-[calc(100vh-4.5rem)] w-full flex-shrink-0 snap-start snap-always max-w-7xl mx-auto px-margin-edge flex flex-col justify-center py-4">
          <FadeInSection className="w-full">
            <AnalyticsInsightsView />
          </FadeInSection>
        </section>

        {/* VIEWPORT 5 */}
        <section className="h-[calc(100vh-4.5rem)] w-full flex-shrink-0 snap-start snap-always relative">
          <FadeInSection className="w-full h-full">
            <AnalyticsVerdictView />
          </FadeInSection>
        </section>

      </main>
    </div>
  );
};

export default AnalyticsDashboard;