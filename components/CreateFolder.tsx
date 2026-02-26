"use client";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import CreateFolderModal from "./modals/CreateFolderModal";
import AddPhotoModal from "./modals/AddPhotoModal";
import ImagePreviewModal from "./modals/ImagePreviewModal";
import { handleFileChange } from "@/lib/utils/handleInputChange";
import { useCreateFolderMutation } from "@/services/api";
import toast from "react-hot-toast";
import { handleApiMutation } from "@/hooks/useApiMutation";

const CreateFolder = ({
  folderName,
  setFolderName,
  modalStatus,
  setModalStatus,
}: {
  folderName: string;
  setFolderName: Dispatch<SetStateAction<string>>;
  modalStatus: "" | "preview" | "select" | "foldername";
  setModalStatus: (arg: "" | "preview" | "select" | "foldername") => void;
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const [createNewFolder, { isLoading: isCreatingFolder }] =
    useCreateFolderMutation();
  const fileInput = useRef<HTMLInputElement>(null);
  function handleUpload() {
    fileInput.current?.click();
  }

  async function handleFolderCreation() {
    if (files.length === 0) {
      toast.error("Please select files to upload");
      return;
    }

    const formData = new FormData();

    files.forEach((file) => {
      formData.append("images", file);
    });

    formData.append("name", folderName);

    const result = await handleApiMutation(createNewFolder(formData));

    if (result.success) {
      setFiles([]);
      setFolderName("");
      setModalStatus("");
    }
  }

  return (
    <>
      {modalStatus === "foldername" && (
        <CreateFolderModal
          setModalStatus={setModalStatus}
          value={folderName}
          setValue={setFolderName}
        />
      )}
      {modalStatus === "select" && (
        <AddPhotoModal
          setModalStatus={setModalStatus}
          folderName={folderName}
          handleUpload={handleUpload}
        />
      )}

      {modalStatus === "preview" && (
        <ImagePreviewModal
          setModalStatus={setModalStatus}
          isLoading={isCreatingFolder}
          folderName={folderName}
          setSelectedImages={setFiles}
          selectedImages={files}
          handleUpload={handleUpload}
          createFolder={handleFolderCreation}
        />
      )}
      <input
        type="file"
        className="hidden"
        accept="image/*"
        multiple
        ref={fileInput}
        onChange={async (e) => {
          const success = await handleFileChange(e, files, setFiles);
          if (success) {
            setModalStatus("preview");
          }
        }}
      />
    </>
  );
};

export default CreateFolder;
