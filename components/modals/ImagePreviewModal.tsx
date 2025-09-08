"use client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { ArrowLeft, Check, XIcon } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";

const ImagePreviewModal = ({
  folderName,
  selectedImages,
  setSelectedImages,
  handleUpload,
  isLoading,
  createFolder,
  setModalStatus,
}: {
  folderName: string;
  setSelectedImages: Dispatch<SetStateAction<File[]>>;
  selectedImages: File[];
  handleUpload: () => void;
  isLoading: boolean;
  createFolder: () => void;
  setModalStatus: (arg: "" | "preview" | "select" | "foldername") => void;
}) => {
  const [url, setUrl] = useState<string[]>([]);

  useEffect(() => {
    const srcs: string[] = [];
    for (const file of selectedImages) {
      srcs.push(URL.createObjectURL(file));
    }

    setUrl(srcs);

    return () =>
      srcs.forEach((src) => {
        URL.revokeObjectURL(src);
      });
  }, [selectedImages]);

  useEffect(() => {
    if (selectedImages.length < 1) {
      setModalStatus("select");
    }
  }, [selectedImages, setModalStatus]);

  return (
    <div className="overflow-hidden">
      <Dialog
        open={true}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            setModalStatus("select");
            setSelectedImages([]);
          }
        }}
      >
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              Preview Images for &quot;{folderName}&quot;
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              {selectedImages.length} image
              {selectedImages.length !== 1 ? "s" : ""} selected
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 max-h-64 overflow-y-auto">
            {selectedImages.map((image, index) => (
              <motion.div
                key={`${image.name} ${image.lastModified}`}
                className="animate-in fade-in-0 zoom-in-95 duration-500 relative group hover:scale-105 "
                style={{ animationDelay: `${index * 100 + 300}ms` }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="aspect-square rounded-xl overflow-hidden bg-gray-100 border-2 border-gray-200 hover:border-blue-300 transition-all duration-200 ">
                  <img
                    src={url[index]}
                    alt={image.name || "Uploaded image preview"}
                    className="w-full h-full object-cover hover:cursor-pointer transition-transform duration-200"
                    loading="lazy"
                  />
                </div>
                <button
                  onClick={() => {
                    const newFiles = [...selectedImages];
                    newFiles.splice(index, 1);
                    setSelectedImages([...newFiles]);
                  }}
                  disabled={isLoading}
                  className="absolute top-2 right-2 w-6 h-6 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center transition-all duration-200 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg md:opacity-0 md:group-hover:opacity-100"
                >
                  <XIcon className="w-3 h-3 text-white" />
                </button>
              </motion.div>
            ))}
          </div>
          <div className="flex justify-between flex-col-reverse md:flex-row gap-4">
            <Button
              variant="outline"
              onClick={() => {
                setModalStatus("select");
                setSelectedImages([]);
              }}
              className="disabled:opacity-50"
              disabled={isLoading}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div className="flex md:space-x-2 gap-2">
              <Button
                variant="outline"
                className="bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50"
                onClick={handleUpload}
                disabled={isLoading}
              >
                Add more
              </Button>
              <Button
                onClick={createFolder}
                className="bg-green-600 hover:bg-green-700 text-white disabled:opacity-50"
                disabled={selectedImages.length === 0 || isLoading}
              >
                <Check className="w-4 h-4 mr-2" />
                {isLoading ? "Creating..." : "Create Folder"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ImagePreviewModal;
