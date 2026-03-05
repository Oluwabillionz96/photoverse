import ShimmerSweep from "../shimmer-sweep";

const TabLayoutLoader = ({ collapsed }: { collapsed: boolean }) => {
  return (
    <div
      className={`md:flex justify-between items-center px-6 py-4 hidden bg-background border-b border-border fixed top-16 z-40 transition-all duration-500 ${
        collapsed
          ? "left-20 right-0"
          : "md:left-56 lg:left-64 right-0"
      }`}
    >
      {/* Tab toggle skeleton */}
      <div className="flex gap-2 p-1 bg-secondary rounded-xl border border-border">
        {/* Photos tab */}
        <div className="relative w-28 h-10 rounded-lg bg-border/30 overflow-hidden">
          <ShimmerSweep via="white/20" duration={1.5} delay={0} repeatDelay={0.5} />
        </div>
        {/* Folders tab */}
        <div className="relative w-28 h-10 rounded-lg bg-border/30 overflow-hidden">
          <ShimmerSweep via="white/20" duration={1.5} delay={0.1} repeatDelay={0.5} />
        </div>
      </div>

      {/* Action buttons skeleton */}
      <div className="flex items-center gap-3">
        {/* Primary action button (Add Photo / Create Folder) */}
        <div className="relative w-32 h-10 rounded-md bg-border/30 overflow-hidden">
          <ShimmerSweep via="white/20" duration={1.5} delay={0.2} repeatDelay={0.5} />
        </div>
        {/* Settings button */}
        <div className="relative w-28 h-10 rounded-md bg-border/30 overflow-hidden">
          <ShimmerSweep via="white/20" duration={1.5} delay={0.3} repeatDelay={0.5} />
        </div>
      </div>
    </div>
  );
};

export default TabLayoutLoader;
