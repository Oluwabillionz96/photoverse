"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Photo } from "@/lib/apiTypes";
import { cloudinaryLoader } from "./ImageGrid";
import { Button } from "./ui/button";
import { FaRegStar, FaRegTrashAlt } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import { GrDownload } from "react-icons/gr";
import { useSwipeable } from "react-swipeable";
import { motion } from "framer-motion";
import { useToggleFavouriteMutation } from "@/services/api";
import toast from "react-hot-toast";

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
  disable: "left" | "right" | "";
  totalCount: number;
}

export function ImageModal({
  photo,
  isOpen,
  onClose,
  onNext,
  onPrevious,
  disable,
  totalCount,
}: ImageModalProps) {
  const [showOptions, setShowOptions] = useState(true);
  const [side, setSide] = useState<"" | "right" | "left">("");
  const [toggleFavourite, { isLoading }] = useToggleFavouriteMutation();

  async function toggleIsFavourite() {
    const payload = {
      id: photo._id,
      isFavourite: !photo.isFavourite,
      folder: photo.folder,
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
      setSide("right");
    },
    onSwipedLeft: () => {
      onNext();
      setSide("left");
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
          <div className="absolute top-4 z-20 flex justify-between  w-full">
            <Button
              onClick={() => {
                onClose();
                setSide("");
              }}
              className="  p-2 bg-transparent hover:bg-transparent text-white "
            >
              <div className="lg:hidden">
                <ArrowLeft className="w-8 h-8" />
              </div>
              <div className="hidden lg:block hover:cursor-pointer">
                <X className="w-8 h-8" />
              </div>
            </Button>
            <Button
              onClick={onClose}
              className="  p-2 bg-transparent hover:bg-transparent text-white "
            >
              <BsThreeDotsVertical />
            </Button>
          </div>
        )}

        {/* Navigation Buttons */}

        {/* Image Container */}
        <div
          className="relative w-full h-full flex items-center justify-center"
          {...handler}
        >
          <motion.div
            className="relative max-w-full max-h-full mx-2 md:mx-0"
            initial={{ x: side === "right" ? -500 : 500, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: side === "right" ? 500 : -500, opacity: 0 }}
            transition={{ duration: 0.2 }}
            key={photo._id}
          >
            <Image
              src={photo.link || "/placeholder.svg"}
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

        {/* Image Info */}
        {showOptions && (
          <div className="absolute bottom-0 left-0 right-0 z-20">
            <div className="bg-black/50 backdrop-blur-sm text-white p-4 flex justify-between md:hidden">
              <GrDownload />
              <button className="bg-transparent" onClick={toggleIsFavourite}>
                {photo.isFavourite ? <FaStar /> : <FaRegStar />}
              </button>
              <FaRegTrashAlt />
            </div>
          </div>
        )}
        <div className="absolute bottom-0 lg:flex justify-center gap-6 w-full z-20 hidden">
          <button
            onClick={() => {
              onPrevious();
              setSide("right");
            }}
            className=" translate-y-1/2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer  p-3 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
            disabled={disable === "left"}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={() => {
              onNext();
              setSide("left");
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
