import { Photo } from "@/lib/apiTypes";
import Image from "next/image";
import { useEffect } from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { updatePhotoId } from "@/lib/slices/photoSlice";
import { FaStar } from "react-icons/fa";

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
          >
            {item.isFavourite && (
              <div className="absolute top-2 right-2 text-white  z-50">
                <FaStar />
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
          </Link>
        ))}
      </div>
    </>
  );
};

export default ImageGrid;
