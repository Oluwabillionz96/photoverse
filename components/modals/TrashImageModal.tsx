"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  X,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  Trash2,
  RotateCcw,
  Clock,
} from "lucide-react";
import { Photo } from "@/lib/apiTypes";
import { cloudinaryLoader } from "../ImageGrid";
import { useSwipeable } from "react-swipeable";
import { motion, AnimatePresence } from "framer-motion";
import IndividualPhotoLoader from "../individual-photo-loader";
import useImageHandler from "@/hooks/useImageHandler";

interface TrashImageModalProps {
  photos: Photo[];
  selectedIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onChangeIndex: (index: number) => void;
}

function getTimeLeft(scheduledDeleteAt: string) {
  const now = new Date().getTime();
  const deleteAt = new Date(scheduledDeleteAt).getTime();
  const diff = deleteAt - now;

  if (diff <= 0) return "Deleting soon";

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  if (days > 0) return `${days} day${days !== 1 ? "s" : ""} left`;
  if (hours > 0) return `${hours} hour${hours !== 1 ? "s" : ""} left`;

  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  return `${minutes} min${minutes !== 1 ? "s" : ""} left`;
}

export default function TrashImageModal({
  photos,
  selectedIndex,
  isOpen,
  onClose,
  onChangeIndex,
}: TrashImageModalProps) {
  const [showOptions, setShowOptions] = useState(true);
  const [imageLoading, setImageLoading] = useState(true);
  const [direction, setDirection] = useState(0);
  const {
    mutations: { restoretrashedPhoto, deletePhoto },
    loading: isLoading,
  } = useImageHandler();

  const photo = photos[selectedIndex];
  const isFirst = selectedIndex === 0;
  const isLast = selectedIndex === photos.length - 1;

  const onNext = () => {
    if (!isLast) {
      setDirection(1);
      setImageLoading(true);
      onChangeIndex(selectedIndex + 1);
    }
  };

  const onPrevious = () => {
    if (!isFirst) {
      setDirection(-1);
      setImageLoading(true);
      onChangeIndex(selectedIndex - 1);
    }
  };

  const handler = useSwipeable({
    onSwipedRight: onPrevious,
    onSwipedLeft: onNext,
    onTap: () => setShowOptions(!showOptions),
  });

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      else if (event.key === "ArrowRight") onNext();
      else if (event.key === "ArrowLeft") onPrevious();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, selectedIndex]);

  if (!isOpen || !photo) return null;

  const timeLeft = getTimeLeft(photo.scheduledDeleteAt);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/85 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative z-10 md:max-w-7xl md:max-h-[90vh] h-full w-full md:mx-4">
        {showOptions && (
          <>
            {/* Top Bar */}
            <div className="absolute top-4 z-20 flex justify-between items-center w-full px-4">
              {/* Close button */}
              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 bg-transparent hover:bg-white/10 text-white rounded-full transition-colors"
              >
                <div className="lg:hidden">
                  <ArrowLeft className="w-7 h-7" />
                </div>
                <div className="hidden lg:block">
                  <X className="w-7 h-7" />
                </div>
              </motion.button>

              {/* Time left badge */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/20"
              >
                <Clock className="w-4 h-4 text-orange-400" />
                <span className="text-sm font-semibold text-white">
                  {timeLeft}
                </span>
              </motion.div>

              {/* Desktop Action Buttons */}
              <div className="hidden md:flex items-center gap-2">
                <motion.button
                  onClick={async () => {
                    await restoretrashedPhoto([photo._id]);
                    onClose();
                  }}
                  disabled={isLoading}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full glass border border-white/20 hover:bg-emerald-500/20 hover:border-emerald-500/50 flex items-center justify-center transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Restore"
                >
                  <RotateCcw className="w-5 h-5 text-white" />
                </motion.button>

                <motion.button
                  onClick={async () => {
                    await deletePhoto([photo._id]);
                    onClose();
                  }}
                  disabled={isLoading}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full glass border border-white/20 hover:bg-red-500/20 hover:border-red-500/50 flex items-center justify-center transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Delete Permanently"
                >
                  <Trash2 className="w-5 h-5 text-white" />
                </motion.button>
              </div>

              {/* Placeholder for spacing on mobile */}
              <div className="w-11 md:hidden" />
            </div>

            {/* Bottom Action Bar (Mobile Only) */}
            <div className="absolute bottom-28 z-20 flex justify-center items-center w-full px-4 md:hidden">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="flex items-center gap-4 px-6 py-3 rounded-2xl glass border border-white/20"
              >
                {/* Restore Button */}
                <motion.button
                  onClick={async () => {
                    await restoretrashedPhoto([photo._id]);
                    onClose();
                  }}
                  disabled={isLoading}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-emerald-500/20 border border-white/20 hover:border-emerald-500/50 text-white font-semibold text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <RotateCcw className="w-4 h-4" />
                  Restore
                </motion.button>

                {/* Separator */}
                <div className="w-px h-8 bg-white/20" />

                {/* Delete Permanently Button */}
                <motion.button
                  onClick={async () => {
                    await deletePhoto([photo._id]);
                    onClose();
                  }}
                  disabled={isLoading}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-red-500/20 border border-white/20 hover:border-red-500/50 text-white font-semibold text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </motion.button>
              </motion.div>
            </div>

            {/* Desktop Navigation */}
            <div className="absolute bottom-20 lg:flex justify-center gap-6 w-full z-20 hidden">
              <button
                onClick={onPrevious}
                className="p-3 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isFirst}
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={onNext}
                className="p-3 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLast}
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </>
        )}

        {/* Image Container */}
        {isLoading ? (
          <IndividualPhotoLoader />
        ) : (
          <div
            className="relative w-full h-full flex items-center justify-center overflow-hidden"
            {...handler}
          >
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                className="absolute inset-0 flex items-center justify-center max-w-full max-h-full mx-2 md:mx-0"
                key={photo._id}
                custom={direction}
                variants={{
                  enter: (dir: number) => ({
                    x: dir > 0 ? 300 : -300,
                    opacity: 0,
                  }),
                  center: {
                    zIndex: 1,
                    x: 0,
                    opacity: 1,
                  },
                  exit: (dir: number) => ({
                    zIndex: 0,
                    x: dir < 0 ? 300 : -300,
                    opacity: 0,
                  }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
              >
              <Image
                src={photo.link || "/placeholder.svg"}
                alt="Trashed photo"
                width={1200}
                height={800}
                className="min-w-full max-h-[80vh] object-contain"
                priority
                loader={cloudinaryLoader}
                loading="eager"
                onLoad={() => setImageLoading(false)}
              />
              {imageLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <IndividualPhotoLoader />
                </div>
              )}
              </motion.div>
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
