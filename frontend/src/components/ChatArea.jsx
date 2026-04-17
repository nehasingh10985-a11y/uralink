import MessageBubble from "./MessageBubble";
import WelcomeScreen from "./WelcomeScreen";
import Loader from "./Loader";
import SkeletonCard from "./SkeletonCard";

export default function ChatArea({
  messages,
  loadingPhase,
  bottomRef,
  setQuery,
  savedPapers,
  onToggleSave,
}) {
  return (
    // 'px-4' for mobile, 'md:px-16' for desktop
    <div className="flex-1 overflow-y-auto px-4 md:px-16 py-4 md:py-8 flex flex-col scroll-smooth custom-scrollbar">
      {/* 1. Full-Height Welcome Screen - Height adjusted for mobile */}
      {messages.length === 0 && (
        <div className="flex-1 flex items-center justify-center min-h-[60vh] md:min-h-[70vh]">
          <div className="animate-in fade-in zoom-in duration-1000 w-full">
            <WelcomeScreen setQuery={setQuery} />
          </div>
        </div>
      )}

      {/* 2. Wide Message Container */}
      <div className="max-w-7xl mx-auto w-full flex flex-col">
        {/* Gap reduced for mobile to save vertical space */}
        <div className="flex flex-col gap-6 md:gap-20">
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
            <div className="py-6 md:py-10 border-t border-white/5 space-y-6 md:space-y-8 animate-in fade-in duration-500">
              <Loader phase="research" />

              {/* Responsive Grid: 1 col on mobile, 2 on tablet, 4 on desktop */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4 md:mt-6">
                {[1, 2, 3, 4].map((i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 4. Bottom Spacer - Adjusted so it doesn't leave a huge blank gap on small screens */}
      <div ref={bottomRef} className="h-28 md:h-40 shrink-0" />
    </div>
  );
}
