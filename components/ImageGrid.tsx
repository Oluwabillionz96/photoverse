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
import { FaHeart } from "react-icons/fa";
// import ContextModal from "./modals/ContextModal";
import { Rootstate } from "@/lib/store";
// import ContextModal from "./modals/ContextModal";
// import { useMovePhotoToTrashMutation } from "@/services/api";

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
  // const [moveToTrash] = useMovePhotoToTrashMutation();

  // async function handleMoveToTrash() {
  //   const payload = {
  //     photos: selectedPhotosIds,
  //   };

  //   await moveToTrash(payload);
  // }

  function handleImageSelection(item: Photo) {
    if (selectedPhotosIds.includes(item._id)) {
      dispatch(removeSelectedPhoto([item._id]));
    } else {
      dispatch(updateSelectedPhotosIds([item._id]));
    }
  }

  // function handleSelectAll() {
  //   if (selectedPhotosIds.length !== photos.length) {
  //     const toBeIncluded = photos
  //       .filter((item) => !selectedPhotosIds.includes(item._id))
  //       .map((item) => item._id);
  //     console.log(toBeIncluded);
  //     dispatch(updateSelectedPhotosIds(toBeIncluded));
  //   } else if (selectedPhotosIds.length === photos.length) {
  //     const ids = photos.map((item) => item._id);
  //     dispatch(removeSelectedPhoto(ids));
  //   }
  // }

  useEffect(() => {
    const imageIds = photos?.map((item) => item._id);
    dispatch(updatePhotoId(imageIds));
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
                {month[key].map((item) => (
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
                    <Image
                      src={item?.link}
                      alt="photo"
                      fill
                      loading="lazy"
                      className="object-cover object-top"
                      sizes="33vw"
                      loader={cloudinaryLoader}
                    />
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
            </div>
          );
        })}

        {/* <ContextModal
              handleSelectImage={(e: MouseEvent) => {
                e.stopPropagation();
                handleImageSelection(item);
              }}
              handleMoveToTrash={handleMoveToTrash}
              removeFavOption={selectedPhotosIds.length > 1}
              isSelected={selectedPhotosIds?.includes(item._id)}
              canSelectAll={selectedPhotosIds.length > 0}
              allIsSelected={selectedPhotosIds.length === photos.length}
              handleAllSelection={(e: MouseEvent) => {
                e.stopPropagation();
                handleSelectAll();
              }}
            > */}

        {/* </ContextModal> */}
      </div>
    </>
  );
};

export default ImageGrid;
