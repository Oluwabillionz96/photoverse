"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import { Rootstate } from "@/lib/store";
import { useGetOnePhotoQuery } from "@/services/api";
import useImageHandler from "@/hooks/useImageHandler";
import DefaultTopBar from "@/components/modals/default/DefaultTopBar";
import TrashTopBar from "@/components/modals/trash/TrashTopBar";
import TrashMobileActions from "@/components/modals/trash/TrashMobileActions";
import DefaultMobileActions from "@/components/modals/default/DefaultMobileActions";
import ModalNavigation from "@/components/modals/ModalNavigation";
import ModalImage from "@/components/modals/ModalImage";
import IndividualPhotoLoader from "@/components/individual-photo-loader";
import { AnimatePresence } from "framer-motion";
import { useSwipeable } from "react-swipeable";

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

interface PhotoViewerProps {
  mode: "view" | "trash";
  navPrefix: string; // e.g., "/photos", "/trash", or "/folders/Travel"
}

export default function PhotoViewer({ mode, navPrefix }: PhotoViewerProps) {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const backUrl = searchParams.get("back") || navPrefix;
  const [showOptions, setShowOptions] = useState(true);

  const photoId = Array.isArray(params.photoId)
    ? params.photoId[0]
    : params.photoId;
  const { photoIds } = useSelector((state: Rootstate) => state.photo);
  const { data: photo, isLoading } = useGetOnePhotoQuery({ id: photoId ?? "" });
  const {
    mutations: {
      toggleIsFavourite,
      movePhotoTotrash,
      restoretrashedPhoto,
      deletePhoto,
    },
    loading: isMutationLoading,
  } = useImageHandler();

  const [direction, setDirection] = useState(0);
  const index = photoIds.indexOf(photoId ?? "");

  const isFirst = index === 0 || index === -1;
  const isLast = index === photoIds.length - 1;

  const handleNext = () => {
    if (!isLast && photoIds[index + 1]) {
      setDirection(1);
      router.push(
        `${navPrefix}/${photoIds[index + 1]}?back=${encodeURIComponent(backUrl)}`,
      );
    }
  };

  const handlePrevious = () => {
    if (!isFirst && photoIds[index - 1]) {
      setDirection(-1);
      router.push(
        `${navPrefix}/${photoIds[index - 1]}?back=${encodeURIComponent(backUrl)}`,
      );
    }
  };

  const handlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrevious,
    onTap: () => setShowOptions(!showOptions),
    trackMouse: true,
  });

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        router.push(backUrl);
      } else if (event.key === "ArrowRight") {
        handleNext();
      } else if (event.key === "ArrowLeft") {
        handlePrevious();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [index, photoIds, backUrl]);

  if (isLoading) {
    return <IndividualPhotoLoader />;
  }

  if (!photo) {
    return (
      <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex flex-col items-center justify-center text-white">
        <p className="text-xl font-semibold mb-4">Photo not found</p>
        <button
          onClick={() => router.push(backUrl)}
          className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
        >
          Go Back
        </button>
      </div>
    );
  }

  const onStandardTrash = async () => {
    const id = photo._id;
    if (photoIds.length <= 1) {
      router.push(backUrl);
    } else if (isLast) {
      handlePrevious();
    } else {
      handleNext();
    }
    await movePhotoTotrash([id]);
  };

  const onTrashRestore = async () => {
    const id = photo._id;
    if (photoIds.length <= 1) {
      router.push(backUrl);
    } else if (isLast) {
      handlePrevious();
    } else {
      handleNext();
    }
    await restoretrashedPhoto([id]);
  };

  const onTrashDelete = async () => {
    const id = photo._id;
    if (photoIds.length <= 1) {
      router.push(backUrl);
    } else if (isLast) {
      handlePrevious();
    } else {
      handleNext();
    }
    await deletePhoto([id]);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center overflow-hidden">
      <div className="relative w-full h-full max-w-7xl max-h-screen md:max-h-[90vh] md:mx-4">
        {showOptions && (
          <>
            {mode === "view" ? (
              <>
                <DefaultTopBar
                  photo={photo}
                  isLoading={isMutationLoading}
                  onClose={() => router.push(backUrl)}
                  onToggleFavorite={() => toggleIsFavourite([photo._id])}
                  onTrash={onStandardTrash}
                />
                <DefaultMobileActions
                  photo={photo}
                  isLoading={isMutationLoading}
                  onToggleFavorite={() => toggleIsFavourite([photo._id])}
                  onTrash={onStandardTrash}
                />
              </>
            ) : (
              <>
                <TrashTopBar
                  photo={photo}
                  timeLeft={getTimeLeft(photo.scheduledDeleteAt)}
                  isLoading={isMutationLoading}
                  onClose={() => router.push(backUrl)}
                  onRestore={onTrashRestore}
                  onDelete={onTrashDelete}
                />
                <TrashMobileActions
                  photo={photo}
                  isLoading={isMutationLoading}
                  onRestore={onTrashRestore}
                  onDelete={onTrashDelete}
                />
              </>
            )}
          </>
        )}

        <div
          className="relative w-full h-full flex items-center justify-center pt-16 pb-20 md:py-0"
          {...handlers}
        >
          <AnimatePresence initial={false} custom={direction}>
            <ModalImage key={photo._id} photo={photo} direction={direction} />
          </AnimatePresence>
        </div>

        {showOptions && (
          <ModalNavigation
            onNext={handleNext}
            onPrevious={handlePrevious}
            isFirst={isFirst}
            isLast={isLast}
          />
        )}
      </div>
    </div>
  );
}
