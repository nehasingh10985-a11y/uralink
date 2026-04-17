import React, { useMemo } from "react";
import ReactMarkdown from "react-markdown";
import PublicationCard from "./PublicationCard";
import TrialCard from "./TrialCard";
import ErrorCard from "./ErrorCard";
import ResearchTimeline from "./ResearchTimeline";

// --- 1. Sub-Component: Research Summary ---
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
    <div className="bg-gradient-to-br from-[#0d1117] to-[#161b22] border border-cyan-500/20 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-cyan-500/10 blur-[50px] rounded-full pointer-events-none" />
      <h3 className="text-[10px] uppercase tracking-[0.3em] text-cyan-400 font-black mb-6 flex items-center gap-2">
        <span className="w-4 h-[1px] bg-cyan-500/50" />
        Executive Research Summary
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="space-y-1">
          <p className="text-slate-500 text-[11px] font-bold uppercase tracking-tighter">
            Primary Source
          </p>
          <p className="text-slate-200 text-sm font-semibold leading-tight line-clamp-2">
            Most data originated from{" "}
            <span className="text-emerald-400">{summaryData.topJournal}</span>.
          </p>
        </div>
        <div className="space-y-1 md:border-l md:border-white/5 md:pl-6">
          <p className="text-slate-500 text-[11px] font-bold uppercase tracking-tighter">
            Field Impact
          </p>
          <p className="text-slate-200 text-sm font-semibold">
            Average of{" "}
            <span className="text-cyan-400">
              {summaryData.avgCitations} citations
            </span>{" "}
            per publication.
          </p>
        </div>
        <div className="space-y-1 md:border-l md:border-white/5 md:pl-6">
          <p className="text-slate-500 text-[11px] font-bold uppercase tracking-tighter">
            Data Recency
          </p>
          <p className="text-slate-200 text-sm font-semibold">
            Latest findings integrated up to{" "}
            <span className="text-white">{summaryData.latestYear}</span>.
          </p>
        </div>
      </div>
    </div>
  );
};

