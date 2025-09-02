"use client";

import { cloudinaryLoader } from "@/app/photos/page";
import { useGetFolderPhotosQuery } from "@/services/api";
import Image from "next/image";
import { useParams } from "next/navigation";

const Folder = () => {
  const params = useParams();
  const foldername = Array.isArray(params.folderName)
    ? params.folderName[0]
    : params.folderName;
  const { data, isLoading, isFetching } = useGetFolderPhotosQuery({
    foldername: foldername?.replace("%20", " ") ?? "",
  });
  const photos = data;
  console.log({ data });
  console.log(params);
  return (
    <section className=" pt-5 mx-2 h-fit md:py-20">
      <>
        {isLoading || isFetching ? (
          <p>Loading...</p>
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
        ) : (
          `${foldername} is not a folder`
        )}
      </>
    </section>
  );
};

export default Folder;
