"use client";

import { useEffect } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Photo } from "@/lib/apiTypes";
import { cloudinaryLoader } from "./ImageGrid";

// interface Photo {
//   id: number;
//   src: string;
//   alt: string;
//   title: string;
// }

interface ImageModalProps {
  photo: Photo;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
  currentIndex: number;
  totalCount: number;
}

export function ImageModal({
  photo,
  isOpen,
  onClose,
  onNext,
  onPrevious,
  currentIndex,
  totalCount,
}: ImageModalProps) {
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
      <div className="relative z-10 max-w-7xl max-h-[90vh] w-full mx-4">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Navigation Buttons */}
        <button
          onClick={onPrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={onNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Image Container */}
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="relative max-w-full max-h-full">
            <Image
              src={photo.link || "/placeholder.svg"}
              alt={"Image"}
              width={1200}
              height={800}
              className="max-w-full max-h-[80vh] object-contain"
              priority
              loader={cloudinaryLoader}
              loading="eager"
            />
          </div>
        </div>

        {/* Image Info */}
        <div className="absolute bottom-4 left-4 right-4 z-20">
          <div className="bg-black/50 backdrop-blur-sm text-white p-4 rounded-lg">
            {/* <h3 className="text-lg font-semibold mb-1">{photo.title}</h3> */}
            <p className="text-sm text-gray-300">
              {currentIndex + 1} of {totalCount}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
