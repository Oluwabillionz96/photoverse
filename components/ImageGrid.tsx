import { Photo } from "@/lib/apiTypes";
import useImageHandler from "@/hooks/useImageHandler";
import PhotoLoader from "./loaders/PhotoLoader";
import PhotoGrid from "./grid";
import { usePathname } from "next/navigation";
import { useState } from "react";
import TrashImageModal from "./modals/TrashImageModal";
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

const ImageGrid = ({ photos, route }: { photos: Photo[]; route: string }) => {
  const { loading, month, imageStates, setImageStates, handleImageSelection } =
    useImageHandler(photos);
  const pathname = usePathname();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleImageClick = (photoId: string) => {
    const globalIndex = photos.findIndex((p) => p._id === photoId);
    if (globalIndex !== -1) {
      setSelectedImageIndex(globalIndex);
      setIsModalOpen(true);
    }
  };

  return (
    <>
      {loading ? (
        <PhotoLoader />
      ) : (
        <div className="space-y-4">
          {pathname.startsWith("/trash") ? (
            <>
              <PhotoGrid
                images={photos}
                imageStates={imageStates}
                setImageStates={setImageStates}
                handleImageSelection={handleImageSelection}
                onImageClick={handleImageClick}
              />
              <TrashImageModal
                photos={photos}
                selectedIndex={selectedImageIndex}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onChangeIndex={setSelectedImageIndex}
              />
            </>
          ) : (
            Object.keys(month).map((key, index) => {
              return (
                <div key={index}>
                  {route !== "trash" && (
                    <p className="text-sm md:text-xl font-semibold my-4">
                      {key}
                    </p>
                  )}
                  <PhotoGrid
                    images={month[key]}
                    imageStates={imageStates}
                    setImageStates={setImageStates}
                    route={route}
                    handleImageSelection={handleImageSelection}
                    onImageClick={handleImageClick}
                  />
                </div>
              );
            })
          )}

          {!pathname.startsWith("/trash") && (
            <ImageModal
              photo={photos[selectedImageIndex]}
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              onNext={() => {
                if (selectedImageIndex < photos.length - 1) {
                  setSelectedImageIndex((prev) => prev + 1);
                }
              }}
              onPrevious={() => {
                if (selectedImageIndex > 0) {
                  setSelectedImageIndex((prev) => prev - 1);
                }
              }}
              disable={
                selectedImageIndex === 0
                  ? "left"
                  : selectedImageIndex === photos.length - 1
                    ? "right"
                    : ""
              }
              loading={loading}
            />
          )}
        </div>
      )}
    </>
  );
};

export default ImageGrid;
