import { useState, useEffect, useCallback } from "react"; // 1. useCallback import kiya
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

  // --- OPTIMIZED: Memoized Toggle Logic ---
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
        // Note: isSidebarOpen toggle yahan callback ke bahar effect handle karega
        return [...prev, paper];
      }
    });
  }, []); // Empty array matlab identity stable rahegi

  // --- NEW: Memoized Sidebar Toggle ---
  const handleToggleWorkbench = useCallback(() => {
    setIsSidebarOpen((prev) => !prev);
  }, []);

  return (
    <div className="flex h-screen bg-[#0f1117] text-gray-200 font-sans overflow-hidden relative">
      <Toaster position="bottom-right" reverseOrder={false} />

      <div
        className={`flex flex-col flex-1 transition-all duration-500 ${isSidebarOpen ? "mr-0 lg:mr-96" : "mr-0"}`}
      >
        {/* Memoized Header will not re-render on query state change */}
        <Header
          onToggleWorkbench={handleToggleWorkbench}
          savedCount={savedPapers.length}
        />

        <DiseaseBar disease={disease} setDisease={setDisease} />

        <ChatArea
          messages={messages}
          loadingPhase={loadingPhase}
          bottomRef={bottomRef}
          setQuery={setQuery}
          savedPapers={savedPapers}
          onToggleSave={handleToggleSave}
        />

        <InputBar
          query={query}
          setQuery={setQuery}
          onSubmit={handleSubmit}
          loading={loadingPhase !== null}
        />
      </div>

      <WorkbenchSidebar
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        savedItems={savedPapers}
        onRemove={handleToggleSave}
      />
    </div>
  );
}
