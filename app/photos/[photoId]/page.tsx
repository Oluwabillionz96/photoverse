"use client";
import { ImageModal } from "@/components/ImageModal";
import { Rootstate } from "@/lib/store";
import { useGetOnePhotoQuery } from "@/services/api";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Photo = () => {
  const params = useParams();
  const photoId = Array.isArray(params.photoId)
    ? params.photoId[0]
    : params.photoId;
  const router = useRouter();
  const { photoIds } = useSelector((state: Rootstate) => state.photo);
  const { data, isLoading } = useGetOnePhotoQuery({ id: photoId ?? "" });
  const [index, setIndex] = useState<number>(
    photoIds.findIndex((item) => item === data?._id)
  );
  useEffect(() => {
    setIndex(photoIds.findIndex((item) => item === data?._id));
  }, [data?._id, photoIds]);
  const [side, setSide] = useState<"" | "left" | "right">("");

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : data && Object.keys(data).length > 0 ? (
        <ImageModal
          side={side}
          photo={data}
          isOpen={true}
          onClose={() => router.push("/photos")}
          onNext={() => {
            if (index < photoIds.length && photoIds[index + 1] !== undefined) {
              router.push(`/photos/${photoIds[index + 1]}`);
              setSide("left");
              console.log({ photoId, photoIds, index });
            } else {
              console.log("No");
            }
          }}
          onPrevious={() => {
            if (index > 0 && photoIds[index - 1] !== undefined) {
              router.push(`/photos/${photoIds[index - 1]}`);
              setSide("right");
            } else {
              console.log("No");
            }
          }}
          disable={""}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default Photo;
