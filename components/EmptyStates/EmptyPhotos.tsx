"use client";
import { FolderIcon, ImageIcon, ImagePlusIcon, Sparkles } from "lucide-react";
import { Button } from "../ui/button";
import useScreenSize from "@/hooks/useScreenSize";
import PhotosPreview from "../photosPreview";
import { RefObject } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import ShimmerSweep from "../shimmer-sweep";
import Logo from "../Logo";

const EmptyPhotos = ({
  handleUpload,
  files,
  setFiles,
  ref,
}: {
  handleUpload: (arg: RefObject<HTMLInputElement | null>) => void;
  files: File[];
  ref: RefObject<HTMLInputElement | null>;
  setFiles: (arg: File[]) => void;
}) => {
  const isMobile = useScreenSize();
  const router = useRouter();
  return (
    <>
      {files.length > 0 ? (
        <PhotosPreview files={files} setFiles={setFiles} ref={ref} />
      ) : (
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
              <Logo className="text-primary relative z-10" size="lg" />

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
              <ImageIcon className="w-5 h-5 text-primary" />
            </motion.div>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-4xl font-bold bg-linear-to-r from-primary via-accent to-primary bg-clip-text text-transparent mb-4 z-10 relative"
          >
            No Photos Yet
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-muted-foreground mb-8 max-w-md text-base md:text-lg z-10 relative"
          >
            Start building your collection by uploading your first photos. All
            formats supported.
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
                  handleUpload(ref);
                }}
              >
                <ImagePlusIcon className="w-5 h-5 mr-2" />
                Upload Photos
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                className="w-full sm:w-auto bg-secondary border-border hover:border-primary hover:bg-primary/10 px-8 py-6 text-base"
                onClick={() => {
                  router.push("/folders");
                }}
              >
                <FolderIcon className="w-5 h-5 mr-2" />
                Browse Folders
              </Button>
            </motion.div>
          </motion.div>

          {/* Quick Tip */}
          {!isMobile && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-12 p-6 bg-secondary border border-border rounded-2xl max-w-md z-10 relative"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
                  <Sparkles className="w-5 h-5 text-primary" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-foreground mb-1">
                    Quick Tip
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Drag and drop files directly, or click the upload button to
                    browse your device.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      )}
    </>
  );
};

export default EmptyPhotos;
