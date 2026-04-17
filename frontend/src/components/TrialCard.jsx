import React from "react";

const LocationIcon = () => (
  <svg
    className="w-3.5 h-3.5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);

export default function TrialCard({ trial }) {
  const status = trial.status?.toLowerCase() || "";
  const isRecruiting =
    status.includes("recruiting") || status.includes("active");
  const nctId = trial.nctId || trial.id;
  const trialUrl = nctId
    ? `https://clinicaltrials.gov/study/${nctId}`
    : `https://clinicaltrials.gov/search?term=${encodeURIComponent(trial.title)}`;

  const displayPhase =
    trial.phase && trial.phase !== "N/A"
      ? trial.phase
      : status.includes("recruiting")
        ? "Early Phase"
        : "Not Disclosed";
  const displayEnrollment =
    trial.enrollment && trial.enrollment !== "0"
      ? `${trial.enrollment} Participants`
      : "Ongoing";

  return (
    <div className="group bg-[#0d1117] border border-white/[0.06] hover:border-emerald-500/40 hover:bg-[#121820] rounded-2xl flex flex-col transition-all duration-300 overflow-hidden shadow-xl h-full">
      {/* Header - Mobile friendly padding */}
      <div className="p-4 md:p-5 pb-2 flex items-center justify-between gap-2">
        <div
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[8px] md:text-[10px] font-black uppercase tracking-widest ${
            isRecruiting
              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
              : "bg-slate-500/10 text-slate-400 border-slate-500/20"
          }`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${isRecruiting ? "bg-emerald-400 animate-pulse" : "bg-slate-500"}`}
          />
          {trial.status || "Status Pending"}
        </div>
        <span className="text-[8px] md:text-[10px] font-mono text-slate-600 font-bold shrink-0">
          {nctId || "N/A"}
        </span>
      </div>

      {/* Main Content */}
      <div className="px-4 md:px-5 pb-4 space-y-4">
        <h4 className="text-slate-100 text-[14px] md:text-[16px] font-bold leading-snug line-clamp-2 min-h-[40px] group-hover:text-emerald-50 transition-colors">
          {trial.title}
        </h4>

        {/* Clinical Specs Grid - Mobile: Stack if tiny, Tablet: side-by-side */}
        <div className="grid grid-cols-2 gap-2 md:gap-3">
          <div className="bg-white/[0.02] border border-white/[0.04] p-2.5 md:p-3 rounded-xl">
            <p className="text-[7px] md:text-[9px] text-slate-600 uppercase font-black mb-1 tracking-wider">
              Phase
            </p>
            <p className="text-[10px] md:text-xs font-bold text-slate-200 truncate">
              {displayPhase}
            </p>
          </div>
          <div className="bg-white/[0.02] border border-white/[0.04] p-2.5 md:p-3 rounded-xl">
            <p className="text-[7px] md:text-[9px] text-slate-600 uppercase font-black mb-1 tracking-wider">
              Enrollment
            </p>
            <p className="text-[10px] md:text-xs font-bold text-slate-200 truncate">
              {displayEnrollment}
            </p>
          </div>
        </div>

        {/* Condition Tag - Hidden on very small screens to save space */}
        {trial.conditions && (
          <div className="hidden sm:flex flex-wrap gap-1.5">
            {trial.conditions.slice(0, 1).map((c, i) => (
              <span
                key={i}
                className="text-[9px] text-slate-500 bg-white/5 px-2 py-0.5 rounded border border-white/5 truncate max-w-full"
              >
                Condition: {c}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Spacer to push footer down */}
      <div className="flex-1" />

      {/* Footer - Stacked on Mobile, Row on Desktop */}
      <div className="px-4 py-4 md:p-5 bg-black/20 border-t border-white/[0.04] flex flex-col xs:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 w-full xs:w-auto">
          <div className="p-2 bg-white/5 rounded-lg text-slate-500 shrink-0">
            <LocationIcon />
          </div>
          <div className="min-w-0">
            <p className="text-[7px] md:text-[9px] text-slate-600 uppercase font-black">
              Sponsor
            </p>
            <p className="text-[11px] text-slate-400 font-medium truncate max-w-[120px] md:max-w-[140px]">
              {trial.sponsor || "Researcher"}
            </p>
          </div>
        </div>

        {/* Full-width button on mobile */}
        <a
          href={trialUrl}
          target="_blank"
          rel="noreferrer"
          className="w-full xs:w-auto text-center px-6 py-3 bg-emerald-500 text-black text-[10px] md:text-[11px] font-black uppercase tracking-widest rounded-xl hover:bg-emerald-400 transition-all active:scale-95 shadow-lg shadow-emerald-900/30 whitespace-nowrap"
        >
          Study Details
        </a>
      </div>
    </div>
  );
}
