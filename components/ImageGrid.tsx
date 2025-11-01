import { Photo } from "@/lib/apiTypes";
import Image from "next/image";
import { MouseEvent, useEffect } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import {
  removeSelectedPhoto,
  updatePhotoId,
  updateSelectedPhotosIds,
} from "@/lib/slices/photoSlice";
import { FaHeart} from "react-icons/fa";
// import ContextModal from "./modals/ContextModal";
import { Rootstate } from "@/lib/store";
import ContextModal from "./modals/ContextModal";

export const cloudinaryLoader = ({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}) => {
  return `${src}?w=${width}&q=${quality || 75}`;
};

const ImageGrid = ({ photos, route }: { photos: Photo[]; route: string }) => {
  const dispatch = useDispatch();
  const { selectedPhotosIds } = useSelector((state: Rootstate) => state.photo);

  function handleImageSelection(item: Photo) {
    if (selectedPhotosIds.includes(item._id)) {
      dispatch(removeSelectedPhoto([item._id]));
    } else {
      dispatch(updateSelectedPhotosIds([item._id]));
    }
  }

  function handleSelectAll() {
    if (selectedPhotosIds.length !== photos.length) {
      const toBeIncluded = photos
        .filter((item) => !selectedPhotosIds.includes(item._id))
        .map((item) => item._id);
      console.log(toBeIncluded);
      dispatch(updateSelectedPhotosIds(toBeIncluded));
    } else if (selectedPhotosIds.length === photos.length) {
      const ids = photos.map((item) => item._id);
      dispatch(removeSelectedPhoto(ids));
    }
  }

  useEffect(() => {
    const imageIds = photos?.map((item) => item._id);
    dispatch(updatePhotoId(imageIds));
  }, [dispatch, photos]);

  return (
    <>
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-[0.1rem]">
        {photos.map((item) => (
          <Link
            key={item._id}
            className="relative aspect-square"
            href={`/${route}/${item._id}`}
            onClick={(e: MouseEvent) => {
              if (selectedPhotosIds.length > 0) {
                e.preventDefault();
              }
            }}
          >
            {item.isFavourite && (
              <div className="absolute top-2 right-2 text-pink-500  z-50">
                <FaHeart />
              </div>
            )}

            <ContextModal
              handleSelectImage={(e: MouseEvent) => {
                e.stopPropagation();
                handleImageSelection(item);
              }}
              removeFavOption={selectedPhotosIds.length > 1}
              isSelected={selectedPhotosIds?.includes(item._id)}
              canSelectAll={selectedPhotosIds.length > 0}
              allIsSelected={selectedPhotosIds.length === photos.length}
              handleAllSelection={(e: MouseEvent) => {
                e.stopPropagation();
                handleSelectAll();
              }}
            >
            <Image
              src={item?.link}
              alt="photo"
              fill
              loading="lazy"
              className="object-cover object-top"
              sizes="33vw"
              loader={cloudinaryLoader}
            />
            </ContextModal>
            {selectedPhotosIds.length > 0 && (
              <input
                type="checkbox"
                id={item._id}
                value={item._id}
                checked={selectedPhotosIds?.includes(item._id)}
                className="z-50 absolute top-2 left-2 w-4 h-4"
                onClick={(e: MouseEvent) => {
                  e.stopPropagation();
                }}
                onChange={() => handleImageSelection(item)}
              />
            )}
          </Link>
        ))}
      </div>
    </>
  );
};

export default ImageGrid;
