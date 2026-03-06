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
import TrashTopBar from "./trash/TrashTopBar";
import TrashMobileActions from "./trash/TrashMobileActions";
import ModalNavigation from "./ModalNavigation";

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
            <TrashTopBar
              photo={photo}
              timeLeft={timeLeft}
              isLoading={isLoading}
              onClose={onClose}
              onRestore={async () => {
                await restoretrashedPhoto([photo._id]);
                onClose();
              }}
              onDelete={async () => {
                await deletePhoto([photo._id]);
                onClose();
              }}
            />

            <TrashMobileActions
              photo={photo}
              isLoading={isLoading}
              onRestore={async () => {
                await restoretrashedPhoto([photo._id]);
                onClose();
              }}
              onDelete={async () => {
                await deletePhoto([photo._id]);
                onClose();
              }}
            />

            <ModalNavigation
              onNext={onNext}
              onPrevious={onPrevious}
              isFirst={isFirst}
              isLast={isLast}
            />
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
