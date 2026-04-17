export default function ErrorCard({ type }) {
  const errors = {
    network: {
      icon: "🌐",
      title: "Network Error",
      message: "Please check your internet connection and try again.",
      color: "border-yellow-700 bg-yellow-900/20",
      textColor: "text-yellow-400",
    },
    server: {
      icon: "⚙️",
      title: "Server Error",
      message:
        "Our research engine is facing issues. Please restart the backend and try again.",
      color: "border-red-700 bg-red-900/20",
      textColor: "text-red-400",
    },
    timeout: {
      icon: "⏱️",
      title: "Request Timed Out",
      message:
        "The AI model is taking too long to respond. Please try again with a simpler query.",
      color: "border-orange-700 bg-orange-900/20",
      textColor: "text-orange-400",
    },
    unknown: {
      icon: "🔍",
      title: "Something Went Wrong",
      message:
        "An unexpected error occurred. Please try again after some time.",
      color: "border-gray-700 bg-gray-900/20",
      textColor: "text-gray-400",
    },
  };

  const e = errors[type] || errors.unknown;

  return (
    <div className={`border rounded-xl p-4 flex items-start gap-4 ${e.color}`}>
      <span className="text-2xl">{e.icon}</span>
      <div className="flex flex-col gap-1">
        <h4 className={`font-semibold text-sm ${e.textColor}`}>{e.title}</h4>
        <p className="text-gray-400 text-xs leading-relaxed">{e.message}</p>
      </div>
    </div>
  );
}
