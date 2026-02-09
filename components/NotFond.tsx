"use client";
import { motion } from "framer-motion";
import { Home, Search, ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

const NotFond = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center text-center px-6">
      {/* Animated 404 */}
      <motion.div
        className="relative mb-8"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
      >
        <motion.h1
          className="text-[120px] sm:text-[180px] font-bold text-transparent bg-clip-text bg-gradient-to-br from-primary via-accent to-primary"
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            backgroundSize: "200% 200%",
          }}
        >
          404
        </motion.h1>

        {/* Floating elements around 404 */}
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 rounded-full bg-primary/30"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </motion.div>

      {/* Message */}
      <motion.div
        className="mb-8 space-y-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
          Page not found
        </h2>
        <p className="text-muted-foreground text-lg max-w-md">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
      </motion.div>

      {/* Action buttons */}
      <motion.div
        className="flex flex-col sm:flex-row gap-4 w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <Button
          onClick={() => router.back()}
          variant="outline"
          className="flex-1 h-12 rounded-xl border-border/30 hover:border-primary/50 transition-all group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Go Back
        </Button>

        <Link href="/" className="flex-1">
          <Button className="w-full h-12 rounded-xl bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground font-semibold shadow-lg shadow-primary/20 transition-all">
            <Home className="w-4 h-4 mr-2" />
            Home
          </Button>
        </Link>
      </motion.div>

      {/* Quick links */}
      <motion.div
        className="mt-12 pt-8 border-t border-border/30 w-full max-w-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.6 }}
      >
        <p className="text-sm text-muted-foreground mb-4">Quick links</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/folders">
            <Button
              variant="ghost"
              size="sm"
              className="text-primary hover:text-primary/80 hover:bg-primary/10"
            >
              Folders
            </Button>
          </Link>
          <Link href="/photos">
            <Button
              variant="ghost"
              size="sm"
              className="text-primary hover:text-primary/80 hover:bg-primary/10"
            >
              Photos
            </Button>
          </Link>
          {/* <Link href="/auth/login">
            <Button
              variant="ghost"
              size="sm"
              className="text-primary hover:text-primary/80 hover:bg-primary/10"
            >
              Sign In
            </Button>
          </Link> */}
        </div>
      </motion.div>
    </div>
  );
};

export default NotFond;