// --- 2. Sub-Component: Research Gap Analyzer ---
const ResearchGapAnalyzer = ({ analysisText }) => {
  if (!analysisText || analysisText.length < 50) return null;
  return (
    <div className="relative group overflow-hidden bg-[#0d1117] border border-amber-500/20 rounded-[2rem] p-7 shadow-2xl">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-amber-500/5 blur-[60px] rounded-full pointer-events-none" />
      <div className="flex items-start gap-5">
        <div className="p-3 bg-amber-500/10 rounded-2xl flex-shrink-0">
          <svg
            className="w-6 h-6 text-amber-500"
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
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-[10px] uppercase tracking-[0.3em] text-amber-500 font-black">
                Strategic Intelligence
              </h3>
              <p className="text-slate-100 text-lg font-bold mt-1 tracking-tight">
                Identified Research Gaps
              </p>
            </div>
            <span className="hidden md:block px-3 py-1 bg-amber-500/5 border border-amber-500/20 rounded-full text-[9px] text-amber-500 font-bold uppercase tracking-widest">
              Experimental
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="space-y-2">
              <p className="text-[10px] uppercase text-slate-500 font-bold tracking-widest flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-amber-500 rounded-full" /> Field
                Limitations
              </p>
              <div className="text-slate-400 text-[13px] leading-relaxed italic border-l-2 border-amber-500/20 pl-4 bg-white/[0.01] py-2 rounded-r-lg">
                Current evidence suggests a lack of long-term safety data. Most
                studies focus on primary outcomes.
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-[10px] uppercase text-slate-500 font-bold tracking-widest flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />{" "}
                Future Trajectory
              </p>
              <div className="text-slate-400 text-[13px] leading-relaxed border-l-2 border-emerald-500/20 pl-4 bg-white/[0.01] py-2 rounded-r-lg">
                Analysis suggests transitioning towards precision medicine and
                RWE for 2026-2027 clinical pipelines.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- 3. Main Component: MessageBubble ---
export default function MessageBubble({ msg, savedPapers, onToggleSave }) {
  const stats = useMemo(() => {
    if (!msg.publications || msg.publications.length === 0) {
      return {
        count: 0,
        years: 0,
        trialCount: msg.clinicalTrials?.length || 0,
      };
    }
    const validYears = msg.publications
      .map((p) => parseInt(p.year))
      .filter((y) => !isNaN(y));
    return {
      count: msg.publications.length,
      years: [...new Set(validYears)].length,
      trialCount: msg.clinicalTrials?.length || 0,
    };
  }, [msg.publications, msg.clinicalTrials]);

  if (msg.role === "user") {
    return (
      <div className="flex justify-end px-4 mb-6">
        <div className="bg-[#1e3a5f] text-slate-100 px-5 py-3 rounded-2xl rounded-tr-sm text-[14px] max-w-[75%] border border-blue-500/20 shadow-lg">
          {msg.text}
        </div>
      </div>
    );
  }

  if (msg.error) return <ErrorCard type={msg.error} />;
  const hasPubs = msg.publications?.length > 0;
  const hasTrials = msg.clinicalTrials?.length > 0;

  return (
    <div className="flex flex-col gap-10 px-4 py-6 animate-in fade-in duration-700">
      {/* A. Top Stats */}
      {hasPubs && (
        <div className="flex flex-wrap items-center gap-8 py-5 px-6 bg-[#0d1117] border border-white/[0.05] rounded-2xl shadow-xl">
          <div className="flex flex-col">
            <span className="text-2xl font-black text-white">
              {stats.count}
            </span>
            <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">
              Publications
            </span>
          </div>
          <div className="hidden md:block w-px h-10 bg-white/10" />
          <div className="flex flex-col">
            <span className="text-2xl font-black text-emerald-400">
              {stats.trialCount}
            </span>
            <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">
              Investigations
            </span>
          </div>
          <div className="hidden md:block w-px h-10 bg-white/10" />
          <div className="flex flex-col">
            <span className="text-2xl font-black text-cyan-400">
              {stats.years}
            </span>
            <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">
              Years Covered
            </span>
          </div>
        </div>
      )}

      {/* B. Research Summary & Gap Analyzer */}
      {hasPubs && (
        <div className="space-y-6">
          <ResearchSummary publications={msg.publications} />
          {msg.text && <ResearchGapAnalyzer analysisText={msg.text} />}
        </div>
      )}

      {/* C. Timeline */}
      {hasPubs && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start bg-[#0d1117]/50 p-6 rounded-3xl border border-white/[0.03]">
          <div className="lg:col-span-3 space-y-2">
            <p className="text-[10px] uppercase tracking-widest text-slate-400 font-black">
              Temporal Analysis
            </p>
            <p className="text-slate-500 text-[13px] leading-relaxed">
              Velocity of data distribution.
            </p>
          </div>
          <div className="lg:col-span-9">
            <ResearchTimeline publications={msg.publications} />
          </div>
        </div>
      )}

      {/* D. Evidence Library - FIXED MATCHING LOGIC */}
      {hasPubs && (
        <div className="space-y-6">
          <p className="text-[10px] uppercase tracking-[0.3em] text-slate-500 font-black border-b border-white/5 pb-4">
            Evidence Library
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {msg.publications.map((p, j) => {
              // SAFETY CHECK ADDED: comparison logic that handles missing IDs
              const isThisSaved = savedPapers?.some((s) => {
                const savedKey = s.doi || s.title;
                const currentKey = p.doi || p.title;
                return currentKey && savedKey && savedKey === currentKey;
              });

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

      {/* E. Clinical Trials */}
      {hasTrials && (
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-white/5" />
            <p className="text-[10px] uppercase tracking-[0.3em] text-emerald-500/70 font-black whitespace-nowrap">
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

      {/* F. AI Analysis Report */}
      {msg.text && (
        <div className="bg-[#0d1117] border border-white/[0.06] rounded-[32px] p-8 md:p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 blur-[100px] -z-10" />
          <p className="text-[10px] uppercase tracking-[0.4em] text-cyan-500 font-black mb-8">
            Expert Intelligence Synthesis
          </p>
          <div className="prose prose-invert prose-slate max-w-none">
            <ReactMarkdown
              components={{
                p: ({ children }) => (
                  <p className="text-slate-400 text-[15px] leading-8 mb-6 last:mb-0">
                    {children}
                  </p>
                ),
                strong: ({ children }) => (
                  <strong className="text-cyan-100 font-bold bg-cyan-500/10 px-1 rounded">
                    {children}
                  </strong>
                ),
                h2: ({ children }) => (
                  <h2 className="text-slate-200 text-lg font-bold mt-8 mb-3 border-l-4 border-cyan-500 pl-4">
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
