import { Photo } from "@/lib/apiTypes";
import useImageHandler from "@/hooks/useImageHandler";
import PhotoLoader from "./loaders/PhotoLoader";
import PhotoGrid from "./grid";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

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
  const router = useRouter();
  const handleImageClick = (photoId: string) => {
    let photoRoute = "/photos";
    if (pathname.startsWith("/trash")) {
      photoRoute = "/trash";
    } else if (pathname.startsWith("/folders")) {
      photoRoute = pathname;
    }
    router.push(`${photoRoute}/${photoId}?back=${encodeURIComponent(pathname)}`);
  };

  return (
    <>
      {loading ? (
        <PhotoLoader />
      ) : (
        <div className="space-y-4">
          {pathname.startsWith("/trash") ? (
            <PhotoGrid
              images={photos}
              imageStates={imageStates}
              setImageStates={setImageStates}
              handleImageSelection={handleImageSelection}
              onImageClick={handleImageClick}
            />
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
        </div>
      )}
    </>
  );
};

export default ImageGrid;
