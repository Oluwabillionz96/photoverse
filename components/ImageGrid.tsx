import { Photo } from "@/lib/apiTypes";
import Image from "next/image";
import { MouseEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import {
  removeSelectedPhoto,
  updatePhotoId,
  updateSelectedPhotosIds,
} from "@/lib/slices/photoSlice";
import { FaHeart } from "react-icons/fa";
import { Rootstate } from "@/lib/store";
import {
  handleImageError,
  handleImageLoad,
} from "@/lib/utils";
import PlaceHolder from "./placeholder";

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
  const [imageStates, setImageStates] = useState<
    Record<string, "loading" | "loaded" | "error">
  >({});

  function handleImageSelection(item: Photo) {
    if (selectedPhotosIds.includes(item._id)) {
      dispatch(removeSelectedPhoto([item._id]));
    } else {
      dispatch(updateSelectedPhotosIds([item._id]));
    }
  }

  useEffect(() => {
    const imageIds = photos?.map((item) => item._id);
    dispatch(updatePhotoId(imageIds));

    // Initialize all images as loading
    const initialStates: Record<string, "loading" | "loaded" | "error"> = {};
    photos.forEach((photo) => {
      initialStates[photo._id] = "loading";
    });
    setImageStates(initialStates);
  }, [dispatch, photos]);

  function getUploadDate(time: string) {
    const uploadDate = new Date(time);

    const isEqualYear =
      new Date(Date.now()).getFullYear() === uploadDate.getFullYear();

    return isEqualYear
      ? uploadDate.toLocaleString("en-US", {
          month: "long",
        })
      : uploadDate.toLocaleString("en-US", {
          month: "long",
          year: "numeric",
        });
  }

  const month: Record<string, Photo[]> = {};

  photos.map((item) => {
    const uploadDate = getUploadDate(item.uploadedAt);
    if (!month[uploadDate]) {
      month[uploadDate] = [];
    }

    month[uploadDate].push(item);
  });

  return (
    <>
      <div className="space-y-4">
        {Object.keys(month).map((key, index) => {
          return (
            <div key={index}>
              <p className="text-sm md:text-xl font-semibold my-4">{key}</p>
              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-[0.1rem]">
                {month[key].map((item) => {
                  const imageState = imageStates[item._id] || "loading";
                  const showPlaceholder = imageState !== "loaded";

                  return (
                    <Link
                      key={item._id}
                      className="relative aspect-square overflow-hidden group bg-border/10"
                      href={`/${route}/${item._id}`}
                      onClick={(e: MouseEvent) => {
                        if (selectedPhotosIds.length > 0) {
                          e.preventDefault();
                        }
                      }}
                    >
                      {/* Placeholder - shows while loading or on error */}
                      {showPlaceholder && (
                        <PlaceHolder id={item._id} imageState={imageState} />
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
                        onLoad={(e) =>
                          handleImageLoad(item._id, e, setImageStates)
                        }
                        onError={() =>
                          handleImageError(item._id, setImageStates)
                        }
                      />

                      {item.isFavourite && (
                        <div className="absolute top-2 right-2 text-pink-500">
                          <FaHeart />
                        </div>
                      )}

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
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ImageGrid;
