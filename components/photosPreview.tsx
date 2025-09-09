"use client";
import { RefObject, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { EyeIcon, TrashIcon, UploadIcon, XIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useUploadPhotosMutation } from "@/services/api";
import toast from "react-hot-toast";
import Image from "next/image";

const PhotosPreview = ({
  files,
  setFiles,
  ref,
  folder,
}: {
  files: File[];
  setFiles: (arg: File[]) => void;
  ref: RefObject<HTMLInputElement | null>;
  folder?: string;
}) => {
  const [uploadPhotos, { isLoading }] = useUploadPhotosMutation();

  async function handlePhotosUploads(urls: string[]) {
    const payload = {
      photos: files.map((item, index) => ({
        link: urls[index],
        size: item.size,
        folder,
      })),
    };

    await uploadPhotos(payload);
    setFiles([]);
    if (ref.current) ref.current.value = "";
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

    handlePhotosUploads(url);
  }

  function formatFileSize(bytes: number) {
    if (bytes === 0) return "0 bytes";

    const units = ["Bytes", "KB", "MB", "GB"];
    const k = 1024;
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return ` ${Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${
      units[i]
    }`;
  }

  const [preview, setPreview] = useState<string[]>([]);

  useEffect(() => {
    const urls = files.map((item) => URL.createObjectURL(item));
    setPreview(urls);

    return () => urls.forEach((item) => URL.revokeObjectURL(item));
  }, [files]);

  let size = 0;
  files.forEach((file) => {
    size += file.size;
  });
  return (
    <>
      <div>
        <h2 className="md:text-xl text-2xl font-bold text-gray-900">
          Ready to Upload
        </h2>
        <p className="md:text-sm text-base text-gray-600 mt-1">
          {files.length} file{files.length > 1 && "s"} selected •
          {formatFileSize(size)}
        </p>
        {/* <p>5 photos</p> */}
        <div className="flex gap-4 my-4">
          <Button
            variant="outline"
            className="flex items-center gap-2 hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-all duration-200 bg-transparent"
            onClick={() => {
              setFiles([]);
              if (ref.current) ref.current.value = "";
            }}
          >
            <TrashIcon className="w-4 h-4" />
            <span className="hidden md:inline">Clear</span>
            <span className="inline md:hidden">Clear All</span>
          </Button>
          {files.length < 10 && (
            <Button
              onClick={() => ref.current?.click()}
              className="bg-blue-500   hover:bg-blue-600 hover:scale-105 hover:shadow-lg"
            >
              Add more photos
            </Button>
          )}
          <Button
            className="md:flex items-center gap-2 bg-green-500 hidden hover:bg-green-600 transition-all duration-200 hover:scale-105 hover:shadow-lg md:px-4 px-6 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={files.length < 1 || isLoading}
            onClick={async () => {
              await UploadToCloudinary();
            }}
          >
            <UploadIcon className={`w-4 h-4 `} />
            Upload file{files.length > 1 && "s"}
          </Button>
        </div>
      </div>
      <div>
        <div className="flex items-center gap-2 mb-4">
          <EyeIcon className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">
            Photo Previews
          </h3>
          <span className="text-sm text-gray-500">({files.length})</span>
        </div>
        <div className="grid grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-3 ">
          <AnimatePresence mode="sync">
            {files.map((item, index) => (
              <motion.div
                key={`${item.name} ${item.lastModified}`}
                className="animate-in fade-in-0 zoom-in-95 duration-500 relative group hover:scale-105 "
                style={{ animationDelay: `${index * 100 + 300}ms` }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="aspect-square rounded-xl overflow-hidden bg-gray-100 border-2 border-gray-200 hover:border-blue-300 transition-all duration-200 relative ">
                  <Image
                    src={preview[index]}
                    alt={files[index].name || "Uploaded image preview"}
                    className="w-full h-full object-cover hover:cursor-pointer transition-transform duration-200"
                    loading="lazy"
                    fill
                  />
                </div>
                <button
                  onClick={() => {
                    const newFiles = [...files];
                    newFiles.splice(index, 1);
                    setFiles([...newFiles]);
                  }}
                  // disabled={isUploading}
                  className="absolute top-2 right-2 w-6 h-6 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center transition-all duration-200 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg md:opacity-0 md:group-hover:opacity-100"
                >
                  <XIcon className="w-3 h-3 text-white" />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        {files.length < 10 && (
          <Button
            className="flex items-center gap-2 bg-green-500 md:hidden w-full disabled:opacity-50 my-4"
            disabled={files.length < 1 || isLoading}
            onClick={async () => {
              if (folder) {
                await UploadToCloudinary();
              } else {
                toast.error("No folder provided");
              }
            }}
          >
            <UploadIcon className={`w-4 h-4 `} />
            Upload file{files.length > 1 && "s"}
          </Button>
        )}
      </div>
    </>
  );
};

export default PhotosPreview;
