import { motion } from "framer-motion";
import ShimmerSweep from "./shimmer-sweep";
import Logo from "./Logo";
import { getRandomGradient } from "@/lib/utils";

const PlaceHolder = ({
  imageState,
  id,
}: {
  imageState?: "loading" | "loaded" | "error";
  id?: string;
}) => {
  return (
    <div
      className={`absolute inset-0 bg-linear-to-br ${id ? getRandomGradient(id) : "from-red-500 to-blue-500"} z-10 flex items-center justify-center`}
    >
      {/* Logo in center */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.4, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Logo className="text-foreground/30" size="lg" />
      </motion.div>

      {/* Shimmer effect for loading */}
      {imageState === "loading" && (
        <ShimmerSweep duration={1.5} via="via-white/10" />
      )}
    </div>
  );
};

export default PlaceHolder;
