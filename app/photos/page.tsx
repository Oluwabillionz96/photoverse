"use client";
import EmptyPhotos from "@/components/EmptyStates/EmptyPhotos";
import { changeTab } from "@/lib/slices/routingSlice";
import { handleFileChange } from "@/lib/utils/handleInputChange";
import { ChangeEvent, useRef, useState } from "react";
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
          handleFileChange(e, files, setFiles);
        }}
        accept="image/*"
        multiple
      />
    </section>
  );
};
export default Photos;
