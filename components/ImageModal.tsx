"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react";
import { Photo } from "@/lib/apiTypes";
import { cloudinaryLoader } from "./ImageGrid";
import { Button } from "./ui/button";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { GrDownload } from "react-icons/gr";
import { useSwipeable } from "react-swipeable";
import { motion } from "framer-motion";
import { useToggleFavouriteMutation } from "@/services/api";
import toast from "react-hot-toast";
import Logo from "./Logo";
import ShimmerSweep from "./shimmer-sweep";

// interface Photo {
//   id: number;
//   src: string;
//   alt: string;
//   title: string;
// }

interface ImageModalProps {
  photo: Photo | undefined;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
  disable: "left" | "right" | "";
  loading: boolean;
}

export function ImageModal({
  photo,
  isOpen,
  onClose,
  onNext,
  onPrevious,
  disable,
  loading,
}: ImageModalProps) {
  const [showOptions, setShowOptions] = useState(true);
  // const [side, setSide] = useState<"" | "right" | "left">("");
  const [toggleFavourite, { isLoading }] = useToggleFavouriteMutation();

  async function toggleIsFavourite() {
    const payload = {
      id: photo?._id,
      isFavourite: !photo?.isFavourite,
      folder: photo?.folder,
    };

    const response = await toggleFavourite(payload);
    if ("data" in response) {
      toast.success(response.data?.message);
    } else if ("error" in response) {
      const error = response.error as {
        status?: number | string;
        data?: { error: string };
      };

      const message =
        error?.data?.error ||
        (error?.status === "FETCH_ERROR"
          ? "Network error. Please check your connection."
          : "An unexpected error occurred.");

      toast.error(message);
    }
  }

  const handler = useSwipeable({
    onSwipedRight: () => {
      onPrevious();
      // setSide("right");
    },
    onSwipedLeft: () => {
      onNext();
      // setSide("left");
    },
    onTap: () => setShowOptions(!showOptions),
  });
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      } else if (event.key === "ArrowRight") {
        onNext();
      } else if (event.key === "ArrowLeft") {
        onPrevious();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose, onNext, onPrevious]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content */}

      <div className="relative z-10 md:max-w-7xl md:max-h-[90vh] h-full w-full md:mx-4">
        {showOptions && (
          <div className="absolute top-4 z-20 flex justify-between items-center w-full px-4">
            <Button
              onClick={() => {
                onClose();
              }}
              className="p-2 bg-transparent hover:bg-white/10 text-white focus:outline-none border-0 rounded-full"
            >
              <div className="lg:hidden">
                <ArrowLeft className="w-8 h-8" />
              </div>
              <div className="hidden lg:block hover:cursor-pointer">
                <X className="w-8 h-8" />
              </div>
            </Button>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              {/* Download Button */}
              <motion.a
                href={
                  photo?.link?.replace("/upload/", "/upload/fl_attachment/") ||
                  ""
                }
                download
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-full glass border border-white/20 hover:bg-white/10 flex items-center justify-center transition-all"
                title="Download"
              >
                <GrDownload className="w-5 h-5 text-white" />
              </motion.a>

              {/* Favorite Button */}
              <motion.button
                onClick={toggleIsFavourite}
                disabled={isLoading}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`w-10 h-10 rounded-full glass border transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed ${
                  photo?.isFavourite
                    ? "border-pink-500/50 bg-pink-500/20"
                    : "border-white/20 hover:bg-white/10"
                }`}
                title={
                  photo?.isFavourite
                    ? "Remove from favorites"
                    : "Add to favorites"
                }
              >
                {photo?.isFavourite ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 15 }}
                  >
                    <FaHeart className="w-5 h-5 text-pink-500" />
                  </motion.div>
                ) : (
                  <FaRegHeart className="w-5 h-5 text-white" />
                )}
              </motion.button>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}

        {/* Image Container */}
        {loading || isLoading ? (
          <div className="w-full h-full grid place-items-center">
            <motion.div
              className="relative w-64 h-64 rounded-2xl bg-linear-to-br from-primary/20 via-accent/20 to-primary/20 flex items-center justify-center overflow-hidden"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              {/* Logo */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.6, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Logo className="text-foreground/40" size="lg" />
              </motion.div>

              {/* Shimmer effect */}

              <ShimmerSweep duration={1.5} via="white/20" />

              {/* Pulsing ring */}
              <motion.div
                className="absolute inset-0 border-4 border-primary/30 rounded-2xl"
                animate={{
                  scale: [1, 1.05, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          </div>
        ) : (
          <div
            className="relative w-full h-full flex items-center justify-center"
            {...handler}
          >
            <motion.div
              className="relative max-w-full max-h-full mx-2 md:mx-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              key={photo?._id}
            >
              <Image
                src={photo?.link || "/placeholder.svg"}
                alt={"Image"}
                width={1200}
                height={800}
                className="min-w-full max-h-[80vh] object-contain"
                priority
                loader={cloudinaryLoader}
                loading="eager"
              />
            </motion.div>
          </div>
        )}

        {/* Navigation Buttons - Desktop */}
        <div className="absolute bottom-0 lg:flex justify-center gap-6 w-full z-20 hidden">
          <button
            onClick={() => {
              onPrevious();
              // setSide("right");
            }}
            className=" translate-y-1/2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer  p-3 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
            disabled={disable === "left"}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={() => {
              onNext();
              // setSide("left");
            }}
            className=" translate-y-1/2  p-3 bg-black/50 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed  text-white rounded-full hover:bg-black/70 transition-colors"
            disabled={disable === "right"}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
