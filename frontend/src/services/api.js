import axios from "axios";

const BASE_URL = "http://localhost:5000/api/research";

export const fetchResearch = async (disease, query) => {
  const res = await axios.post(
    `${BASE_URL}/fetch-research`,
    { disease, query },
    { timeout: 30000 },
  );
  return res.data;
};

export const analyzeResearch = async (
  disease,
  query,
  publications,
  clinicalTrials,
  sessionId,
) => {
  const res = await axios.post(
    `${BASE_URL}/analyze`,
    { disease, query, publications, clinicalTrials, sessionId },
    { timeout: 180000 }, // ← 3 minutes
  );
  return res.data;
};

export const getHistory = async (sessionId) => {
  const res = await axios.get(`${BASE_URL}/history/${sessionId}`);
  return res.data;
};
