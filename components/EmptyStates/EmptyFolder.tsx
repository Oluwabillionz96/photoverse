"use client";
import { FolderIcon, FolderPlusIcon, ImageIcon, Sparkles } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import useModalContext from "@/hooks/useModalContext";
import { motion } from "framer-motion";
import ShimmerSweep from "../shimmer-sweep";

const EmptyFolder = () => {
  const router = useRouter();
  const { changeModalStatus: setModalStatus } = useModalContext();
  return (
    <div className="flex flex-col items-center justify-center min-h-fit text-center px-4 pb-6 md:pb-4 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden">
        <motion.div
          className="absolute top-10 left-10 w-40 h-40 rounded-full bg-primary/30 blur-3xl"
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
          className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-accent/30 blur-3xl"
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
          <FolderIcon className="w-16 h-16 text-primary relative z-10" />

          {/* Shimmer effect */}
          <ShimmerSweep via="via-white/10" duration={2} repeatDelay={1} />
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
          <FolderPlusIcon className="w-5 h-5 text-primary" />
        </motion.div>
      </motion.div>

      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-3xl md:text-4xl font-bold text-foreground mb-4 z-10 relative"
      >
        No Folders Yet
      </motion.h1>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-muted-foreground mb-8 max-w-md text-base md:text-lg z-10 relative"
      >
        Create your first folder to organize your files and keep everything tidy
      </motion.p>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto z-10 relative"
      >
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/50 px-8 py-6 text-base"
            onClick={() => {
              setModalStatus("foldername");
            }}
          >
            <FolderPlusIcon className="w-5 h-5 mr-2" />
            Create New Folder
          </Button>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="outline"
            className="w-full sm:w-auto bg-secondary border-border hover:border-primary hover:bg-primary/10 px-8 py-6 text-base"
            onClick={() => {
              router.push("/photos");
            }}
          >
            <ImageIcon className="w-5 h-5 mr-2" />
            Browse Photos
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default EmptyFolder;
