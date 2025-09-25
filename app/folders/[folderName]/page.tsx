"use client";

import ImageGrid from "@/components/ImageGrid";
import PhotoLoder from "@/components/loaders/PhotoLoader";
import PhotosPreview, { formatFileSize } from "@/components/photosPreview";
import { Button } from "@/components/ui/button";
import useInputContext from "@/hooks/useInputContext";
import { useGetFolderPhotosQuery } from "@/services/api";
import { useParams, useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";

const Folder = () => {
  const params = useParams();
  const foldername = Array.isArray(params.folderName)
    ? params.folderName[0]
    : params.folderName;
  const { data, isLoading, isFetching } = useGetFolderPhotosQuery({
    foldername: foldername?.replace("%20", " ") ?? "",
  });
  const { files, setFiles, ref } = useInputContext();
  const photos = data?.photos;
  const { push } = useRouter();
  const size = photos
    ? photos
        .map((item) => item.size)
        .reduce((initial, current) => {
          return initial + current;
        }, 0)
    : 0;

  return (
    <section className="mx-2 h-fit md:py-4">
      <>
        {files.length < 1 && (
          <div className="flex mb-4 items-start">
            <Button
              onClick={() => {
                push("/folders");
              }}
              className="w-fit h-fit bg-transparent hover:bg-transparent text-black"
            >
              <FaArrowLeft />
            </Button>
            <div>
              <p className="text-xl font-semibold">
                {foldername?.replaceAll("%20", " ")}
              </p>
              <p className="text-sm">
                {isLoading || isFetching
                  ? "Calculating..."
                  : photos &&
                    `${photos?.length} Items •  ${formatFileSize(size)}`}
              </p>
            </div>
          </div>
        )}
        {files.length > 0 ? (
          <PhotosPreview
            files={files}
            setFiles={setFiles}
            ref={ref}
            folder={foldername?.replaceAll("%20", " ") ?? ""}
          />
        ) : isLoading || isFetching ? (
          <PhotoLoder />
        ) : photos && photos.length > 0 ? (
          <ImageGrid photos={photos} route={`folders/${foldername}`} />
        ) : photos && photos.length < 1 ? (
          "This folder is empty"
        ) : (
          `${foldername} is not a folder`
        )}
      </>
    </section>
  );
};

export default Folder;
