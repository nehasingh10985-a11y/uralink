const SkeletonCard = () => (
  <div className="bg-[#161b22] border border-white/5 rounded-2xl p-4 md:p-5 h-40 md:h-48 animate-pulse flex flex-col shadow-lg">
    {/* Title Line */}
    <div className="h-4 w-3/4 bg-white/10 rounded-md mb-4"></div>

    {/* Content Lines */}
    <div className="h-3 w-full bg-white/5 rounded-md mb-2"></div>
    <div className="h-3 w-5/6 bg-white/5 rounded-md mb-6"></div>

    {/* Footer Section */}
    <div className="flex justify-between items-center mt-auto">
      {/* Small Badge/Status Placeholder */}
      <div className="h-3 w-12 md:w-16 bg-white/10 rounded-full"></div>

      {/* Button Placeholder */}
      <div className="h-8 md:h-9 w-20 md:w-24 bg-cyan-500/10 border border-cyan-500/10 rounded-xl"></div>
    </div>
  </div>
);

export default SkeletonCard;
