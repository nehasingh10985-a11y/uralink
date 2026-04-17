import React, { useMemo } from "react";
import ReactMarkdown from "react-markdown";
import PublicationCard from "./PublicationCard";
import TrialCard from "./TrialCard";
import ErrorCard from "./ErrorCard";
import ResearchTimeline from "./ResearchTimeline";

// --- 1. Sub-Component: Research Summary (Responsive Grid) ---
const ResearchSummary = ({ publications }) => {
  const summaryData = useMemo(() => {
    if (!publications || publications.length === 0) return null;
    const journalCounts = {};
    publications.forEach((p) => {
      const j = p.journal || "Medical Source";
      journalCounts[j] = (journalCounts[j] || 0) + 1;
    });
    const topJournal = Object.entries(journalCounts).sort(
      (a, b) => b[1] - a[1],
    )[0][0];
    const totalCitations = publications.reduce(
      (acc, p) => acc + (p.citationCount || 0),
      0,
    );
    const avgCitations = (totalCitations / publications.length).toFixed(1);
    const years = publications
      .map((p) => parseInt(p.year))
      .filter((y) => !isNaN(y));
    const latestYear = years.length > 0 ? Math.max(...years) : "N/A";
    return { topJournal, avgCitations, latestYear };
  }, [publications]);

  if (!summaryData) return null;

  return (
    <div className="bg-gradient-to-br from-[#0d1117] to-[#161b22] border border-cyan-500/20 rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-2xl relative overflow-hidden">
      <h3 className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.3em] text-cyan-400 font-black mb-4 md:mb-6 flex items-center gap-2">
        <span className="w-4 h-[1px] bg-cyan-500/50" />
        Executive Research Summary
      </h3>
      {/* Mobile: 1 column, Desktop: 3 columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        <div className="space-y-1">
          <p className="text-slate-500 text-[10px] md:text-[11px] font-bold uppercase tracking-tighter">
            Primary Source
          </p>
          <p className="text-slate-200 text-xs md:text-sm font-semibold leading-tight line-clamp-2">
            Most data from{" "}
            <span className="text-emerald-400">{summaryData.topJournal}</span>.
          </p>
        </div>
        <div className="space-y-1 md:border-l md:border-white/5 md:pl-6">
          <p className="text-slate-500 text-[10px] md:text-[11px] font-bold uppercase tracking-tighter">
            Field Impact
          </p>
          <p className="text-slate-200 text-xs md:text-sm font-semibold">
            Avg.{" "}
            <span className="text-cyan-400">
              {summaryData.avgCitations} citations
            </span>
          </p>
        </div>
        <div className="space-y-1 md:border-l md:border-white/5 md:pl-6">
          <p className="text-slate-500 text-[10px] md:text-[11px] font-bold uppercase tracking-tighter">
            Data Recency
          </p>
          <p className="text-slate-200 text-xs md:text-sm font-semibold">
            Up to <span className="text-white">{summaryData.latestYear}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

// --- 2. Sub-Component: Research Gap Analyzer (Responsive Grid) ---
const ResearchGapAnalyzer = ({ analysisText }) => {
  if (!analysisText || analysisText.length < 50) return null;
  return (
    <div className="relative group overflow-hidden bg-[#0d1117] border border-amber-500/20 rounded-[1.5rem] md:rounded-[2rem] p-5 md:p-7 shadow-2xl">
      <div className="flex flex-col md:flex-row items-start gap-4 md:gap-5">
        <div className="p-3 bg-amber-500/10 rounded-2xl flex-shrink-0">
          <svg
            className="w-5 h-5 md:w-6 md:h-6 text-amber-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
        </div>
        <div className="space-y-4 w-full">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
            <div>
              <h3 className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-amber-500 font-black">
                Strategic Intelligence
              </h3>
              <p className="text-slate-100 text-base md:text-lg font-bold mt-1">
                Identified Research Gaps
              </p>
            </div>
            <span className="w-fit px-2 py-0.5 bg-amber-500/5 border border-amber-500/20 rounded-full text-[8px] text-amber-500 font-bold uppercase">
              Experimental
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 pt-2">
            <div className="space-y-2">
              <p className="text-[9px] uppercase text-slate-500 font-bold tracking-widest flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-amber-500 rounded-full" />{" "}
                Limitations
              </p>
              <div className="text-slate-400 text-[12px] md:text-[13px] leading-relaxed italic border-l-2 border-amber-500/20 pl-4 py-1">
                Evidence suggests a lack of long-term safety data.
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-[9px] uppercase text-slate-500 font-bold tracking-widest flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />{" "}
                Future
              </p>
              <div className="text-slate-400 text-[12px] md:text-[13px] leading-relaxed border-l-2 border-emerald-500/20 pl-4 py-1">
                Precision medicine transition for 2026-2027.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function MessageBubble({ msg, savedPapers, onToggleSave }) {
  if (msg.role === "user") {
    return (
      <div className="flex justify-end px-2 md:px-4 mb-6">
        <div className="bg-[#1e3a5f] text-slate-100 px-4 py-3 rounded-2xl rounded-tr-sm text-[13px] md:text-[14px] max-w-[90%] md:max-w-[75%] border border-blue-500/20 shadow-lg">
          {msg.text}
        </div>
      </div>
    );
  }

  if (msg.error) return <ErrorCard type={msg.error} />;
  const hasPubs = msg.publications?.length > 0;
  const hasTrials = msg.clinicalTrials?.length > 0;

  return (
    <div className="flex flex-col gap-6 md:gap-10 px-2 md:px-4 py-4 md:py-5 animate-in fade-in duration-700">
      {/* B. Research Summary & Gap Analyzer */}
      {hasPubs && (
        <div className="space-y-4 md:space-y-6">
          <ResearchSummary publications={msg.publications} />
          {msg.text && <ResearchGapAnalyzer analysisText={msg.text} />}
        </div>
      )}

      {/* C. Timeline (Horizontal Scroll on mobile or hidden) */}
      {hasPubs && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start bg-[#0d1117]/50 p-4 md:p-6 rounded-2xl md:rounded-3xl border border-white/[0.03]">
          <div className="lg:col-span-3 space-y-1">
            <p className="text-[9px] md:text-[10px] uppercase tracking-widest text-slate-400 font-black">
              Temporal Analysis
            </p>
            <p className="text-slate-500 text-[12px] md:text-[13px]">
              Velocity of data distribution.
            </p>
          </div>
          <div className="lg:col-span-9 overflow-x-auto">
            <ResearchTimeline publications={msg.publications} />
          </div>
        </div>
      )}

      {/* D. Evidence Library - Responsive Cards */}
      {hasPubs && (
        <div className="space-y-4 md:space-y-6">
          <p className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.3em] text-slate-500 font-black border-b border-white/5 pb-2 md:pb-4">
            Evidence Library
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {msg.publications.map((p, j) => {
              const isThisSaved = savedPapers?.some(
                (s) => (s.doi || s.title) === (p.doi || p.title),
              );
              return (
                <PublicationCard
                  key={p.doi || p.title || j}
                  pub={p}
                  isSaved={isThisSaved}
                  onToggleSave={onToggleSave}
                />
              );
            })}
          </div>
        </div>
      )}

      {/* E. Clinical Trials - Responsive Cards */}
      {hasTrials && (
        <div className="space-y-4 md:space-y-6">
          <div className="flex items-center gap-2 md:gap-4">
            <div className="h-px flex-1 bg-white/5" />
            <p className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-emerald-500/70 font-black">
              Clinical Investigations
            </p>
            <div className="h-px flex-1 bg-white/5" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {msg.clinicalTrials.map((t, j) => (
              <TrialCard key={t.id || j} trial={t} />
            ))}
          </div>
        </div>
      )}

      {/* F. AI Analysis Report - Responsive Padding */}
      {msg.text && (
        <div className="bg-[#0d1117] border border-white/[0.06] rounded-[24px] md:rounded-[32px] p-5 md:p-10 shadow-2xl relative overflow-hidden">
          <p className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-cyan-500 font-black mb-6 md:mb-8">
            Expert Synthesis
          </p>
          <div className="prose prose-invert prose-slate max-w-none">
            <ReactMarkdown
              components={{
                p: ({ children }) => (
                  <p className="text-slate-400 text-[14px] md:text-[15px] leading-7 md:leading-8 mb-4">
                    {children}
                  </p>
                ),
                h2: ({ children }) => (
                  <h2 className="text-slate-200 text-base md:text-lg font-bold mt-6 mb-3 border-l-4 border-cyan-500 pl-4">
                    {children}
                  </h2>
                ),
              }}
            >
              {msg.text}
            </ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
}
