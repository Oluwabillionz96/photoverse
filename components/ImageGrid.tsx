import { Photo } from "@/lib/apiTypes";
import Image from "next/image";
import { useEffect } from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { updatePhotoId } from "@/lib/slices/photoSlice";

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

const ImageGrid = ({ photos }: { photos: Photo[] }) => {
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
            href={`/photos/${item._id}`}
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
          </Link>
        ))}
      </div>
    </>
  );
};

export default ImageGrid;
