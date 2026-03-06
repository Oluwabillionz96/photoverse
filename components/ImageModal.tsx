"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, ArrowLeft, Trash2 } from "lucide-react";
import { Photo } from "@/lib/apiTypes";
import { cloudinaryLoader } from "./ImageGrid";
import { Button } from "./ui/button";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { GrDownload } from "react-icons/gr";
import { useSwipeable } from "react-swipeable";
import { motion, AnimatePresence } from "framer-motion";
import IndividualPhotoLoader from "./individual-photo-loader";
import useImageHandler from "@/hooks/useImageHandler";
import { useRouter } from "next/navigation";
import DefaultTopBar from "./modals/default/DefaultTopBar";
import ModalNavigation from "./modals/ModalNavigation";
import ModalImage from "./modals/ModalImage";

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
  const [direction, setDirection] = useState(0);
  const {
    mutations: { toggleIsFavourite, movePhotoTotrash },
    loading: isLoading,
  } = useImageHandler();
  const router = useRouter();

  const handleNext = () => {
    if (disable !== "right") {
      setDirection(1);
      onNext();
    }
  };

  const handlePrevious = () => {
    if (disable !== "left") {
      setDirection(-1);
      onPrevious();
    }
  };

  const handler = useSwipeable({
    onSwipedRight: handlePrevious,
    onSwipedLeft: handleNext,
    onTap: () => setShowOptions(!showOptions),
  });
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      } else if (event.key === "ArrowRight") {
        handleNext();
      } else if (event.key === "ArrowLeft") {
        handlePrevious();
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
        {showOptions && photo && (
          <DefaultTopBar
            photo={photo}
            isLoading={isLoading}
            onClose={onClose}
            onToggleFavorite={() => toggleIsFavourite([photo._id])}
            onTrash={async () => {
              await movePhotoTotrash([photo._id]);
              onClose();
              router.back();
            }}
          />
        )}

        {/* Navigation Buttons */}

        {/* Image Container */}
        {loading || isLoading ? (
          <IndividualPhotoLoader />
        ) : (
          <div
            className="relative w-full h-full flex items-center justify-center overflow-hidden"
            {...handler}
          >
            <AnimatePresence initial={false} custom={direction}>
              {photo && (
                <ModalImage
                  key={photo._id}
                  photo={photo}
                  direction={direction}
                />
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Navigation Buttons - Desktop */}
        <ModalNavigation
          onNext={handleNext}
          onPrevious={handlePrevious}
          isFirst={disable === "left"}
          isLast={disable === "right"}
        />
      </div>
    </div>
  );
}
