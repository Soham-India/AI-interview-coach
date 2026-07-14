import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar/Navbar";
import FadeInSection from "../components/ui/FadeInSection";
import AnalyticsHeroView from "../components/analytics/AnalyticsHeroView";
import AnalyticsInsightsView from "../components/analytics/AnalyticsInsightsView";
import AnalyticsVerdictView from "../components/analytics/AnalyticsVerdictView";
import AnalyticsSkillsView from "../components/analytics/AnalyticsSkillsView";
import AnalyticsDistributionView from "../components/analytics/AnalyticsDistributionView";
import { analyticsService } from "../services/analyticsService";

const AnalyticsDashboard = () => {
    const [summary, setSummary] = useState(null);
    const [skills, setSkills] = useState(null);
    const [distribution, setDistribution] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAnalytics = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const [summaryData, skillsData, distributionData] = await Promise.all([
                    analyticsService.getSummary(),
                    analyticsService.getSkills(),
                    analyticsService.getDistribution(),
                ]);
                setSummary(summaryData);
                setSkills(skillsData);
                setDistribution(distributionData);
            } catch (err) {
                setError(err.response?.data?.message || "Failed to load analytics.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchAnalytics();
    }, []);

    if (isLoading) {
        return (
            <div className="w-full h-screen bg-abyss flex items-center justify-center">
                <div className="flex flex-col items-center gap-6">
                    <div className="w-16 h-16 border-t-2 border-l-2 border-neon-blue rounded-full animate-spin" />
                    <p className="font-mono text-xs text-steel uppercase tracking-widest animate-pulse">
                        LOADING TELEMETRY STREAM...
                    </p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full h-screen bg-abyss flex items-center justify-center">
                <p className="font-mono text-sm text-danger uppercase tracking-wider">⚠ {error}</p>
            </div>
        );
    }

    if (summary?.totalInterviews === 0) {
        return (
            <div className="w-full h-screen bg-abyss text-pure-white overflow-hidden relative">
                <div className="absolute inset-0 wireframe-grid opacity-20 pointer-events-none z-0" />
                <Navbar isSimulation={false} />
                <div className="h-[calc(100vh-4.5rem)] mt-18 flex flex-col items-center justify-center gap-6">
                    <p className="font-mono text-xs text-steel uppercase tracking-widest">
                        // NO SIMULATION CYCLES RECORDED
                    </p>
                    <p className="font-mono text-[10px] text-steel/40 uppercase tracking-widest">
                        Complete your first interview to unlock analytics
                    </p>
                </div>
            </div>
        );
    }

    const heroData = {
        totalInterviews: summary.totalInterviews,
        averageScore: summary.averageScore,
        bestPerformance: summary.bestScore,
        successRate: summary.successRate,
        timelinePoints: summary.timeline.map((point, index) => ({
            label: point.label,
            x: index * (1000 / Math.max(summary.timeline.length - 1, 1)),
            y: 400 - (point.score / 100) * 360,
            score: point.score,
        })),
    };

    const skillsData = [
        { name: "Technical Depth", targetValue: skills.technicalScore },
        { name: "Communication", targetValue: skills.communicationScore },
        { name: "Confidence", targetValue: skills.confidenceScore },
        { name: "Structure", targetValue: skills.structureScore },
    ];

    return (
        <div className="w-full h-screen bg-abyss text-pure-white overflow-hidden relative selection:bg-neon-blue selection:text-abyss">
            <div className="absolute inset-0 wireframe-grid opacity-20 pointer-events-none z-0" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050b14_95%)] pointer-events-none z-0" />

            <Navbar isSimulation={false} />

            <main className="h-[calc(100vh-4.5rem)] w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth mt-18 relative z-10">

                {/* VIEWPORT 1: Hero metrics + timeline chart */}
                <section className="h-[calc(100vh-4.5rem)] w-full flex-shrink-0 snap-start snap-always max-w-7xl mx-auto px-margin-edge flex flex-col justify-center py-4">
                    <FadeInSection className="w-full">
                        <AnalyticsHeroView data={heroData} />
                    </FadeInSection>
                </section>

                {/* VIEWPORT 2: Skills */}
                <section className="h-[calc(100vh-4.5rem)] w-full flex-shrink-0 snap-start snap-always max-w-7xl mx-auto px-margin-edge py-4 flex flex-col justify-center">
                    <FadeInSection className="w-full h-full flex flex-col justify-center">
                        <AnalyticsSkillsView skills={skillsData} />
                    </FadeInSection>
                </section>

                {/* VIEWPORT 3: Distribution */}
                <section className="h-[calc(100vh-4.5rem)] w-full flex-shrink-0 snap-start snap-always max-w-7xl mx-auto px-margin-edge py-4 flex flex-col justify-center">
                    <FadeInSection className="w-full h-full flex flex-col justify-center">
                        <AnalyticsDistributionView distribution={distribution} />
                    </FadeInSection>
                </section>

                {/* VIEWPORT 3: AI Insights */}
                <section className="h-[calc(100vh-4.5rem)] w-full flex-shrink-0 snap-start snap-always max-w-7xl mx-auto px-margin-edge flex flex-col justify-center py-4">
                    <FadeInSection className="w-full">
                        <AnalyticsInsightsView
                            averageScore={summary.averageScore}
                            totalInterviews={summary.totalInterviews}
                        />
                    </FadeInSection>
                </section>

                {/* VIEWPORT 4: Verdict CTA */}
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