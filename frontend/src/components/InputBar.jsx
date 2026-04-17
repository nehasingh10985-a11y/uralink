import React from "react";

export default function InputBar({ query, setQuery, onSubmit, loading }) {
  return (
    <div className="bg-[#0b0d12]/95 backdrop-blur-md border-t border-white/5 px-4 py-4 md:py-6 relative overflow-hidden">
      {/* Subtle background glow to connect with the "Neural" theme */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />

      <div className="max-w-3xl mx-auto flex gap-3 items-center">
        {/* 1. Enhanced Input Field */}
        <div className="relative flex-1 group">
          <input
            className="w-full bg-[#161922] border border-slate-800 focus:border-cyan-500/40 rounded-2xl px-5 py-3 text-[14px] text-slate-200 placeholder:text-slate-600 outline-none transition-all duration-300 group-hover:bg-[#1c202b] focus:shadow-[0_0_20px_rgba(6,182,212,0.05)]"
            placeholder="Ask medical intelligence..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !loading && onSubmit()}
          />

          {/* Dynamic Loading Indicator */}
          {loading ? (
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              <div className="w-4 h-4 border-2 border-cyan-500/20 border-t-cyan-400 rounded-full animate-spin" />
            </div>
          ) : (
            <div className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 items-center gap-1 opacity-20 group-focus-within:opacity-40 transition-opacity">
              <span className="text-[10px] font-mono text-slate-400 border border-slate-700 px-1 rounded whitespace-nowrap">
                ENTER
              </span>
            </div>
          )}
        </div>

        {/* 2. Sharp Action Button */}
        <button
          onClick={onSubmit}
          disabled={loading || !query.trim()}
          className="
            relative group/btn overflow-hidden
            bg-cyan-500 hover:bg-cyan-400 
            disabled:bg-slate-800 disabled:opacity-30 
            text-[#0a0f1a] font-black text-[11px] uppercase tracking-widest 
            px-6 py-3 rounded-2xl 
            transition-all active:scale-95
            shadow-[0_0_20px_rgba(6,182,212,0.1)]
          "
        >
          <span className="relative z-10">{loading ? "Wait" : "Analyze"}</span>

          {/* Subtle button shine animation on hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
        </button>
      </div>
    </div>
  );
}
