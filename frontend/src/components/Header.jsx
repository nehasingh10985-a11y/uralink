import React, { memo } from "react";

// memo se wrap kiya hai taaki input type karte waqt ye re-render na ho
const Header = memo(({ onToggleWorkbench, savedCount }) => {
  console.log("Header Rendered"); // Check karne ke liye ki typing par ye render nahi ho raha

  return (
    <div className="bg-[#0f172a]/80 backdrop-blur-xl border-b border-white/5 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
      {/* 1. Left Section: Identity */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/20 flex items-center justify-center shadow-lg shadow-cyan-500/5">
          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,211,238,0.8)]"></div>
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest leading-none">
            Deep Research
          </span>
          <span className="text-[9px] text-slate-500 font-medium">
            Session ID: 4902-X
          </span>
        </div>
      </div>

      {/* 2. Right Section: Workbench & Stats */}
      <div className="flex items-center gap-4">
        {/* Workbench Toggle Button */}
        <button
          onClick={onToggleWorkbench}
          className={`group relative p-2.5 rounded-xl transition-all duration-300 border ${
            savedCount > 0
              ? "bg-cyan-500/5 border-cyan-500/30 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.1)]"
              : "bg-white/5 border-white/5 text-slate-400 hover:border-white/10"
          }`}
          title="Open Research Workbench"
        >
          {/* Briefcase/Workbench Icon */}
          <svg
            className="w-5 h-5 transition-transform group-hover:scale-110"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>

          {/* Notification Badge */}
          {savedCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-cyan-500 text-black text-[10px] font-black px-1.5 py-0.5 rounded-full ring-4 ring-[#0f172a] animate-in zoom-in">
              {savedCount}
            </span>
          )}
        </button>

        {/* System Stats Pill */}
        <div className="hidden md:flex items-center gap-3 px-3 py-2 rounded-xl bg-slate-900/50 border border-white/5 text-[10px] font-bold uppercase tracking-tighter">
          <span className="flex items-center gap-1.5 text-slate-400">
            <div className="w-1 h-1 bg-emerald-500 rounded-full shadow-[0_0_4px_rgba(16,185,129,0.5)]"></div>
            Llama 3.3
          </span>
          <div className="w-[1px] h-3 bg-slate-800"></div>
          <span className="text-slate-500 font-mono">240ms</span>
        </div>
      </div>
    </div>
  );
});

export default Header;
