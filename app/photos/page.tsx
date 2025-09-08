"use client";
import EmptyPhotos from "@/components/EmptyStates/EmptyPhotos";
import PhotosPreview from "@/components/photosPreview";
import useInputContext from "@/hooks/useInputContext";
import { changeTab } from "@/lib/slices/routingSlice";
import { useGetPhotosQuery } from "@/services/api";
import Image from "next/image";
import { useDispatch } from "react-redux";

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

const Photos = () => {
  const dispatch = useDispatch();
  const setTab = (value: string) => {
    dispatch(changeTab(value));
  };
  const { files, setFiles, ref, openFileDialog } = useInputContext();
  const { data, isLoading, isFetching } = useGetPhotosQuery(undefined);
  const photos = data;


  return (
    <section className=" pt-5 mx-2 h-fit md:py-20">
      <>
        {files.length > 0 ? (
          <PhotosPreview files={files} setFiles={setFiles} ref={ref} />
        ) : isLoading || isFetching ? (
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
          <EmptyPhotos
            setTab={setTab}
            handleUpload={openFileDialog}
            files={files}
            setFiles={setFiles}
            ref={ref}
          />
        )}
      </>
    </section>
  );
};
export default Photos;
