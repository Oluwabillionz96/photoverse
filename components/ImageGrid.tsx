import { Photo } from "@/lib/apiTypes";
import Image from "next/image";
import { MouseEvent } from "react";
import Link from "next/link";
import { FaHeart } from "react-icons/fa";
import { handleImageError, handleImageLoad } from "@/lib/utils";
import PlaceHolder from "./placeholder";
import ContextModal from "./modals/ContextModal";

import useImageHandler from "@/hooks/useImageHandler";
import PhotoLoader from "./loaders/PhotoLoader";
import { usePathname } from "next/navigation";

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
  const {
    loading,
    month,
    imageStates,
    setImageStates,
    selectedPhotoIds,
    handleImageSelection,
  } = useImageHandler(photos);
  const pathname = usePathname();
  return (
    <>
      {loading ? (
        <PhotoLoader />
      ) : (
        <div className="space-y-4">
          {Object.keys(month).map((key, index) => {
            return (
              <div key={index}>
                {route !== "trash" && (
                  <p className="text-sm md:text-xl font-semibold my-4">{key}</p>
                )}
                <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-[0.1rem]">
                  {month[key].map((item) => {
                    const imageState = imageStates[item._id] || "loading";
                    const showPlaceholder = imageState !== "loaded";
                    const isSelected = selectedPhotoIds.includes(item._id);
                    return (
                      <Link
                        key={item._id}
                        className="relative aspect-square overflow-hidden group bg-border/10"
                        href={`/${route}/${item._id}`}
                        onClick={(e: MouseEvent) => {
                          if (selectedPhotoIds.length > 0) {
                            e.preventDefault();
                          }
                        }}
                      >
                        {/* Placeholder - shows while loading or on error */}
                        {showPlaceholder && (
                          <PlaceHolder id={item._id} imageState={imageState} />
                        )}
                        <ContextModal
                          photoId={item._id}
                          isFavourite={item.isFavourite}
                        >
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
                              imageState === "loaded"
                                ? "opacity-100"
                                : "opacity-0"
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
                        </ContextModal>

                        {item.isFavourite && !pathname.startsWith("/trash") && (
                          <div className="absolute top-2 right-2 text-pink-500">
                            <FaHeart />
                          </div>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default ImageGrid;
