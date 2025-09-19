import { Photo } from "@/lib/apiTypes";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ImageModal } from "./ImageModal";

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
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(
    null
  );
  const [disable, setDisable] = useState<"left" | "right" | "">("");

  useEffect(() => {
    if (selectedPhotoIndex === photos.length - 1) {
      setDisable("right");
      return;
    }
    if (selectedPhotoIndex === 0) {
      setDisable("left");
      return;
    }
    setDisable("");
  }, [disable, photos.length, selectedPhotoIndex]);

  const openModal = (index: number) => {
    setSelectedPhotoIndex(index);
  };

  const closeModal = () => {
    setSelectedPhotoIndex(null);
  };

  const goToNext = () => {
    if (
      selectedPhotoIndex !== null &&
      selectedPhotoIndex !== photos.length - 1
    ) {
      setSelectedPhotoIndex(selectedPhotoIndex + 1);
    }
  };

  const goToPrevious = () => {
    if (selectedPhotoIndex !== null && selectedPhotoIndex !== 0) {
      setSelectedPhotoIndex(selectedPhotoIndex - 1);
    }
  };

  return (
    <>
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-[0.1rem]">
        {photos.map((item, index) => (
          <div
            key={item._id}
            className="relative aspect-square"
            onClick={() => openModal(index)}
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
          </div>
        ))}
      </div>
      {selectedPhotoIndex !== null && (
        <ImageModal
          photo={photos[selectedPhotoIndex]}
          isOpen={true}
          onClose={closeModal}
          onNext={goToNext}
          onPrevious={goToPrevious}
          totalCount={photos.length}
          disable={disable}
        />
      )}
    </>
  );
};

export default ImageGrid;
