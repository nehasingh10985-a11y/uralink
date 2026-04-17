import React from "react";

export default function DiseaseBar({ disease, setDisease }) {
  return (
    <div className="bg-[#0f172a]/90 backdrop-blur-xl border-b border-white/5 px-3 md:px-4 py-2 flex justify-center sticky top-[64px] z-40">
      <div className="max-w-3xl w-full flex items-center gap-3 md:gap-4">
        {/* Professional Label (Sirf Desktop par dikhega) */}
        <span className="hidden md:block text-[9px] text-slate-500 font-bold uppercase tracking-[0.2em] shrink-0">
          Target Pathology
        </span>

        {/* Input Container */}
        <div className="flex-1 relative flex items-center group">
          {/* Subtle indicator dot - Mobile par thoda highlight kiya hai */}
          <div
            className={`absolute left-3 w-1.5 h-1.5 rounded-full transition-all duration-300 ${
              disease
                ? "bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.8)]"
                : "bg-slate-600"
            }`}
          ></div>

          <input
            className="w-full bg-slate-900/40 border border-white/5 focus:border-cyan-500/30 focus:bg-slate-900/80 rounded-xl pl-8 pr-4 py-2 md:py-1.5 text-[13px] md:text-[13px] text-slate-200 placeholder:text-slate-500/70 outline-none transition-all duration-300 font-medium tracking-wide"
            // Mobile par placeholder ko thoda chota rakha hai
            placeholder={
              window.innerWidth < 640
                ? "Search condition..."
                : "Define research condition (e.g., Lung Cancer...)"
            }
            value={disease}
            onChange={(e) => setDisease(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
