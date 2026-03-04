import { Dispatch, MouseEvent, SetStateAction } from "react";
import ImageCard from "./image-card";
import { Photo } from "@/lib/apiTypes";

const PhotoGrid = ({
  images,
  imageStates,
  setImageStates,
  route,
  handleImageSelection,
}: {
  images: Photo[];
  imageStates: Record<string, "loading" | "loaded" | "error">;
  setImageStates: Dispatch<
    SetStateAction<Record<string, "loading" | "loaded" | "error">>
  >;
  route: string;
  handleImageSelection: (photoId: string, e?: MouseEvent) => void;
}) => {
  return (
    <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-[0.1rem]">
      {images.map((item) => {
        const imageState = imageStates[item._id] || "loading";

        return (
          <ImageCard
            key={item._id}
            setImageStates={setImageStates}
            imageState={imageState}
            handleImageSelection={handleImageSelection}
            route={route}
            item={item}
          />
        );
      })}
    </div>
  );
};

export default PhotoGrid;
