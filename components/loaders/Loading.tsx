"use client";

import { motion } from "framer-motion";

export const Loading = () => {
  return (
    <div className="fixed inset-0 z-[999999999] bg-background flex items-center justify-center overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10" />
        
        {/* Pulsing circles */}
        {/* {Array.from({ length: 3 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-primary/10 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{
              width: `${300 + i * 150}px`,
              height: `${300 + i * 150}px`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 2 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.2,
            }}
          />
        ))} */}
      </div>

      {/* Logo filling animation */}
      <div className="relative z-10 flex flex-col items-center gap-6">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            duration: 0.8,
            type: "spring",
            stiffness: 200,
            damping: 20,
          }}
        >
          <svg
            width="120"
            height="120"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Outer circle with filling animation */}
            <motion.circle
              cx="50"
              cy="50"
              r="45"
              stroke="currentColor"
              strokeWidth="3"
              fill="none"
              className="text-primary"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                pathLength: { duration: 1.5, ease: "easeInOut" },
                opacity: { duration: 0.3 },
              }}
            />

            {/* Inner arc with filling animation */}
            <motion.path
              d="M 50 20 A 30 30 0 0 1 50 80"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
              className="text-accent"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                pathLength: { duration: 1.5, ease: "easeInOut", delay: 0.3 },
                opacity: { duration: 0.3, delay: 0.3 },
              }}
            />

            {/* Pulsing glow effect */}
            <motion.circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="currentColor"
              strokeWidth="6"
              className="text-primary opacity-20"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </svg>
        </motion.div>

        {/* Loading text with dots */}
        <motion.div
          className="flex flex-col items-center gap-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Photoverse
          </h2>
          {/* <div className="flex gap-1.5">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-primary to-accent"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.4, 1, 0.4],
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div> */}
        </motion.div>
      </div>
    </div>
  );
};
