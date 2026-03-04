import Link from "next/link";
import { Dispatch, MouseEvent, SetStateAction } from "react";
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

const ImageCard = ({
  route,
  setImageStates,
  handleImageSelection,
  item,

  imageState,
}: {
  setImageStates: Dispatch<
    SetStateAction<Record<string, "loading" | "loaded" | "error">>
  >;
  imageState: "loading" | "loaded" | "error";
  item: Photo;
  route: string;
  handleImageSelection: (photoId: string, e?: MouseEvent) => void;
}) => {
  const pathname = usePathname();
  const { selectedPhotoIds } = useSelector((state: Rootstate) => state.photo);
  const showPlaceholder = imageState !== "loaded";
  const isSelected = selectedPhotoIds.includes(item._id);
  return (
    <Link
      className="relative aspect-square overflow-hidden group bg-border/10"
      href={`/${route}/${item._id}`}
      onClick={(e: MouseEvent) => {
        if (selectedPhotoIds.length > 0) {
          e.preventDefault();
        }
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
