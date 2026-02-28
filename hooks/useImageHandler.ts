import {
  useDeletePhotoMutation,
  useMovePhotoToTrashMutation,
  useRestoreTrashedPhotoMutation,
} from "@/services/api";
import { MouseEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { handleApiMutation } from "./useApiMutation";
import { Photo } from "@/lib/apiTypes";
import { updatePhotoId } from "@/lib/slices/photoSlice";

const useImageHandler = (photos: Photo[]) => {
  const dispatch = useDispatch();
  const [imageStates, setImageStates] = useState<
    Record<string, "loading" | "loaded" | "error">
  >({});
  const [selectedPhotoIds, setSelectedPhotoIds] = useState<string[]>([]);
  const [trash, { isLoading }] = useMovePhotoToTrashMutation();
  const [restore, { isLoading: isRestoring }] =
    useRestoreTrashedPhotoMutation();
  const [permanentlyDelete, { isLoading: isDeleting }] =
    useDeletePhotoMutation();

  const loading = isLoading || isRestoring || isDeleting;

  async function movePhotoTotrash(photos: string[], e?: MouseEvent) {
    e?.stopPropagation();
    e?.preventDefault();
    const payload = { photos };

    await handleApiMutation(trash(payload));
  }

  async function restoretrashedPhoto(photos: string[], e?: MouseEvent) {
    e?.stopPropagation();
    e?.preventDefault();
    const payload = { photos };

    await handleApiMutation(restore(payload));
  }

  async function deletePhoto(photos: string[], e?: MouseEvent) {
    e?.stopPropagation();
    e?.preventDefault();
    const payload = { photos };
    await handleApiMutation(permanentlyDelete(payload));
  }

  function handleImageSelection(item: Photo, e?: MouseEvent) {
    e?.stopPropagation();
    e?.preventDefault();

    if (selectedPhotoIds.includes(item._id)) {
      setSelectedPhotoIds((prev) => prev.filter((id) => id !== item._id));
    } else {
      setSelectedPhotoIds((prev) => [...prev, item._id]);
    }
  }

  useEffect(() => {
    const imageIds = photos?.map((item) => item._id);
    dispatch(updatePhotoId(imageIds));

    // Initialize all images as loading
    const initialStates: Record<string, "loading" | "loaded" | "error"> = {};
    photos.forEach((photo) => {
      initialStates[photo._id] = "loading";
    });
    setImageStates(initialStates);
  }, [dispatch, photos]);

  function getUploadDate(time: string) {
    const uploadDate = new Date(time);

    const isEqualYear =
      new Date(Date.now()).getFullYear() === uploadDate.getFullYear();

    return isEqualYear
      ? uploadDate.toLocaleString("en-US", {
          month: "long",
        })
      : uploadDate.toLocaleString("en-US", {
          month: "long",
          year: "numeric",
        });
  }

  const month: Record<string, Photo[]> = {};

  photos.map((item) => {
    const uploadDate = getUploadDate(item.uploadedAt);
    if (!month[uploadDate]) {
      month[uploadDate] = [];
    }

    month[uploadDate].push(item);
  });

  return {
    imageStates,
    loading,
    mutations: { movePhotoTotrash, restoretrashedPhoto, deletePhoto },
    handleImageSelection,
    month,
    selectedPhotoIds,
  };
};

export default useImageHandler;
