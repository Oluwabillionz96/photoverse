"use client";
import EmptyPhotos from "@/components/EmptyStates/EmptyPhotos";
import { changeTab } from "@/lib/slices/routingSlice";
import { handleFileChange } from "@/lib/utils/handleInputChange";
import { useGetPhotosQuery } from "@/services/api";
import Image from "next/image";
import { ChangeEvent, useRef, useState } from "react";
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
  const fileInput = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  function handleUpload() {
    fileInput.current?.click();
  }
  const { data, isLoading, isFetching } = useGetPhotosQuery(undefined);
  const photos = data;

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
          <EmptyPhotos
            setTab={setTab}
            handleUpload={handleUpload}
            files={files}
            setFiles={setFiles}
            ref={fileInput}
          />
        )}
      </>
      <input
        type="file"
        className="hidden"
        ref={fileInput}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          handleFileChange(e, files, setFiles);
        }}
        accept="image/*"
        multiple
      />
    </section>
  );
};
export default Photos;
