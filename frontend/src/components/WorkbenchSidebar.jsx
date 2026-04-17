import React from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function WorkbenchSidebar({
  isOpen,
  setIsOpen,
  savedItems,
  onRemove,
}) {
  const handleExportPDF = () => {
    if (savedItems.length === 0) return;

    const doc = new jsPDF();

    // Header setup
    doc.setFontSize(20);
    doc.setTextColor(6, 182, 212);
    doc.text("Research Analysis Report", 14, 22);

    const tableColumn = ["Year", "Title", "Journal"];
    const tableRows = savedItems.map((item) => [
      item.year || "N/A",
      item.title,
      item.journal || "Medical Source",
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 45,
      theme: "grid",
      headStyles: { fillColor: [6, 182, 212] },
      styles: { fontSize: 8 },
      columnStyles: {
        1: { cellWidth: 100 },
      },
    });

    doc.save(`Research_Summary_${Date.now()}.pdf`);
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        className={`fixed right-0 top-0 h-full w-85 md:w-96 bg-[#0d1117] border-l border-white/10 z-[70] shadow-2xl flex flex-col transition-transform duration-500 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 border-b border-white/5 flex items-center justify-between">
          <div>
            <h2 className="text-cyan-400 text-[10px] font-black uppercase tracking-[0.25em]">
              Research Workbench
            </h2>
            <p className="text-slate-500 text-[11px] mt-1 font-bold">
              {savedItems.length} Papers Saved
            </p>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-white/5 rounded-xl text-slate-500"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-4 custom-scrollbar bg-[#0f1117]/50 no-scrollbar">
          {savedItems.length === 0 ? (
            /* --- UPDATED: PROFESSIONAL EMPTY STATE --- */
            <div className="h-full flex flex-col items-center justify-center text-center px-10 animate-in fade-in zoom-in duration-500">
              <div className="w-16 h-16 bg-cyan-500/5 rounded-full flex items-center justify-center mb-4 border border-cyan-500/10">
                <svg
                  className="w-8 h-8 text-cyan-500/30"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
              </div>
              <p className="text-slate-400 text-sm font-bold tracking-tight">
                No Research Saved
              </p>
              <p className="text-slate-600 text-[11px] mt-2 leading-relaxed">
                Click the bookmark icon on any paper to add it to your workbench
                for analysis.
              </p>
            </div>
          ) : (
            savedItems.map((item, idx) => (
              <div
                key={item.doi || item.title || idx}
                className="group bg-[#161b22] border border-white/5 rounded-2xl p-4 hover:border-cyan-500/30 transition-all relative"
              >
                <button
                  onClick={() => onRemove(item)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-all z-10 shadow-lg"
                >
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>

                <p className="text-slate-200 text-xs font-bold leading-snug line-clamp-2 mb-3">
                  {item.title}
                </p>

                <div className="flex items-center justify-between pt-3 border-t border-white/[0.03]">
                  <span className="text-[9px] text-slate-500 font-black uppercase">
                    {item.year}
                  </span>
                  <span className="text-cyan-500 text-[10px] font-bold truncate max-w-[150px]">
                    {item.journal}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {savedItems.length > 0 && (
          <div className="p-6 border-t border-white/5 bg-[#0d1117]">
            <button
              onClick={handleExportPDF}
              className="w-full py-4 bg-cyan-600 hover:bg-cyan-500 text-black text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl transition-all shadow-lg active:scale-[0.98]"
            >
              Export Analysis (PDF)
            </button>
          </div>
        )}
      </div>
    </>
  );
}
