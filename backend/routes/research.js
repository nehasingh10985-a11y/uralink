const express = require("express");
const router = express.Router();
const { fetchPubMed } = require("../services/pubmed");
const { fetchOpenAlex } = require("../services/openalex");
const { fetchClinicalTrials } = require("../services/clinicaltrials");
const { askOllama } = require("../services/ollama");
const Conversation = require("../models/Conversation");

// Phase 1 — Fast: Sirf Publications + Trials
router.post("/fetch-research", async (req, res) => {
  try {
    const { disease, query } = req.body;
    const expandedQuery = `${query} ${disease}`;
    console.log("Fetch Research called:", expandedQuery);

    const [pubmed, openalex, trials] = await Promise.all([
      fetchPubMed(expandedQuery),
      fetchOpenAlex(expandedQuery),
      fetchClinicalTrials(disease),
    ]);

    const allPublications = [...pubmed, ...openalex];
    const ranked = allPublications
      .filter((p) => p.title !== "N/A")
      .sort((a, b) => (b.year || 0) - (a.year || 0))
      .slice(0, 8);

    const topTrials = trials.slice(0, 4);

    console.log("Publications found:", ranked.length);
    console.log("Trials found:", topTrials.length);

    res.json({
      success: true,
      publications: ranked,
      clinicalTrials: topTrials,
    });
  } catch (err) {
    console.error("Fetch Research Error:", err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

// Phase 2 — Slow: LLM Analysis
router.post("/analyze", async (req, res) => {
  try {
    const { disease, query, publications, clinicalTrials, sessionId } =
      req.body;

    console.log("Analyze called ✅");
    console.log("Disease:", disease);
    console.log("Query:", query);
    console.log("Publications count:", publications?.length);
    console.log("Trials count:", clinicalTrials?.length);
    console.log("SessionId:", sessionId);

    const conversation = await Conversation.findOne({ sessionId });
    const previousMessages = conversation?.messages || [];
    const chatHistory = previousMessages
      .slice(-4)
      .map((m) => `${m.role === "user" ? "User" : "Assistant"}: ${m.content}`)
      .join("\n");

    console.log("Calling Groq LLM... ⏳");
    const llmResponse = await askOllama(
      disease,
      query,
      publications,
      clinicalTrials,
      chatHistory,
    );
    console.log("Groq Response received ✅");

    await Conversation.findOneAndUpdate(
      { sessionId },
      {
        $set: { disease },
        $push: {
          messages: [
            { role: "user", content: query },
            { role: "assistant", content: llmResponse },
          ],
        },
      },
      { upsert: true, returnDocument: "after" },
    );

    res.json({ success: true, llmResponse });
  } catch (err) {
    console.error("❌ Analyze Error:", err.message);
    console.error("Full Error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// History
router.get("/history/:sessionId", async (req, res) => {
  const conv = await Conversation.findOne({ sessionId: req.params.sessionId });
  res.json(conv || {});
});

module.exports = router;
