const SkeletonCard = () => (
  <div className="bg-[#161b22] border border-white/5 rounded-2xl p-5 h-48 animate-pulse">
    <div className="h-4 w-3/4 bg-white/10 rounded mb-4"></div>
    <div className="h-3 w-full bg-white/5 rounded mb-2"></div>
    <div className="h-3 w-5/6 bg-white/5 rounded mb-6"></div>
    <div className="flex justify-between items-center mt-auto">
      <div className="h-3 w-12 bg-white/10 rounded"></div>
      <div className="h-8 w-24 bg-cyan-500/20 rounded-xl"></div>
    </div>
  </div>
);

export default SkeletonCard;
