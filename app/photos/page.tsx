"use client";
import EmptyPhotos from "@/components/EmptyStates/EmptyPhotos";
import { changeTab } from "@/lib/slices/routingSlice";
import { ChangeEvent, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

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

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const selectedFiles = Array.from(e.target.files);

    if (files.length + selectedFiles.length > 10) {
      selectedFiles.splice(10 - files.length);
      toast.error("Only ten files allowed at a time");
    }

    const uniqueNewFiles = selectedFiles.filter(
      (newFile) =>
        !files.some(
          (existingFile) =>
            existingFile.name === newFile.name &&
            existingFile.size === newFile.size
        )
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

  return (
    <section className=" pt-5 mx-2 h-fit md:py-20">
      <EmptyPhotos
        setTab={setTab}
        handleUpload={handleUpload}
        files={files}
        setFiles={setFiles}
        ref={fileInput}
      />
      <input
        type="file"
        className="hidden"
        ref={fileInput}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          handleFileChange(e);
        }}
        accept="image/*"
        multiple
      />
    </section>
  );
};
export default Photos;
