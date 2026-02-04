"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Image, Sparkles } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const FloatingElement = ({
  delay = 0,
  children,
  className = "",
}: {
  delay?: number;
  children: React.ReactNode;
  className?: string;
}) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.8, ease: "easeOut" }}
  >
    <motion.div
      animate={{ y: [-5, 5, -5] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  </motion.div>
);

const GeometricShape = ({
  className = "",
  delay = 0,
}: {
  className?: string;
  delay?: number;
}) => (
  <motion.div
    className={`absolute ${className}`}
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 0.6, scale: 1 }}
    transition={{ delay, duration: 1.2, ease: "easeOut" }}
  >
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      className="w-full h-full border border-primary/20 rounded-lg backdrop-blur-sm"
    />
  </motion.div>
);

const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <GeometricShape className="w-32 h-32 top-20 left-10" delay={0.2} />
        <GeometricShape className="w-24 h-24 top-40 right-20" delay={0.4} />
        <GeometricShape className="w-40 h-40 bottom-32 left-1/4" delay={0.6} />
        <GeometricShape className="w-28 h-28 bottom-20 right-10" delay={0.8} />

        {/* Enhanced floating particles */}
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 bg-primary/60 rounded-full"
            style={{
              left: `${15 + i * 12}%`,
              top: `${25 + i * 8}%`,
            }}
            animate={{
              y: [-15, 15, -15],
              opacity: [0.3, 0.8, 0.3],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Enhanced mouse follower effect */}
      <motion.div
        className="fixed w-[500px] h-[500px] pointer-events-none z-0"
        style={{
          background: `radial-gradient(circle, oklch(0.72 0.28 240 / 0.06) 0%, oklch(0.68 0.22 180 / 0.04) 40%, transparent 70%)`,
        }}
        animate={{
          x: mousePosition.x - 250,
          y: mousePosition.y - 250,
        }}
        transition={{ type: "spring", damping: 25, stiffness: 150 }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-screen py-16">
          <div className="space-y-6 lg:space-y-8 text-center lg:text-left">
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-balance"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                Your photos,
                <motion.span
                  className="text-gradient-primary"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                >
                  {" "}
                  everywhere
                </motion.span>{" "}
                you need them
              </motion.h1>

              <motion.p
                className="text-lg sm:text-xl text-muted-foreground text-pretty max-w-2xl mx-auto lg:mx-0 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                Upload, organize, and access your photos from any device. Free
                up storage on your phone while keeping your memories safe in the
                cloud.{" "}
                <span className="text-accent font-semibold">
                  Completely free, forever.
                </span>
              </motion.p>
            </motion.div>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <Link href={"/auth/login"}>
                <Button
                  size="lg"
                  className="text-base w-full sm:w-auto bg-primary hover:bg-primary/90 animate-pulse-glow"
                >
                  <Sparkles className="mr-2 h-4 w-4" />
                  Try Now - Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href={"/photos"}>
                <Button
                  variant="outline"
                  size="lg"
                  className="text-base bg-transparent w-full sm:w-auto border-primary/30 hover:border-primary/60 hover:bg-primary/5"
                >
                  <Image className="w-4 h-4 mr-2" />
                  Upload Photo
                </Button>
              </Link>
            </motion.div>

            <motion.div
              className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              {[
                { label: "100% Free", color: "primary" },
                { label: "Secure storage", color: "accent" },
                { label: "Cross-platform", color: "primary" },
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  className="flex items-center space-x-2"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                >
                  <div
                    className={`w-2 h-2 rounded-full animate-pulse ${
                      item.color === "primary" ? "bg-primary" : "bg-accent"
                    }`}
                  ></div>
                  <span className="text-muted-foreground">{item.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Modern visualization instead of phone mockup */}
          <div className="relative order-first lg:order-last">
            <FloatingElement
              delay={0.4}
              className="relative mx-auto w-full max-w-lg"
            >
              {/* Main visualization container */}
              <motion.div
                className="relative glass rounded-3xl p-8 shadow-2xl"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="text-lg font-semibold">Gallery</div>
                  <div className="text-sm text-muted-foreground flex items-center gap-2">
                    <motion.div
                      className="w-2 h-2 bg-accent rounded-full"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    1,247 photos
                  </div>
                </div>

                {/* Photo grid visualization */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {[
                    "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=400&fit=crop&crop=face",
                    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
                    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
                    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
                    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face",
                    "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop&crop=face",
                    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
                    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face",
                    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face",
                  ].map((imageUrl, i) => (
                    <motion.div
                      key={i}
                      className="aspect-square rounded-xl border border-border/30 backdrop-blur-sm overflow-hidden relative group"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6 + i * 0.1, duration: 0.5 }}
                      whileHover={{
                        scale: 1.05,
                        borderColor: "oklch(0.65 0.2 240 / 0.5)",
                      }}
                    >
                      {/* Real photo images */}
                      <img
                        src={imageUrl}
                        alt={`Gallery photo ${i + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // Fallback to gradient if image doesn't load
                          const target = e.target as HTMLImageElement;
                          target.style.display = "none";
                          const parent = target.parentElement;
                          if (parent) {
                            parent.classList.add(
                              i === 0
                                ? "bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500"
                                : i === 1
                                  ? "bg-gradient-to-br from-green-400 via-blue-500 to-purple-600"
                                  : i === 2
                                    ? "bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500"
                                    : i === 3
                                      ? "bg-gradient-to-br from-pink-400 via-red-500 to-yellow-500"
                                      : i === 4
                                        ? "bg-gradient-to-br from-indigo-400 via-purple-500 to-pink-500"
                                        : i === 5
                                          ? "bg-gradient-to-br from-teal-400 via-cyan-500 to-blue-500"
                                          : i === 6
                                            ? "bg-gradient-to-br from-orange-400 via-pink-500 to-red-500"
                                            : i === 7
                                              ? "bg-gradient-to-br from-violet-400 via-purple-500 to-indigo-500"
                                              : "bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-500",
                            );
                          }
                        }}
                      />

                      {/* Photo overlay effect */}
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                    </motion.div>
                  ))}
                </div>

                {/* Status bar */}
                <div className="flex justify-between items-center">
                  <div className="text-xs text-muted-foreground">
                    Recent uploads
                  </div>
                  <div className="flex space-x-1">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-2 h-2 bg-primary rounded-full"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          delay: i * 0.2,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Floating badge */}
              <motion.div
                className="absolute -top-4 -right-4 bg-gradient-to-r from-primary to-accent text-primary-foreground px-4 py-2 rounded-full text-sm font-medium shadow-lg"
                initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                Free Upload!
              </motion.div>
            </FloatingElement>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
