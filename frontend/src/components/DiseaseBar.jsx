import React from "react";

export default function DiseaseBar({ disease, setDisease }) {
  return (
    <div className="bg-[#0f172a]/80 backdrop-blur-xl border-b border-white/5 px-4 py-2 flex justify-center">
      <div className="max-w-3xl w-full flex items-center gap-3 md:gap-4">
        {/* Professional Label (Hidden on small mobile screens) */}
        <span className="hidden md:block text-[9px] text-slate-500 font-bold uppercase tracking-[0.2em] shrink-0">
          Target Pathology
        </span>

        {/* Ultra-sleek Input Field */}
        <div className="flex-1 relative flex items-center">
          {/* Subtle indicator dot instead of Emoji */}
          <div className="absolute left-3 w-1 h-1 rounded-full bg-slate-500/50"></div>

          <input
            className="w-full bg-slate-900/40 border border-white/5 focus:border-slate-600/50 focus:bg-slate-900/80 rounded-lg pl-7 pr-4 py-1.5 text-[12px] md:text-[13px] text-slate-200 placeholder:text-slate-600 outline-none transition-all duration-300 font-light tracking-wide"
            placeholder="Define research condition (e.g., Lung Cancer, Diabetes...)"
            value={disease}
            onChange={(e) => setDisease(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
