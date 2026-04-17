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
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      // Fixed inset-0 + flex-col + justify-center keeps everything in dead center
      className="fixed inset-0 z-0 flex flex-col items-center justify-center p-6 pointer-events-none"
    >
      <div className="w-full max-w-2xl mx-auto pointer-events-auto">
        {/* Responsive Chip Grid */}
        <div className="flex flex-col gap-3 w-full max-w-md mx-auto px-4 mt-10">
          {["Latest treatments...", "Clinical trials..."].map((text) => (
            <button className="w-full py-4 px-6 rounded-2xl bg-white/5 border border-white/10 text-slate-300 text-sm md:text-base hover:bg-white/10 transition-all text-left">
              {text}
            </button>
          ))}
        </div>

        {/* Minimal Footer Decor */}
        <div className="mt-20 flex flex-col items-center gap-6 opacity-20">
          <div className="h-[1px] w-40 bg-gradient-to-r from-transparent via-slate-500 to-transparent"></div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-[10px] font-bold uppercase tracking-[0.6em] text-slate-400 text-center">
              System Ready
            </span>
            <span className="text-[8px] font-mono text-slate-500">
              Uralink Node Connected
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
