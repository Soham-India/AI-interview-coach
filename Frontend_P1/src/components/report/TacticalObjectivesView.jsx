import React, { useState } from "react";
import { Rocket, Shield, History, PlusCircle, Download, RefreshCw } from "lucide-react";
import jsPDF from "jspdf";

const ICON_MAP = {
    0: <Rocket size={28} className="text-neon-blue" />,
    1: <Shield size={28} className="text-neon-blue" />,
    2: <History size={28} className="text-neon-blue" />,
};

const TacticalObjectivesView = ({
    recommendations = [],
    onNewInterview,
    sessionId,
    reportData,
    isArchiveView = false,
}) => {
    const [isExporting, setIsExporting] = useState(false);
    const [exportError, setExportError] = useState(null);

    const handleExportPDF = async () => {
        setIsExporting(true);
        setExportError(null);

        try {
            const pdf = new jsPDF({
                orientation: "portrait",
                unit: "mm",
                format: "a4",
            });

            const pageWidth = pdf.internal.pageSize.getWidth();
            const pageHeight = pdf.internal.pageSize.getHeight();
            const margin = 20;
            const contentWidth = pageWidth - margin * 2;
            let y = margin;

            // ── Helper functions ─────────────────────────────────
            const checkPageBreak = (neededHeight) => {
                if (y + neededHeight > pageHeight - margin) {
                    pdf.addPage();
                    y = margin;
                }
            };

            const drawLine = (color = [30, 40, 55]) => {
                pdf.setDrawColor(...color);
                pdf.setLineWidth(0.3);
                pdf.line(margin, y, pageWidth - margin, y);
                y += 4;
            };

            const addLabel = (text, size = 7, color = [100, 120, 150]) => {
                pdf.setFontSize(size);
                pdf.setTextColor(...color);
                pdf.setFont("helvetica", "bold");
                pdf.text(text.toUpperCase(), margin, y);
                y += 5;
            };

            const addHeading = (text, size = 18, color = [220, 230, 240]) => {
                checkPageBreak(size / 2 + 6);
                pdf.setFontSize(size);
                pdf.setTextColor(...color);
                pdf.setFont("helvetica", "bold");
                pdf.text(text.toUpperCase(), margin, y);
                y += size / 2 + 4;
            };

            const addBody = (text, size = 9, color = [160, 175, 190]) => {
                pdf.setFontSize(size);
                pdf.setTextColor(...color);
                pdf.setFont("helvetica", "normal");
                const lines = pdf.splitTextToSize(text, contentWidth);
                checkPageBreak(lines.length * (size / 2 + 1.5) + 4);
                pdf.text(lines, margin, y);
                y += lines.length * (size / 2 + 1.5) + 4;
            };

            const addBullet = (text, color = [160, 175, 190]) => {
                pdf.setFontSize(8.5);
                pdf.setTextColor(...color);
                pdf.setFont("helvetica", "normal");
                const lines = pdf.splitTextToSize(`• ${text}`, contentWidth - 4);
                checkPageBreak(lines.length * 5 + 2);
                pdf.text(lines, margin + 2, y);
                y += lines.length * 5 + 2;
            };

            const addSpacing = (amount = 6) => { y += amount; };

            // ── Dark background ──────────────────────────────────
            pdf.setFillColor(5, 11, 20);
            pdf.rect(0, 0, pageWidth, pageHeight, "F");

            // ── Header ───────────────────────────────────────────
            pdf.setFillColor(10, 18, 31);
            pdf.rect(0, 0, pageWidth, 28, "F");

            pdf.setFontSize(7);
            pdf.setTextColor(0, 136, 255);
            pdf.setFont("helvetica", "bold");
            pdf.text("INTERVIEW AI // MISSION_VERDICT_REPORT.EXEC", margin, 10);

            pdf.setFontSize(7);
            pdf.setTextColor(80, 100, 130);
            pdf.text(
                `SESSION: ${sessionId || "UNKNOWN"} // ${new Date().toLocaleDateString("en-GB")}`,
                margin,
                17
            );

            // Score
            if (reportData?.overallScore != null) {
                pdf.setFontSize(28);
                pdf.setTextColor(0, 136, 255);
                pdf.setFont("helvetica", "bold");
                pdf.text(`${reportData.overallScore}`, pageWidth - margin, 18, { align: "right" });

                pdf.setFontSize(7);
                pdf.setTextColor(80, 100, 130);
                pdf.text("READINESS INDEX", pageWidth - margin, 24, { align: "right" });
            }

            y = 36;
            drawLine([0, 136, 255]);
            addSpacing(2);

            // ── Status tags ──────────────────────────────────────
            if (reportData) {
                const tags = [
                    { label: "AUTH_STATUS", value: reportData.overallScore >= 70 ? "APPROVED" : "REVIEW_REQUIRED", color: reportData.overallScore >= 70 ? [16, 185, 129] : [239, 68, 68] },
                    { label: "PROBABILITY", value: reportData.probability || "N/A", color: [0, 136, 255] },
                    { label: "THREAT_LEVEL", value: reportData.risk || "N/A", color: [220, 230, 240] },
                ];

                const tagWidth = contentWidth / 3;
                tags.forEach((tag, i) => {
                    const x = margin + i * tagWidth;
                    pdf.setFillColor(13, 20, 32);
                    pdf.rect(x, y, tagWidth - 2, 14, "F");
                    pdf.setFontSize(6);
                    pdf.setTextColor(80, 100, 130);
                    pdf.setFont("helvetica", "bold");
                    pdf.text(tag.label, x + 3, y + 5);
                    pdf.setFontSize(8);
                    pdf.setTextColor(...tag.color);
                    pdf.text(tag.value, x + 3, y + 11);
                });

                y += 20;
                addSpacing(2);
            }

            // ── Executive Summary ────────────────────────────────
            if (reportData?.executiveSummary) {
                drawLine();
                addLabel("[ NEURAL_MAP ] EXECUTIVE ANALYSIS", 7, [0, 136, 255]);
                addSpacing(2);
                addBody(reportData.executiveSummary, 9, [160, 175, 190]);
                addSpacing(4);
            }

            // ── Strengths ────────────────────────────────────────
            if (reportData?.strengths?.length > 0) {
                drawLine();
                addLabel("STRENGTH_NODES", 7, [16, 185, 129]);
                addSpacing(2);
                reportData.strengths.forEach((s) => addBullet(s, [140, 200, 160]));
                addSpacing(4);
            }

            // ── Weaknesses ───────────────────────────────────────
            if (reportData?.weaknesses?.length > 0) {
                drawLine();
                addLabel("EXPOSED_VULNERABILITIES", 7, [239, 68, 68]);
                addSpacing(2);
                reportData.weaknesses.forEach((w) => addBullet(w, [200, 140, 140]));
                addSpacing(4);
            }

            // ── Per-question transcript ──────────────────────────
            if (reportData?.transcript?.length > 0) {
                drawLine([0, 136, 255]);
                addLabel("QUESTION TELEMETRY TRANSCRIPT", 7, [0, 136, 255]);
                addSpacing(4);

                reportData.transcript.forEach((q, idx) => {
                    checkPageBreak(40);

                    // Question header
                    pdf.setFillColor(10, 18, 31);
                    pdf.rect(margin, y, contentWidth, 8, "F");

                    pdf.setFontSize(7);
                    pdf.setTextColor(0, 136, 255);
                    pdf.setFont("helvetica", "bold");
                    pdf.text(
                        `SEQUENCE_${String(idx + 1).padStart(2, "0")} // ${q.topic || "GENERAL"}`,
                        margin + 3,
                        y + 5.5
                    );

                    if (q.overallScore != null) {
                        pdf.setTextColor(0, 136, 255);
                        pdf.text(
                            `SCORE: ${parseFloat(q.overallScore).toFixed(1)}`,
                            pageWidth - margin - 3,
                            y + 5.5,
                            { align: "right" }
                        );
                    }

                    y += 10;

                    // Verdict
                    if (q.verdict) {
                        pdf.setFontSize(9);
                        pdf.setTextColor(220, 230, 240);
                        pdf.setFont("helvetica", "bold");
                        const vLines = pdf.splitTextToSize(q.verdict.toUpperCase(), contentWidth);
                        pdf.text(vLines, margin, y);
                        y += vLines.length * 5 + 2;
                    }

                    // Question text
                    addLabel("QUESTION PROTOCOL", 6.5, [80, 100, 130]);
                    addBody(q.questionText || "", 8.5, [160, 175, 190]);

                    // User answer
                    if (q.userAnswer) {
                        addLabel("YOUR RESPONSE", 6.5, [0, 136, 255]);
                        addBody(q.userAnswer, 8.5, [130, 155, 175]);
                    }

                    // AI feedback
                    if (q.aiFeedback) {
                        addLabel("AI STRUCTURAL ANALYSIS", 6.5, [16, 185, 129]);
                        addBody(q.aiFeedback, 8.5, [130, 175, 150]);
                    }

                    // Directives
                    if (q.directives?.length > 0) {
                        addLabel("IMPROVEMENT DIRECTIVES", 6.5, [239, 68, 68]);
                        q.directives.forEach((d) => addBullet(d, [200, 140, 140]));
                    }

                    addSpacing(6);
                    drawLine([26, 36, 54]);
                    addSpacing(4);
                });
            }

            // ── Tactical objectives ──────────────────────────────
            if (recommendations.length > 0) {
                checkPageBreak(30);
                drawLine([0, 136, 255]);
                addLabel("TACTICAL_OBJECTIVES.EXE", 7, [0, 136, 255]);
                addSpacing(4);
                recommendations.forEach((rec, idx) => {
                    addLabel(`OBJ_0${idx + 1}`, 6.5, [0, 136, 255]);
                    addBody(rec, 9, [220, 230, 240]);
                    addSpacing(2);
                });
            }

            // ── Footer on every page ─────────────────────────────
            const totalPages = pdf.internal.getNumberOfPages();
            for (let i = 1; i <= totalPages; i++) {
                pdf.setPage(i);
                pdf.setFillColor(5, 11, 20);
                pdf.rect(0, pageHeight - 10, pageWidth, 10, "F");
                pdf.setFontSize(6);
                pdf.setTextColor(50, 70, 90);
                pdf.setFont("helvetica", "normal");
                pdf.text(
                    `INTERVIEW_AI_SYSTEMS // CONFIDENTIAL // PAGE ${i} OF ${totalPages}`,
                    pageWidth / 2,
                    pageHeight - 4,
                    { align: "center" }
                );
                // Re-fill dark bg on each page
                if (i > 1) {
                    pdf.setFillColor(5, 11, 20);
                    pdf.rect(0, 0, pageWidth, pageHeight - 10, "F");
                }
            }

            const filename = `interview-report-${sessionId || Date.now()}.pdf`;
            pdf.save(filename);

        } catch (err) {
            console.error("PDF export failed:", err);
            setExportError("Export failed. Please try again.");
        } finally {
            setIsExporting(false);
        }
    };

    const objectives = recommendations.slice(0, 3).map((rec, idx) => ({
        id: `OBJ_0${idx + 1}`,
        icon: ICON_MAP[idx] || <Rocket size={28} className="text-neon-blue" />,
        title: rec,
        label: "MISSION",
    }));

    return (
        <div className="w-full h-full flex flex-col justify-between py-4 space-y-12">

            <div className="w-full">
                <div className="flex items-center space-x-4 mb-8 select-none">
                    <h4 className="font-mono text-xs text-steel uppercase tracking-[0.4em] font-bold">
                        TACTICAL_OBJECTIVES.EXE
                    </h4>
                    <div className="h-px flex-grow bg-frame/60" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-frame border border-frame">
                    {objectives.length > 0 ? (
                        objectives.map((obj) => (
                            <div
                                key={obj.id}
                                className="p-6 md:p-8 bg-panel/40 flex flex-col items-start space-y-6 hover:bg-neon-blue/5 transition-all duration-300 group"
                            >
                                <div className="text-neon-blue/50 font-mono text-[10px] font-bold tracking-widest select-none">
                                    {obj.id}
                                </div>
                                <div className="p-3 bg-abyss/40 border border-frame group-hover:border-neon-blue/40 transition-colors duration-300">
                                    {obj.icon}
                                </div>
                                <div className="font-mono">
                                    <div className="text-[10px] text-steel mb-1 font-bold tracking-wider select-none">
                                        {obj.label}
                                    </div>
                                    <div className="text-base md:text-lg text-pure-white uppercase font-black tracking-tight leading-snug">
                                        {obj.title}
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-3 p-8 text-center font-mono text-xs text-steel/50 uppercase tracking-widest">
                            // NO TACTICAL OBJECTIVES AVAILABLE
                        </div>
                    )}
                </div>
            </div>

            {exportError && (
                <div className="border border-danger/40 bg-danger/10 px-4 py-2 font-mono text-xs text-danger uppercase tracking-wider text-center">
                    ⚠ {exportError}
                </div>
            )}

            <div className="flex flex-col sm:flex-row justify-center items-center gap-6 pt-8 border-t border-frame/60 w-full">
                <button
                    onClick={onNewInterview}
                    className="w-full sm:w-auto px-10 h-14 bg-neon-blue text-abyss font-mono text-xs font-black uppercase tracking-widest hover:bg-pure-white hover:text-ink transition-all duration-300 button-cut flex items-center justify-center gap-3 cursor-pointer shadow-[0_0_30px_rgba(0,136,255,0.2)]"
                >
                    <PlusCircle size={16} strokeWidth={2.5} />
                    {isArchiveView ? "BACK TO ARCHIVE" : "NEW_INTERVIEW"}
                </button>

                <button
                    onClick={handleExportPDF}
                    disabled={isExporting}
                    className="w-full sm:w-auto px-10 h-14 border border-frame text-steel font-mono text-xs font-bold uppercase tracking-widest hover:text-pure-white hover:border-pure-white transition-all duration-300 button-cut flex items-center justify-center gap-3 cursor-pointer bg-panel/20 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                    {isExporting ? (
                        <>
                            <RefreshCw size={16} strokeWidth={2} className="animate-spin" />
                            GENERATING PDF...
                        </>
                    ) : (
                        <>
                            <Download size={16} strokeWidth={2} />
                            EXPORT_ARCHIVE
                        </>
                    )}
                </button>
            </div>
        </div>
    );
};

export default TacticalObjectivesView;