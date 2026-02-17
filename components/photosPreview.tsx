"use client";
import { RefObject, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { EyeIcon, TrashIcon, UploadIcon, XIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Spinner from "./loaders/Spinner";
import ProgressTracker from "./progress-tracker";
import { handlePhotosUploads } from "@/lib/utils/handlePhotoUpload";
import { useDispatch } from "react-redux";
import { PhotoverseAPI } from "@/services/api";
import { handleImageError, handleImageLoad } from "@/lib/utils";
import PlaceHolder from "./placeholder";

export function formatFileSize(bytes: number) {
  if (bytes === 0) return "0 bytes";

  const units = ["Bytes", "KB", "MB", "GB"];
  const k = 1024;
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return ` ${Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${
    units[i]
  }`;
}

const PhotosPreview = ({
  files,
  setFiles,
  ref,
  folder = "General",
}: {
  files: File[];
  setFiles: (arg: File[]) => void;
  ref: RefObject<HTMLInputElement | null>;
  folder?: string;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [preview, setPreview] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const dispatch = useDispatch();
  const [isError, setIsError] = useState(false);
  const [imageStates, setImageStates] = useState<
    Record<string, "loading" | "loaded" | "error">
  >({});

  useEffect(() => {
    const urls = files.map((item) => URL.createObjectURL(item));
    setPreview(urls);
    const initialStates: Record<string, "loading" | "loaded" | "error"> = {};
    urls.forEach((_, index) => {
      initialStates[`Image${index}`] = "loading";
    });
    setImageStates(initialStates);

    return () => urls.forEach((item) => URL.revokeObjectURL(item));
  }, [files]);

  function handleDone() {
    if (isError) {
      setProgress(0);
      setIsError(false);
      return;
    }
    setProgress(0);
    setIsError(false);
    if (!isError) {
      setFiles([]);
      dispatch(PhotoverseAPI.util.invalidateTags(["photos", "folders"]));
    }
  }

  let size = 0;
  files.forEach((file) => {
    size += file.size;
  });

  const handleClose = () => {
    if (!isLoading) {
      setFiles([]);
      if (ref.current) ref.current.value = "";
    }
  };

  return (
    <AnimatePresence>
      {files.length > 0 && (
        <>
          {/* Backdrop with blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-md z-60"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="fixed inset-4 md:inset-8 lg:inset-16 z-70 flex items-center justify-center"
          >
            <div className="w-full h-full max-w-6xl glass border border-border/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
              {/* Header */}
              <div className="p-4 md:p-6 border-b border-border/30 flex justify-between items-start">
                <div>
                  <h2 className="text-xl md:text-2xl font-bold bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">
                    Ready to Upload
                  </h2>
                  <p className="text-sm md:text-base text-muted-foreground mt-1">
                    {files.length} file{files.length > 1 && "s"} selected •
                    {formatFileSize(size)}
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleClose}
                  disabled={isLoading}
                  className="w-10 h-10 rounded-full glass border border-border/30 hover:border-red-500/50 hover:bg-red-500/10 flex items-center justify-center transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <XIcon className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Content - Scrollable */}
              <div className="flex-1 overflow-y-auto p-4 md:p-6">
                <div className="flex items-center gap-2 mb-4">
                  <EyeIcon className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-semibold">Photo Previews</h3>
                  <span className="text-sm text-muted-foreground">
                    ({files.length})
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  <AnimatePresence mode="sync">
                    {files.map((item, index) => {
                      const imageState =
                        imageStates[`image${index}`] || "loading";
                      const showPlaceholder = imageState !== "loaded";
                      return (
                        <motion.div
                          key={`${item.name} ${item.lastModified}`}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          className="relative group"
                        >
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="aspect-square rounded-xl overflow-hidden glass border border-border/30 hover:border-primary/50 transition-all relative"
                          >
                            {showPlaceholder && (
                              <PlaceHolder imageState={imageState} />
                            )}
                            <Image
                              src={preview[index]}
                              alt={
                                files[index].name || "Uploaded image preview"
                              }
                              className="w-full h-full object-cover"
                              loading="lazy"
                              fill
                              onLoad={(e) => {
                                handleImageLoad(
                                  `image${index}`,
                                  e,
                                  setImageStates,
                                );
                              }}
                              onError={() => {
                                handleImageError(
                                  `image${index}`,
                                  setImageStates,
                                );
                              }}
                            />
                          </motion.div>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => {
                              const newFiles = [...files];
                              newFiles.splice(index, 1);
                              setFiles([...newFiles]);
                            }}
                            disabled={isLoading}
                            className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg md:opacity-0 md:group-hover:opacity-100"
                          >
                            <XIcon className="w-4 h-4 text-white" />
                          </motion.button>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="p-4 md:p-6 border-t border-border/30 flex flex-col md:flex-row gap-3">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    variant="outline"
                    className="w-full md:w-auto glass border-border/30 hover:border-red-500/50 hover:bg-red-500/10 hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-50"
                    onClick={handleClose}
                    disabled={isLoading}
                  >
                    <TrashIcon className="w-4 h-4 mr-2" />
                    Clear All
                  </Button>
                </motion.div>

                {files.length < 10 && (
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      onClick={() => ref.current?.click()}
                      className="w-full md:w-auto glass bg-primary/10 border border-primary/30 hover:bg-primary/20 hover:border-primary/50 disabled:opacity-50"
                      disabled={isLoading}
                    >
                      <UploadIcon className="w-4 h-4 mr-2" />
                      Add More Photos
                    </Button>
                  </motion.div>
                )}

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="md:ml-auto"
                >
                  <Button
                    className="w-full md:w-auto bg-linear-to-r from-primary to-accent hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                    disabled={files.length < 1 || isLoading}
                    onClick={() => {
                      handlePhotosUploads(
                        files,
                        folder,
                        setIsLoading,
                        setProgress,
                        setIsError,
                      );
                    }}
                  >
                    {isLoading ? (
                      <Spinner />
                    ) : (
                      <UploadIcon className="w-4 h-4 mr-2" />
                    )}
                    {isLoading ? "Uploading" : "Upload"} {files.length} file
                    {files.length > 1 && "s"}
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Progress Tracker */}
          {progress > 0 && (
            <div className="fixed inset-0 z-80">
              <ProgressTracker
                progress={progress}
                handleDone={handleDone}
                isLoading={isLoading}
                isError={isError}
              />
            </div>
          )}
        </>
      )}
    </AnimatePresence>
  );
};

export default PhotosPreview;
