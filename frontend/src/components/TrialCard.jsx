import React from "react";

// Professional Location Icon Component
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
  // --- Core State & Logic ---
  const status = trial.status?.toLowerCase() || "";
  const isRecruiting =
    status.includes("recruiting") || status.includes("active");
  const nctId = trial.nctId || trial.id;

  // --- Research Data Mapping ---
  const displaySponsor =
    trial.sponsor || trial.leadSponsor || "Institutional Research";

  const displayLocation =
    trial.location ||
    (trial.locations && trial.locations[0]?.facility) ||
    (trial.locations && trial.locations[0]?.city) ||
    "Global Multi-center";

  const researchType = trial.studyType || "Clinical Research";

  // FIX: Study Model mapping ko aur specific banaya hai taaki govt details na aayein
  const studyModel =
    trial.designModel ||
    trial.studyModel ||
    (trial.designInfo && trial.designInfo.allocation) ||
    "Interventional Design";

  const startDate = trial.startDate
    ? new Date(trial.startDate).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      })
    : "Ongoing";

  const trialUrl = nctId
    ? `https://clinicaltrials.gov/study/${nctId}`
    : `https://clinicaltrials.gov/search?term=${encodeURIComponent(trial.title)}`;

  return (
    <div className="group bg-[#0d1117] border border-white/[0.06] hover:border-emerald-500/40 hover:bg-[#121820] rounded-2xl flex flex-col transition-all duration-300 overflow-hidden shadow-xl h-full font-sans text-left">
      {/* 1. Header Section */}
      <div className="p-4 md:p-5 pb-2 flex items-center justify-between gap-2">
        <div className="flex flex-wrap gap-2 items-center">
          <div
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[8px] md:text-[9px] font-black uppercase tracking-widest ${
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
          <div className="px-2 py-1 rounded-full bg-white/5 border border-white/10 text-[8px] text-slate-400 font-bold uppercase tracking-wider">
            {researchType}
          </div>
        </div>
        <span className="text-[8px] md:text-[10px] font-mono text-slate-600 font-bold shrink-0">
          {nctId || "N/A"}
        </span>
      </div>

      {/* 2. Main Title & Grid Section */}
      <div className="px-4 md:px-5 pb-4 space-y-5">
        <h4 className="text-slate-100 text-[14px] md:text-[16px] font-bold leading-snug line-clamp-2 min-h-[40px] group-hover:text-emerald-50 transition-colors">
          {trial.title}
        </h4>

        <div className="grid grid-cols-1 gap-2 md:gap-3">
          {/* Target Enrollment */}
          <div className="bg-white/[0.02] border border-white/[0.04] p-3 rounded-xl hover:bg-white/[0.04] transition-colors flex justify-between items-center">
            <p className="text-[7px] md:text-[9px] text-slate-600 uppercase font-black tracking-wider">
              Target Enrollment
            </p>
            <p className="text-[10px] md:text-xs font-bold text-slate-200 truncate">
              {trial.enrollment && trial.enrollment !== "0"
                ? `${trial.enrollment} Patients`
                : "Ongoing"}
            </p>
          </div>

          {/* Study Model Box (Refined) */}
          <div className="bg-white/[0.02] border border-white/[0.04] p-3 rounded-xl hover:bg-white/[0.04] transition-colors">
            <p className="text-[7px] md:text-[9px] text-slate-600 uppercase font-black mb-1 tracking-wider">
              Study Design Model
            </p>
            <p className="text-[10px] md:text-xs font-bold text-emerald-400/80 truncate">
              {studyModel}
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1" />

      {/* 3. Footer Section */}
      <div className="px-4 py-4 md:p-5 bg-black/20 border-t border-white/[0.04] flex flex-col xs:flex-row items-center justify-between gap-4 text-left">
        <div className="flex items-center gap-3 w-full xs:w-auto min-w-0">
          <div className="p-2.5 bg-white/5 rounded-lg text-slate-500 shrink-0 border border-white/[0.03]">
            <LocationIcon />
          </div>
          <div className="min-w-0">
            <p className="text-[7px] md:text-[8px] text-slate-600 uppercase font-black mb-0.5 tracking-tighter">
              Principal Sponsor
            </p>
            <p className="text-[11px] text-slate-400 font-bold truncate max-w-[140px] md:max-w-[160px]">
              {displaySponsor}
            </p>
            <div className="flex items-center gap-2 mt-0.5">
              <p className="text-[9px] text-slate-500 truncate font-medium">
                {displayLocation}
              </p>
              <span className="text-slate-700 font-bold">•</span>
              <p className="text-[9px] text-slate-600 font-bold uppercase">
                {startDate}
              </p>
            </div>
          </div>
        </div>

        <a
          href={trialUrl}
          target="_blank"
          rel="noreferrer"
          className="w-full xs:w-auto text-center px-6 py-3 bg-emerald-500 text-black text-[10px] md:text-[11px] font-black uppercase tracking-widest rounded-xl hover:bg-emerald-400 transition-all active:scale-95 shadow-lg shadow-emerald-900/40 whitespace-nowrap"
        >
          Study Details
        </a>
      </div>
    </div>
  );
}
