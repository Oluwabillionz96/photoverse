import Link from "next/link";
import {
  Dispatch,
  MouseEvent,
  SetStateAction,
  useCallback,
  useRef,
} from "react";
import PlaceHolder from "./placeholder";
import ContextModal from "./modals/ContextModal";
import Image from "next/image";
import { handleImageError, handleImageLoad } from "@/lib/utils";
import { FaHeart } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { Photo } from "@/lib/apiTypes";
import { useSelector } from "react-redux";
import { Rootstate } from "@/lib/store";
import { cloudinaryLoader } from "./ImageGrid";

const LONG_PRESS_DURATION = 500; // ms

const ImageCard = ({
  route,
  setImageStates,
  handleImageSelection,
  item,
  onImageClick,
  imageState,
  index,
}: {
  setImageStates: Dispatch<
    SetStateAction<Record<string, "loading" | "loaded" | "error">>
  >;
  imageState: "loading" | "loaded" | "error";
  item: Photo;
  route?: string;
  index?: number;
  handleImageSelection: (photoId: string, e?: MouseEvent) => void;
  onImageClick?: (index: number) => void;
}) => {
  const pathname = usePathname();
  const { selectedPhotoIds } = useSelector((state: Rootstate) => state.photo);
  const showPlaceholder = imageState !== "loaded";
  const isSelected = selectedPhotoIds.includes(item._id);

  // Long-press state
  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const didLongPress = useRef(false);

  const clearLongPress = useCallback(() => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  }, []);

  const handleTouchStart = useCallback(() => {
    didLongPress.current = false;
    longPressTimer.current = setTimeout(() => {
      didLongPress.current = true;
      handleImageSelection(item._id);
    }, LONG_PRESS_DURATION);
  }, [handleImageSelection, item._id]);

  const handleTouchEnd = useCallback(() => {
    clearLongPress();
  }, [clearLongPress]);

  const handleTouchMove = useCallback(() => {
    // Cancel long-press if the user scrolls / moves their finger
    clearLongPress();
  }, [clearLongPress]);

  return (
    <Link
      className="relative aspect-square overflow-hidden group bg-border/10"
      href={route ? `/${route}/${item._id}` : "#"}
      onClick={(e: MouseEvent) => {
        // Prevent navigation if a long-press just fired or photos are selected
        if (didLongPress.current) {
          e.preventDefault();
          didLongPress.current = false;
          return;
        }
        if (selectedPhotoIds.length > 0) {
          e.preventDefault();
        } else if (onImageClick && index !== undefined) {
          e.preventDefault();
          console.log("Here");
          onImageClick(index);
        }
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchMove={handleTouchMove}
      onContextMenu={(e) => {
        // Prevent the browser context menu on mobile so it doesn't interfere
        e.preventDefault();
      }}
    >
      {/* Placeholder - shows while loading or on error */}
      {showPlaceholder && <PlaceHolder id={item._id} imageState={imageState} />}
      <ContextModal photoId={item._id} isFavourite={item.isFavourite}>
        {selectedPhotoIds.length > 0 && (
          <input
            type="checkbox"
            id={item._id}
            value={item._id}
            checked={isSelected}
            className="z-50 absolute cursor-pointer top-2 left-2 w-4 h-4"
            onClick={(e: MouseEvent) => {
              e.stopPropagation();
            }}
            onChange={() => handleImageSelection(item._id)}
          />
        )}
        <Image
          src={item?.link}
          alt="photo"
          fill
          loading="lazy"
          className={`object-cover object-top transition-opacity duration-500 ${
            imageState === "loaded" ? "opacity-100" : "opacity-0"
          }`}
          sizes="33vw"
          loader={cloudinaryLoader}
          onLoad={(e) => handleImageLoad(item._id, e, setImageStates)}
          onError={() => handleImageError(item._id, setImageStates)}
        />
      </ContextModal>

      {item.isFavourite && !pathname.startsWith("/trash") && (
        <div className="absolute top-2 right-2 text-pink-500">
          <FaHeart />
        </div>
      )}
    </Link>
  );
};

export default ImageCard;
