import { motion } from "framer-motion";
import Logo from "./Logo";
import ShimmerSweep from "./shimmer-sweep";

const IndividualPhotoLoader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      <div className="w-full h-full grid place-items-center">
        <motion.div
          className="relative w-64 h-64 rounded-2xl bg-linear-to-br from-primary/20 via-accent/20 to-primary/20 flex items-center justify-center overflow-hidden"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.6, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Logo className="text-foreground/40" size="lg" />
          </motion.div>

          {/* Shimmer effect */}

          <ShimmerSweep duration={1.5} via="white/20" />

          {/* Pulsing ring */}
          <motion.div
            className="absolute inset-0 border-4 border-primary/30 rounded-2xl"
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default IndividualPhotoLoader;
