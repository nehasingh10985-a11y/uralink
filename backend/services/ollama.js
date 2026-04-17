const Groq = require("groq-sdk");

const client = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const askOllama = async (
  disease,
  query,
  publications,
  trials,
  chatHistory = "",
) => {
  // --- IMPORTANT: CITATION INSTRUCTIONS ADDED ---
  const context = `
You are a professional Medical Research Intelligence System.
Disease: ${disease}
User Query: ${query}

${chatHistory ? `Previous Chat History:\n${chatHistory}\n` : ""}

AVAILABLE RESEARCH DATA (CITATIONS):
${publications
  .slice(0, 8) // Frontend 8 tak dikha raha hai, toh 8 hi bhejo
  .map(
    (p, i) =>
      `[${i + 1}] Title: ${p.title} (${p.year}) | Abstract: ${p.abstract?.slice(0, 300)}`,
  )
  .join("\n")}

CLINICAL TRIALS:
${trials
  .slice(0, 3)
  .map((t, i) => `Trial [T${i + 1}]: ${t.title} - Status: ${t.status}`)
  .join("\n")}

STRICT INSTRUCTIONS FOR OUTPUT:
1. Provide a professional synthesis of the condition.
2. Use "Key Research Insights" and "Clinical Progress" as headers.
3. CRITICAL: Every scientific claim MUST be followed by its source number in underscores. 
   Example: "Treatment X shows 40% improvement _1_." 
   (Do NOT use [1], use _1_ so the frontend can render neon badges).
4. If a piece of information is not in the provided data, do NOT hallucinate.
5. Maintain a clinical, objective tone.
  `;

  const completion = await client.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "You are a medical intelligence engine that only speaks based on provided clinical evidence.",
      },
      { role: "user", content: context },
    ],
    model: "llama-3.3-70b-versatile",
    temperature: 0.3, // Temperature kam rakha hai taaki AI "feke" nahi (less hallucination)
    max_tokens: 1500,
  });

  return completion.choices[0]?.message?.content || "No response generated";
};

module.exports = { askOllama };
