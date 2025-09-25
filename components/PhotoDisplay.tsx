import { useEffect, useState } from "react";
import { ImageModal } from "./ImageModal";
import { useGetOnePhotoQuery } from "@/services/api";
import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { Rootstate } from "@/lib/store";

const PhotoDisplay = ({ route }: { route: string }) => {
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
  const [disable, setDisable] = useState<"" | "left" | "right">("");

  useEffect(() => {
    if (index > photoIds.length || photoIds[index + 1] === undefined) {
      setDisable("right");
    } else if (index < 0 || photoIds[index - 1] === undefined) {
      setDisable("left");
    } else {
      setDisable("");
    }
  }, [index, photoIds]);

  return (
    <div>
      <ImageModal
        loading={isLoading}
        photo={data}
        isOpen={true}
        onClose={() => router.push(`/${route}`)}
        onNext={() => {
          if (index < photoIds.length && photoIds[index + 1] !== undefined) {
            router.push(`/photos/${photoIds[index + 1]}`);
          }
        }}
        onPrevious={() => {
          if (index > 0 && photoIds[index - 1] !== undefined) {
            router.push(`/photos/${photoIds[index - 1]}`);
          }
        }}
        disable={disable}
      />
    </div>
  );
};

export default PhotoDisplay;
