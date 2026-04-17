import React from "react";

export default function InputBar({ query, setQuery, onSubmit, loading }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#0f1117] via-[#0f1117] to-transparent z-40">
      {/* Container: Content ko center mein rakhega */}
      <div className="max-w-3xl mx-auto flex gap-2 items-center">
        {/* Input Field */}
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSubmit()}
          className="flex-1 bg-[#0d1117] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-500/50 transition-colors"
          placeholder="Ask medical intelligence..."
          disabled={loading}
        />

        {/* Analyze Button */}
        <button
          onClick={onSubmit}
          disabled={loading || !query.trim()}
          className={`px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${
            loading || !query.trim()
              ? "bg-slate-800 text-slate-500 cursor-not-allowed"
              : "bg-cyan-600 text-white shadow-lg shadow-cyan-500/20 active:scale-95"
          }`}
        >
          {loading ? "Analyzing..." : "Analyze"}
        </button>
      </div>
    </div>
  );
}
