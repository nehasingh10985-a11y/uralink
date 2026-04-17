import { useState, useEffect, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import Header from "./components/Header";
import DiseaseBar from "./components/DiseaseBar";
import ChatArea from "./components/ChatArea";
import InputBar from "./components/InputBar";
import WorkbenchSidebar from "./components/WorkbenchSidebar";
import { useChat } from "./hooks/useChat";
import { Toaster, toast } from "react-hot-toast";

const sessionId = uuidv4();

export default function App() {
  const [disease, setDisease] = useState("");
  const [query, setQuery] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [savedPapers, setSavedPapers] = useState(() => {
    const localData = localStorage.getItem("medical_workbench");
    return localData ? JSON.parse(localData) : [];
  });

  useEffect(() => {
    localStorage.setItem("medical_workbench", JSON.stringify(savedPapers));
  }, [savedPapers]);

  const { messages, loadingPhase, sendMessage, bottomRef } = useChat(sessionId);

  const handleSubmit = () => {
    sendMessage(disease, query);
    setQuery("");
  };

  const handleToggleSave = useCallback((paper, showToast = true) => {
    setSavedPapers((prev) => {
      const paperUniqueKey = paper.doi || paper.title;
      const isAlreadySaved = prev.some(
        (p) => (p.doi || p.title) === paperUniqueKey,
      );

      const toastConfig = {
        id: paperUniqueKey,
        style: {
          background: "#161b22",
          color: "#fff",
          border: "1px solid rgba(255,255,255,0.1)",
          fontSize: "12px",
          fontWeight: "bold",
        },
      };

      if (isAlreadySaved) {
        if (showToast) toast.error("Removed from Workbench", toastConfig);
        return prev.filter((p) => (p.doi || p.title) !== paperUniqueKey);
      } else {
        if (showToast) toast.success("Saved to Workbench", toastConfig);
        return [...prev, paper];
      }
    });
  }, []);

  const handleToggleWorkbench = useCallback(() => {
    setIsSidebarOpen((prev) => !prev);
  }, []);

  return (
    // 'h-screen' zaroori hai taaki app mobile screen ke andar rahe
    <div className="flex h-screen bg-[#0f1117] text-gray-200 font-sans overflow-hidden relative">
      <Toaster position="top-right" reverseOrder={false} />

      {/* Main Container */}
      <div
        className={`flex flex-col flex-1 min-w-0 transition-all duration-500 relative ${
          isSidebarOpen ? "lg:mr-96" : "mr-0"
        }`}
      >
        {/* Header - Fixed at top */}
        <Header
          onToggleWorkbench={handleToggleWorkbench}
          savedCount={savedPapers.length}
        />

        {/* Content Area - Scrollable */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* DiseaseBar - Mobile par tight padding */}
          <div className="px-2 md:px-0">
            <DiseaseBar disease={disease} setDisease={setDisease} />
          </div>

          {/* ChatArea - Iska apna internal scroll hona chahiye */}
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            <ChatArea
              messages={messages}
              loadingPhase={loadingPhase}
              bottomRef={bottomRef}
              setQuery={setQuery}
              savedPapers={savedPapers}
              onToggleSave={handleToggleSave}
            />
          </div>
        </div>

        {/* InputBar - Mobile par bottom par fixed rahega */}
        <div className="p-2 md:p-4 bg-[#0f1117] border-t border-white/5">
          <InputBar
            query={query}
            setQuery={setQuery}
            onSubmit={handleSubmit}
            loading={loadingPhase !== null}
          />
        </div>
      </div>

      {/* Sidebar - Mobile par Overlay ban jayega, Desktop par Push karega */}
      <div
        className={`
        fixed top-0 right-0 h-full z-[60] transition-transform duration-300
        ${isSidebarOpen ? "translate-x-0" : "translate-x-full"}
        lg:relative lg:translate-x-0 ${isSidebarOpen ? "lg:w-96" : "lg:w-0"}
      `}
      >
        <WorkbenchSidebar
          isOpen={isSidebarOpen}
          setIsOpen={setIsSidebarOpen}
          savedItems={savedPapers}
          onRemove={handleToggleSave}
        />
      </div>

      {/* Mobile Overlay - Jab sidebar khule toh background dark ho jaye */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[55] lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}
