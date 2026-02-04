import { Dispatch, SetStateAction } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../axios";
import { AxiosError, AxiosProgressEvent } from "axios";

export async function handlePhotosUploads(
  files: File[],
  folder: string,
  setIsLoading: Dispatch<SetStateAction<boolean>>,
  setProgress: Dispatch<SetStateAction<number>>,
  setError: Dispatch<SetStateAction<boolean>>,
) {
  if (files.length === 0) {
    toast.error("Please select files to upload");
    return;
  }

  setIsLoading(true);

  try {
    const formData = new FormData();

    files.forEach((file) => {
      formData.append("images", file);
    });

    formData.append("folder", folder);

    const response = await axiosInstance.post("photos/add", formData, {
      onUploadProgress: (e: AxiosProgressEvent) => {
        if (e.progress !== undefined) {
          setProgress(e.progress * 100);
        }
      },
    });

    toast.success(response.data?.message);

    // console.log(response);
    // //  else if ("error" in response) {
    // //   const error = response.error as {
    // //     status?: number | string;
    // //     data?: { error: string };
    // //   };

    // //   const message =
    // //     error?.data?.error ||
    // //     (error?.status === "FETCH_ERROR"
    // //       ? "Network error. Please check your connection."
    // //       : "An unexpected error occurred.");

    // //   toast.error(message);
    // // }
    // // console.log(response);
  } catch (error) {
    console.log(error);
    const errorMessage =
      error instanceof AxiosError
        ? error.response?.data?.error || error.message
        : "An unexpected error occurred.";
    toast.error(errorMessage);
    setError(true);
  } finally {
    setIsLoading(false);
  }
}
