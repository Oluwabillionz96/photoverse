"use client";
import { Trash2, Sparkles, ArchiveRestore } from "lucide-react";
import { motion } from "framer-motion";
import ShimmerSweep from "../shimmer-sweep";

const EmptyTrash = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden">
        <motion.div
          className="absolute top-10 left-10 w-40 h-40 rounded-full bg-linear-to-br from-primary/30 to-transparent blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-linear-to-br from-accent/30 to-transparent blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </div>

      {/* Animated Icon */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", duration: 0.8 }}
        className="relative mb-8 z-10"
      >
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-32 h-32 rounded-3xl bg-primary/20 flex items-center justify-center bg-secondary border border-border shadow-2xl relative overflow-hidden"
        >
          <Trash2 className="w-16 h-16 text-primary relative z-10" />

          {/* Shimmer effect */}
          <ShimmerSweep via="via-white/10 " duration={2} repeatDelay={1} />
        </motion.div>

        {/* Floating sparkles */}
        <motion.div
          animate={{
            y: [-5, 5, -5],
            rotate: [0, 10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-2 -right-2 w-10 h-10 rounded-xl bg-accent/30 flex items-center justify-center bg-secondary border border-accent shadow-lg"
        >
          <Sparkles className="w-5 h-5 text-accent" />
        </motion.div>

        {/* Additional floating icon */}
        <motion.div
          animate={{
            y: [5, -5, 5],
            rotate: [0, -10, 0],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
          className="absolute -bottom-2 -left-2 w-10 h-10 rounded-xl bg-primary/30 flex items-center justify-center bg-secondary border border-primary shadow-lg"
        >
          <ArchiveRestore className="w-5 h-5 text-primary" />
        </motion.div>
      </motion.div>

      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-3xl md:text-4xl font-bold bg-linear-to-r from-primary via-accent to-primary bg-clip-text text-transparent mb-4 z-10 relative"
      >
        Trash is Empty
      </motion.h1>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-muted-foreground mb-8 max-w-md text-base md:text-lg z-10 relative"
      >
        No deleted photos here. Items you delete will appear in trash and can be
        restored within 30 days.
      </motion.p>

      {/* Info Box */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-8 p-6 bg-secondary border border-border rounded-2xl max-w-md z-10 relative"
      >
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
          <div className="text-left">
            <h3 className="font-semibold text-foreground mb-1">
              About Trash
            </h3>
            <p className="text-sm text-muted-foreground">
              Deleted photos stay in trash for 30 days before being permanently
              removed. You can restore them anytime during this period.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default EmptyTrash;
