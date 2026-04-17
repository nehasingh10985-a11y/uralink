import MessageBubble from "./MessageBubble";
import WelcomeScreen from "./WelcomeScreen";
import Loader from "./Loader";
import SkeletonCard from "./SkeletonCard"; // SkeletonCard import karna mat bhoolna

export default function ChatArea({
  messages,
  loadingPhase,
  bottomRef,
  setQuery,
  savedPapers,
  onToggleSave,
}) {
  return (
    <div className="flex-1 overflow-y-auto px-6 md:px-16 py-8 flex flex-col scroll-smooth custom-scrollbar">
      {/* 1. Full-Height Welcome Screen */}
      {messages.length === 0 && (
        <div className="flex-1 flex items-center justify-center min-h-[70vh]">
          <div className="animate-in fade-in zoom-in duration-1000">
            <WelcomeScreen setQuery={setQuery} />
          </div>
        </div>
      )}

      {/* 2. Wide Message Container */}
      <div className="max-w-7xl mx-auto w-full flex flex-col">
        <div className="flex flex-col gap-12 md:gap-20">
          {messages.map((msg, i) => (
            <div
              key={i}
              className="animate-in fade-in slide-in-from-bottom-2 duration-700"
            >
              <MessageBubble
                msg={msg}
                savedPapers={savedPapers}
                onToggleSave={onToggleSave}
              />
            </div>
          ))}

          {/* 3. Research Loader & Skeleton Section */}
          {loadingPhase === "research" && (
            <div className="py-10 border-t border-white/5 space-y-8 animate-in fade-in duration-500">
              {/* Loader indicator */}
              <Loader phase="research" />

              {/* --- SKELETON GRID ADDED HERE --- */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                {[1, 2, 3, 4].map((i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 4. Large Bottom Spacer */}
      <div ref={bottomRef} className="h-40 shrink-0" />
    </div>
  );
}
