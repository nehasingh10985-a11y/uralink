import React from "react";

export default function PublicationCard({ pub, isSaved, onToggleSave }) {
  // Logic to handle DOI link or Fallback URL
  const doiLink = pub.doi ? `https://doi.org/${pub.doi}` : pub.url;

  // Format citations (e.g., 1200 becomes 1.2k)
  const formatCitations = (count) => {
    if (!count || count === 0) return "0";
    return count >= 1000 ? (count / 1000).toFixed(1) + "k" : count;
  };

  return (
    <div
      className={`group relative bg-[#0d1117] border transition-all duration-300 rounded-2xl p-5 flex flex-col h-full ${
        isSaved
          ? "border-cyan-500/60 shadow-[0_0_20px_rgba(6,182,212,0.15)] bg-[#0d151d]"
          : "border-white/[0.06] hover:border-cyan-500/40 hover:shadow-[0_0_25px_rgba(6,182,212,0.1)]"
      }`}
    >
      {/* 1. Header: Source & Bookmark Button */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-[9px] font-black uppercase tracking-widest text-slate-500 bg-white/5 px-2 py-0.5 rounded">
          {pub.source || "Research"}
        </span>

        <button
          onClick={(e) => {
            e.preventDefault(); // Click event ko parent bubbling se rokne ke liye
            onToggleSave(pub);
          }}
          title={isSaved ? "Remove from Workbench" : "Save to Workbench"}
          className={`p-1.5 rounded-lg transition-all duration-200 ${
            isSaved
              ? "text-cyan-400 bg-cyan-500/20 shadow-[0_0_10px_rgba(34,211,238,0.2)] scale-110"
              : "text-slate-500 hover:bg-white/10 hover:text-cyan-400"
          }`}
        >
          <svg
            className="w-4 h-4"
            fill={isSaved ? "currentColor" : "none"}
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
            />
          </svg>
        </button>
      </div>

      {/* 2. Journal & DOI Info */}
      <div className="flex flex-wrap items-center gap-2 mb-2">
        <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-tight truncate max-w-[120px]">
          {pub.journal || "Scientific Journal"}
        </p>
        {pub.doi && (
          <a
            href={doiLink}
            target="_blank"
            rel="noreferrer"
            className="text-[8px] font-mono font-bold text-cyan-500/60 hover:text-cyan-400 border border-cyan-500/10 px-1.5 py-0.5 rounded transition-colors"
          >
            DOI: {pub.doi.split("/").pop()}
          </a>
        )}
      </div>

      {/* 3. Title & Authors */}
      <div className="space-y-2 flex-grow">
        <h3
          className={`text-[14px] font-bold leading-snug line-clamp-2 transition-colors ${
            isSaved ? "text-cyan-50" : "text-slate-100 group-hover:text-cyan-50"
          }`}
        >
          {pub.title}
        </h3>
        <p className="text-slate-500 text-[11px] font-medium line-clamp-1 italic">
          {pub.authors || "Unknown Authors"}
        </p>
      </div>

      {/* 4. Footer: Stats & Link */}
      <div
        className={`mt-5 pt-4 border-t flex items-center justify-between ${
          isSaved ? "border-cyan-500/20" : "border-white/[0.04]"
        }`}
      >
        <div className="flex items-center gap-4">
          <div className="flex flex-col">
            <span className="text-[8px] text-slate-600 uppercase font-black tracking-tighter">
              Year
            </span>
            <span className="text-xs text-slate-300 font-bold">
              {pub.year || "2024"}
            </span>
          </div>

          <div className="flex flex-col border-l border-white/10 pl-4">
            <span className="text-[8px] text-slate-600 uppercase font-black tracking-tighter">
              Citations
            </span>
            <div className="flex items-center gap-1">
              <svg
                className="w-2.5 h-2.5 text-cyan-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
              </svg>
              <span className="text-xs text-slate-300 font-bold">
                {formatCitations(pub.citationCount)}
              </span>
            </div>
          </div>
        </div>

        <a
          href={pub.url}
          target="_blank"
          rel="noreferrer"
          className={`p-2 rounded-lg transition-all active:scale-90 ${
            isSaved
              ? "bg-cyan-500 text-black"
              : "bg-white/5 text-slate-400 hover:text-cyan-400 hover:bg-cyan-500/10"
          }`}
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </a>
      </div>
    </div>
  );
}
