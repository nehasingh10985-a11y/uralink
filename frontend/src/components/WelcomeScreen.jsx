import React from "react";
import { motion } from "framer-motion";

const suggestions = [
  "Latest treatments for lung cancer",
  "Clinical trials for diabetes",
  "Recent Alzheimer's studies",
  "Heart disease research 2024",
];

export default function WelcomeScreen({ setQuery }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      // 'fixed' ko 'absolute' mein badla aur padding-top add kiya mobile ke liye
      className="absolute inset-0 z-0 flex flex-col items-center justify-start md:justify-center p-6 pt-24 md:pt-6 pointer-events-none"
    >
      <div className="w-full max-w-2xl mx-auto pointer-events-auto">
        {/* Suggestion Chips - Mobile par Stack, Tablet par Grid */}
        <div className="flex flex-col sm:flex-row sm:flex-wrap items-center justify-center gap-3 md:gap-4">
          {suggestions.map((s) => (
            <button
              key={s}
              onClick={() => setQuery(s)}
              className="
                w-full sm:w-auto        /* Mobile pe full width */
                px-5 md:px-6 
                py-4 md:py-3.5 
                rounded-xl md:rounded-2xl 
                border border-white/5 
                bg-white/[0.03] 
                text-[13px] md:text-[14px] 
                text-slate-400 
                hover:border-cyan-500/40 
                hover:text-cyan-400 
                hover:bg-cyan-500/5 
                transition-all duration-300 
                active:scale-[0.98] 
                backdrop-blur-md
                text-center sm:text-left
              "
            >
              {s}
            </button>
          ))}
        </div>

        {/* Minimal Footer Decor - Mobile par gap kam kiya gaya hai */}
        <div className="mt-12 md:mt-20 flex flex-col items-center gap-4 md:gap-6 opacity-30">
          <div className="h-[1px] w-32 md:w-40 bg-gradient-to-r from-transparent via-slate-700 to-transparent"></div>
          <div className="flex flex-col items-center gap-1.5">
            <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] md:tracking-[0.6em] text-slate-500 text-center">
              System Ready
            </span>
            <div className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[8px] font-mono text-slate-600">
                Uralink Node Connected
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
