import { ChangeEvent, Dispatch, RefObject, SetStateAction } from "react";
import toast from "react-hot-toast";

export const handleFileChange = (
  e: ChangeEvent<HTMLInputElement>,
  files: File[],
  setFiles: Dispatch<SetStateAction<File[]>>,
) => {
  if (!e.target.files) return;
  const selectedFiles = Array.from(e.target.files);

  if (files.length + selectedFiles.length > 10) {
    selectedFiles.splice(10 - files.length);
    toast.error("Only ten files allowed at a time");
  }

  const invalidFiles = selectedFiles.filter((file) => file.size > 500 * 1024);

  if (invalidFiles.length > 0) {
    toast.error("Some file exceed 500KB limit");
    return;
  }
  const invalidTypes = selectedFiles.filter(
    (file) => !file.type.startsWith("image/"),
  );
  if (invalidTypes.length > 0) {
    toast.error("Only image files are allowed");
    return;
  }

  const uniqueNewFiles = selectedFiles.filter(
    (newFile) =>
      !files.some(
        (existingFile) =>
          existingFile.name === newFile.name &&
          existingFile.size === newFile.size,
      ),
  );

  if (
    uniqueNewFiles.length < selectedFiles.length &&
    uniqueNewFiles.length === 0
  ) {
    if (selectedFiles.length > 1) {
      toast.error("The files you selected already exsists");
    } else {
      toast.error("The file you selected already exsists");
    }
  } else if (uniqueNewFiles.length < selectedFiles.length) {
    toast.error("Some files were skipped because they already exist");
  }

  setFiles((prev) => [...prev, ...uniqueNewFiles]);
  e.target.value = "";
};

export const openFileDialog = (ref: RefObject<HTMLInputElement | null>) => {
  ref.current?.click();
};
