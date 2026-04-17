import { useState, useRef, useEffect } from "react";
import { fetchResearch, analyzeResearch } from "../services/api";

export const useChat = (sessionId) => {
  const [messages, setMessages] = useState([]);
  const [loadingPhase, setLoadingPhase] = useState(null);
  // null | 'research' | 'analyzing'
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loadingPhase]);

  const sendMessage = async (disease, query) => {
    if (!disease.trim() || !query.trim()) {
      alert("Please enter both disease and query!");
      return;
    }

    setMessages((prev) => [...prev, { role: "user", text: query }]);

    try {
      // Phase 1 — Publications fetch karo (fast ~2-3 sec)
      setLoadingPhase("research");
      const researchData = await fetchResearch(disease, query);

      // Turant publications dikhao
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: null, // LLM abhi nahi aaya
          publications: researchData.publications,
          clinicalTrials: researchData.clinicalTrials,
          analyzing: true, // LLM chal raha hai
        },
      ]);

      // Phase 2 — LLM analysis (slow ~30-60 sec)
      setLoadingPhase("analyzing");
      const analysisData = await analyzeResearch(
        disease,
        query,
        researchData.publications,
        researchData.clinicalTrials,
        sessionId,
      );

      // LLM response add karo existing message mein
      setMessages((prev) =>
        prev.map((msg, i) =>
          i === prev.length - 1
            ? { ...msg, text: analysisData.llmResponse, analyzing: false }
            : msg,
        ),
      );
    } catch (err) {
      let errorMessage = !navigator.onLine
        ? "network"
        : err.response?.status === 500
          ? "server"
          : err.code === "ECONNABORTED"
            ? "timeout"
            : "unknown";

      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: "", error: errorMessage },
      ]);
    }

    setLoadingPhase(null);
  };

  return { messages, loadingPhase, sendMessage, bottomRef };
};
