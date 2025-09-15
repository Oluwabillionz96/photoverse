"use client";

import { cloudinaryLoader } from "@/app/photos/page";
import PhotoLoder from "@/components/loaders/PhotoLoder";
import PhotosPreview from "@/components/photosPreview";
import { Button } from "@/components/ui/button";
import useInputContext from "@/hooks/useInputContext";
import { useGetFolderPhotosQuery } from "@/services/api";
import Image from "next/image";
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
  const photos = data;
  const { back } = useRouter();
  return (
    <section className="mx-2 h-fit md:py-4">
      <>
        {files.length < 1 && (
          <div>
            <Button
              onClick={() => {
                back();
              }}
              className="w-fit h-fit bg-blue-500 mb-4 hover:bg-blue-600"
            >
              <FaArrowLeft />
            </Button>
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
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-[0.1rem]">
            {photos.map((item) => (
              <div key={item._id} className="relative aspect-square">
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
