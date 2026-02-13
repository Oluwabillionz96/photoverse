"use client";
import { motion } from "framer-motion";
import { Trash2, Clock, Sparkles } from "lucide-react";
import Logo from "./Logo";

const ComingSoon = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <motion.div
          className="absolute top-20 left-10 w-64 h-64 rounded-full bg-linear-to-br from-primary/30 to-transparent blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-linear-to-br from-accent/30 to-transparent blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(var(--primary-rgb),0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(var(--primary-rgb),0.03)_1px,transparent_1px)] bg-size-[50px_50px]" />

        {/* Diagonal Stripes */}
        <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_35px,rgba(var(--primary-rgb),0.02)_35px,rgba(var(--primary-rgb),0.02)_70px)]" />

        {/* Radial Gradient Circles */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[radial-gradient(circle,rgba(var(--primary-rgb),0.05)_0%,transparent_70%)]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-[radial-gradient(circle,rgba(var(--accent-rgb),0.05)_0%,transparent_70%)]" />

        {/* Geometric Shapes */}
        <motion.div
          className="absolute top-1/3 right-1/4 w-32 h-32 border border-primary/10 rotate-45"
          animate={{
            rotate: [45, 225, 45],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute bottom-1/3 left-1/4 w-24 h-24 border border-accent/10 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Animated Lines */}
        <svg className="absolute inset-0 w-full h-full">
          <motion.line
            x1="0%"
            y1="30%"
            x2="100%"
            y2="30%"
            stroke="oklch(var(--primary))"
            strokeWidth="1"
            strokeOpacity="0.1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          <motion.line
            x1="0%"
            y1="70%"
            x2="100%"
            y2="70%"
            stroke="oklch(var(--accent))"
            strokeWidth="1"
            strokeOpacity="0.1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear",
              delay: 1,
            }}
          />
          {/* Diagonal Lines */}
          <motion.line
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
            stroke="oklch(var(--primary))"
            strokeWidth="1"
            strokeOpacity="0.05"
            strokeDasharray="10 10"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          <motion.line
            x1="100%"
            y1="0%"
            x2="0%"
            y2="100%"
            stroke="oklch(var(--accent))"
            strokeWidth="1"
            strokeOpacity="0.05"
            strokeDasharray="10 10"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "linear",
              delay: 0.5,
            }}
          />
        </svg>

        {/* Mesh/Net Pattern */}
        <svg
          className="absolute inset-0 w-full h-full"
          style={{ opacity: 0.4 }}
        >
          {/* Horizontal lines */}
          {[...Array(6)].map((_, i) => (
            <motion.line
              key={`h-${i}`}
              x1="0%"
              y1={`${(i + 1) * 15}%`}
              x2="100%"
              y2={`${(i + 1) * 15}%`}
              stroke="oklch(var(--primary))"
              strokeWidth="1"
              strokeOpacity="0.6"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: 2,
                delay: i * 0.15,
                ease: "easeInOut",
              }}
            />
          ))}
          {/* Vertical lines */}
          {[...Array(6)].map((_, i) => (
            <motion.line
              key={`v-${i}`}
              x1={`${(i + 1) * 15}%`}
              y1="0%"
              x2={`${(i + 1) * 15}%`}
              y2="100%"
              stroke="oklch(var(--accent))"
              strokeWidth="1"
              strokeOpacity="0.6"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: 2,
                delay: i * 0.15 + 0.5,
                ease: "easeInOut",
              }}
            />
          ))}
          {/* Connection nodes at intersections */}
          {[...Array(6)].map((_, i) =>
            [...Array(6)].map((_, j) => (
              <motion.circle
                key={`node-${i}-${j}`}
                cx={`${(i + 1) * 15}%`}
                cy={`${(j + 1) * 15}%`}
                r="3"
                fill="oklch(var(--primary))"
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: [0, 1.2, 1],
                  opacity: [0, 0.8, 0.6],
                }}
                transition={{
                  duration: 1.5,
                  delay: (i + j) * 0.08,
                  ease: "easeOut",
                }}
              />
            )),
          )}
        </svg>

        {/* Hexagon Pattern */}
        <div className="absolute inset-0 opacity-10">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={`hex-${i}`}
              className="absolute w-16 h-16 border-2 border-primary"
              style={{
                left: `${(i % 5) * 20 + 10}%`,
                top: `${Math.floor(i / 5) * 25 + 10}%`,
                clipPath:
                  "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.3, scale: 1 }}
              transition={{
                duration: 1,
                delay: i * 0.1,
                ease: "easeOut",
              }}
            />
          ))}
        </div>

        {/* Floating Dots */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-primary/20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="w-full max-w-2xl mx-auto text-center space-y-8 relative z-10">
        {/* Icon Section */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", duration: 0.8 }}
          className="relative mx-auto w-32 h-32 mb-8"
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
            className="w-full h-full rounded-3xl bg-linear-to-br from-primary/20 via-accent/20 to-primary/20 flex items-center justify-center glass border border-border/30 shadow-2xl relative overflow-hidden"
          >
            <Trash2 className="w-16 h-16 text-primary relative z-10" />

            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent"
              animate={{
                x: ["-100%", "200%"],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                repeatDelay: 1,
              }}
            />
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
            className="absolute -top-2 -right-2 w-10 h-10 rounded-xl bg-linear-to-br from-accent/30 to-primary/30 flex items-center justify-center glass border border-accent/30 shadow-lg"
          >
            <Sparkles className="w-5 h-5 text-accent" />
          </motion.div>

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
            className="absolute -bottom-2 -left-2 w-10 h-10 rounded-xl bg-linear-to-br from-primary/30 to-accent/30 flex items-center justify-center glass border border-primary/30 shadow-lg"
          >
            <Clock className="w-5 h-5 text-primary" />
          </motion.div>
        </motion.div>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-border/30 text-sm font-medium"
        >
          <Sparkles className="w-4 h-4 text-primary" />
          Feature in Development
        </motion.div>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-4"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            This feature is
            <span className="block bg-linear-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              coming soon
            </span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto">
            We&apos;re working hard to bring you something amazing. This feature
            will be available in an upcoming update.
          </p>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="pt-8"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 glass border border-border/30 rounded-2xl">
            <Logo className="text-primary" size="sm" />
            <span className="text-sm text-muted-foreground">
              Stay tuned for updates
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ComingSoon;
