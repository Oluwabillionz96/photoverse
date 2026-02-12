"use client";

import { motion } from "framer-motion";

const PhotoLoader = () => {
  return (
    <div className="space-y-8 pt-5 mx-2">
      {/* Show 2-3 month sections */}
      {Array.from({ length: 3 }).map((_, monthIndex) => (
        <div key={monthIndex} className="space-y-4">
          {/* Month header skeleton */}
          <motion.div
            className="h-7 w-40 bg-border/40 rounded-lg"
            animate={{
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Photo grid skeleton */}
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-[0.1rem]">
            {Array.from({
              length: monthIndex === 0 ? 12 : monthIndex === 1 ? 18 : 6,
            }).map((_, index) => (
              <motion.div
                key={index}
                className="aspect-square bg-border/30 relative overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 0.3,
                  delay: monthIndex * 0.1 + index * 0.02,
                }}
              >
                {/* Simple shimmer sweep */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-border/40 to-transparent"
                  animate={{
                    x: ["-100%", "200%"],
                  }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.05,
                  }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PhotoLoader;
