export default function Loader({ phase }) {
  const phases = {
    research: {
      text: "Fetching research from PubMed, OpenAlex & ClinicalTrials...",
      color: "border-t-cyan-400",
    },
    analyzing: {
      text: "AI is analyzing the research papers...",
      color: "border-t-purple-400",
    },
  };

  const current = phases[phase] || phases.research;

  return (
    <div className="flex items-center gap-3 text-gray-500 text-sm">
      <div
        className={`w-5 h-5 border-2 border-[#2a2a4a] ${current.color} rounded-full animate-spin`}
      />
      {current.text}
    </div>
  );
}
