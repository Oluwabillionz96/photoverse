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
  createFolder,
  setCreateFolder,
}: {
  foldername: string;
  setFoldername: Dispatch<SetStateAction<string>>;
  createFolder: boolean;
  setCreateFolder: (arg: boolean) => void;
}) => {
  const [selectPhoto, setSelectPhoto] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [photoPreview, setPhotoPreview] = useState<boolean>(files.length > 1);
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

    const response = await uploadPhotos(payload);
    setFiles([]);
    console.log(response);
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

      console.log({ data: data.secure_url, url, index });
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
        setCreateFolder(false);
        setFiles([]);
        setPhotoPreview(false);
        setSelectPhoto(false);
        toast.success("folder created successfully");
      } catch (error) {
        console.error(error);
      } finally {
        setPhotoPreview(false);
          setSelectPhoto(false);
          setLoading(false)
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
      <CreateFolderModal
        open={createFolder}
        setOpen={setCreateFolder}
        value={foldername}
        setValue={setFoldername}
        setSelectPhoto={setSelectPhoto}
      />
      <AddPhotoModal
        setCreateFolder={setCreateFolder}
        open={selectPhoto}
        setOpen={setSelectPhoto}
        folderName={foldername}
        files={files}
        setFiles={setFiles}
        setPhotoPreview={setPhotoPreview}
        handleUpload={handleUpload}
      />

      <ImagePreviewModal
        isLoading={loading}
        setSelectPhoto={setSelectPhoto}
        open={photoPreview}
        setOpen={setPhotoPreview}
        folderName={foldername}
        setSelectedImages={setFiles}
        selectedImages={files}
        handleUpload={handleUpload}
        createFolder={CreateFolder}
      />
      <input
        type="file"
        className="hidden"
        accept="image/*"
        multiple
        ref={fileInput}
        onChange={(e) => {
          handleFileChange(e, files, setFiles);
          setSelectPhoto(false);
          setPhotoPreview(true);
        }}
      />
    </>
  );
};

export default CreateFolder;
