"use client";
import { motion } from "framer-motion";
import { FolderIcon } from "lucide-react";
import Logo from "../Logo";
import ShimmerSweep from "../shimmer-sweep";

const FolderLoader = () => {
  return (
    <div className="grid lg:grid-cols-4 grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
      {Array.from({ length: 8 }, (_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          className="group relative overflow-hidden rounded-xl glass border border-border/30 transition-all"
        >
          {/* Image area with linear placeholder */}
          <div className="relative aspect-4/3 bg-linear-to-br from-primary/10 via-accent/10 to-primary/10 flex items-center justify-center overflow-hidden">
            {/* Logo in center */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.3, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.05 + 0.2 }}
            >
              <Logo className="text-foreground/20" size="md" />
            </motion.div>

            {/* Shimmer effect */}
            <ShimmerSweep duration={1.5} via="white/10" />

            {/* Folder icon in top right */}
            <div className="absolute right-3 top-3 w-8 h-8 rounded-lg glass border border-border/30 flex items-center justify-center">
              <FolderIcon className="w-4 h-4 text-muted-foreground/50" />
            </div>
          </div>

          {/* Folder Info */}
          <div className="p-4 space-y-2">
            <motion.div
              className="h-5 w-3/4 rounded-md glass border border-border/30"
              animate={{
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.1,
              }}
            />
            <motion.div
              className="h-4 w-1/2 rounded-md glass border border-border/30"
              animate={{
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.1 + 0.2,
              }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default FolderLoader;
