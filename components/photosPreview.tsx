import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { EyeIcon, TrashIcon, UploadIcon, XIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const PhotosPreview = ({
  files,
  setFiles,
}: {
  files: File[];
  setFiles: (arg: File[]) => void;
}) => {
  const [previews, setPreviews] = useState(
    files.map((file) => URL.createObjectURL(file))
  );
  function formatFileSize(byte: number) {
    if (byte === 0) return "0 bytes";

    const units = ["bytes", "KB", "MB", "GB"];
    const k = 1024;
    const i = Math.floor(Math.log(byte) / Math.log(k));

    return ` ${Number.parseFloat((byte / Math.pow(k, i)).toFixed(2))} ${
      units[i]
    }`;
  }

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
          >
            <TrashIcon className="w-4 h-4" />
            <span className="hidden md:inline">Clear</span>
            <span className="inline md:hidden">Clear All</span>
          </Button>
          <Button className="flex items-center gap-2 bg-green-500 hover:bg-green-600 transition-all duration-200 hover:scale-105 hover:shadow-lg md:px-4 px-6">
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
          <AnimatePresence>
            {previews.map((item, index) => (
              <motion.div
                key={index}
                className="animate-in fade-in-0 zoom-in-95 duration-500 relative group hover:scale-105 "
                style={{ animationDelay: `${index * 100 + 300}ms` }}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
              >
                <div className="aspect-square rounded-xl overflow-hidden bg-gray-100 border-2 border-gray-200 hover:border-blue-300 transition-all duration-200 ">
                  <img
                    src={item}
                    alt={files[index].name}
                    className="w-full h-full object-cover hover:cursor-pointer transition-transform duration-200"
                  />
                </div>
                <button
                  // onClick={() => onRemoveFile(file.id)}
                  onClick={() => {
                    const newFiles = [...files];
                    const newPreviews = [...previews];
                    newFiles.splice(index, 1);
                    newPreviews.splice(index, 1);
                    setFiles([...newFiles]);
                    setPreviews(newPreviews);
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
      </div>
    </>
  );
};

export default PhotosPreview;
