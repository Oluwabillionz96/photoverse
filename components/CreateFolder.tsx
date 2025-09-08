"use client";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import CreateFolderModal from "./modals/CreateFolderModal";
import AddPhotoModal from "./modals/AddPhotoModal";
import ImagePreviewModal from "./modals/ImagePreviewModal";
import { handleFileChange } from "@/lib/utils/handleInputChange";
import {
  useCreateFolderMutation,
  useUploadPhotosMutation,
} from "@/services/api";
import toast from "react-hot-toast";

const CreateFolder = ({
  foldername,
  setFoldername,
  //   createFolder,
  //   setCreateFolder,
  modalStatus,
  setModalStatus,
}: {
  foldername: string;
  setFoldername: Dispatch<SetStateAction<string>>;
  //   createFolder: boolean;
  //   setCreateFolder: (arg: boolean) => void;
  modalStatus: "" | "preview" | "select" | "foldername";
  setModalStatus: (arg: "" | "preview" | "select" | "foldername") => void;
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const [createNewFolder, { isLoading: isCreatingFolder }] =
    useCreateFolderMutation();
  const [uploadPhotos, { isLoading: isUploadingPhoto }] =
    useUploadPhotosMutation();
  const [loading, setLoading] = useState(isCreatingFolder || isUploadingPhoto);
  const fileInput = useRef<HTMLInputElement>(null);
  function handleUpload() {
    fileInput.current?.click();
  }

  async function handlePhotosUploads(urls: string[], folder: string) {
    const payload = {
      photos: files.map((item, index) => ({
        link: urls[index],
        size: item.size,
        folder,
      })),
    };

   await uploadPhotos(payload);
    setFiles([]);
    if (fileInput.current) fileInput.current.value = "";
    return;
  }

  async function UploadToCloudinary() {
    const presetKey = "photoverse_test";
    const cloudname = process.env.NEXT_PUBLIC_CLOUDNAME;
    const url = [];

    for (let index = files.length - 1; index > -1; index--) {
      const formData = new FormData();
      formData.append("file", files[index]);

      formData.append("upload_preset", presetKey);

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudname}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      url.push(data.secure_url);
    }

    return url;
  }

  async function CreateFolder() {
    const response = await createNewFolder({ name: foldername });
    if ("data" in response) {
      try {
        const id = response.data.id;
        setLoading(true);
        const url = await UploadToCloudinary();
        await handlePhotosUploads(url, id);
        setFoldername("");
        setFiles([]);
        setModalStatus("");
        toast.success("folder created successfully");
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    } else if ("error" in response) {
      const error = response.error as {
        status?: number | string;
        data?: { message: string };
      };

      const message =
        error?.data?.message ||
        (error?.status === "FETCH_ERROR"
          ? "Network error. Please check your connection."
          : "An unexpected error occurred.");

      toast.error(message);
    }
  }

  return (
    <>
      {modalStatus === "foldername" && (
        <CreateFolderModal
          setModalStatus={setModalStatus}
          value={foldername}
          setValue={setFoldername}
        />
      )}
      {modalStatus === "select" && (
        <AddPhotoModal
          setModalStatus={setModalStatus}
          folderName={foldername}
          handleUpload={handleUpload}
        />
      )}

      {modalStatus === "preview" && (
        <ImagePreviewModal
          setModalStatus={setModalStatus}
          isLoading={loading}
          folderName={foldername}
          setSelectedImages={setFiles}
          selectedImages={files}
          handleUpload={handleUpload}
          createFolder={CreateFolder}
        />
      )}
      <input
        type="file"
        className="hidden"
        accept="image/*"
        multiple
        ref={fileInput}
        onChange={(e) => {
          handleFileChange(e, files, setFiles);
          setModalStatus("preview");
        }}
      />
    </>
  );
};

export default CreateFolder;
