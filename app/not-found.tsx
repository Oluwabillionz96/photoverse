"use client";
import NotFond from "@/components/NotFond";
import { motion } from "framer-motion";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-background">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10" />
        
        {/* Floating circles */}
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={`circle-${i}`}
            className="absolute rounded-full bg-primary/8"
            style={{
              width: `${200 + i * 120}px`,
              height: `${200 + i * 120}px`,
              left: `${-5 + i * 25}%`,
              top: `${5 + i * 18}%`,
            }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.6, 0.3],
              x: [0, i % 2 === 0 ? 30 : -30, 0],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: 'radial-gradient(circle, oklch(var(--primary) / 0.5) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        {/* Floating squares */}
        {Array.from({ length: 3 }).map((_, i) => (
          <motion.div
            key={`square-${i}`}
            className="absolute bg-accent/6 rounded-lg"
            style={{
              width: `${100 + i * 60}px`,
              height: `${100 + i * 60}px`,
              right: `${5 + i * 20}%`,
              bottom: `${10 + i * 25}%`,
            }}
            animate={{
              rotate: [0, 180, 360],
              scale: [1, 1.1, 1],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 15 + i * 3,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="w-full flex items-center justify-center p-6 relative z-10">
        <NotFond />
      </div>
    </div>
  );
};
export default NotFoundPage;
