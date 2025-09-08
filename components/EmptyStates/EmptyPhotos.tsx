"use client";
import { FolderIcon, ImageIcon, ImagePlusIcon } from "lucide-react";
import { Button } from "../ui/button";
import useScreenSize from "@/hooks/useScreenSize";
import PhotosPreview from "../photosPreview";
import { RefObject } from "react";
import { useRouter } from "next/navigation";

const EmptyPhotos = ({
  handleUpload,
  files,
  setFiles,
  ref,
}: {
  handleUpload: (arg: RefObject<HTMLInputElement | null>) => void;
  files: File[];
  ref: RefObject<HTMLInputElement | null>;
  setFiles: (arg: File[]) => void;
}) => {
  const isMobile = useScreenSize();
  const router = useRouter();
  return (
    <>
      {files.length > 0 ? (
        <PhotosPreview files={files} setFiles={setFiles} ref={ref} />
      ) : (
        <div className="flex flex-col items-center justify-center  min-h-fit text-center animate-in fade-in-50 duration-500">
          <div className="relative md:mb-6 mb-8 animate-in slide-in-from-top-4 duration-700 delay-150">
            <div className=" w-24 h-24 bg-gradient-to-br from-green-100 to-green-200 md:rounded-2xl rounded-3xl flex items-center justify-center mb-4 transition-all duration-500 hover:scale-110 hover:rotate-3 hover:shadow-xl">
              <ImageIcon className="w-12 h-12 text-green-500 transition-all duration-300" />
            </div>
            <div className="absolute md:-top-1 md:-right-1 -top-2 -right-2 md:w-8 md:h-8 w-12 h-12 bg-gradient-to-br from-pink-100 to-pink-200 md:rounded-xl rounded-2xl flex items-center justify-center animate-bounce">
              <ImagePlusIcon className="md:w-4 sm:h-4 w-6 h-6 text-pink-500" />
            </div>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 md:text-xl md:mb-2">
            No Photos yet
          </h1>

          <p className="text-gray-600 md:mb-6 mb-8 md:max-w-sm max-w-md leading-relaxed md:text-sm lg:text-[1rem] text-base md:px-4 px-0">
            Upload your first photos to start building your collection.
            Supported formats include JPG, PNG, GIF, and more.
          </p>
          <div className="flex flex-col md:flex-row gap-3 w-full justify-center items-center min-w-fit overflow-hidden md:w-[25%] lg:w-[15%] md:p-4">
            <Button
              className={`flex items-center justify-center space-x-2 
                 " bg-green-500 hover:bg-green-600"
             transition-all duration-200 hover:scale-105 hover:shadow-lg w-full md:w-auto`}
              onClick={() => {
                handleUpload(ref);
              }}
            >
              <>
                <ImagePlusIcon className="w-4 h-4" />
                Upload Photos
              </>
            </Button>
            <Button
              variant="outline"
              className={`flex items-center justify-center space-x-2 
                bg-transparent
             transition-all w-full md:w-auto duration-200 hover:scale-105 hover:shadow-md`}
              onClick={() => {
                router.push("/folders");
              }}
            >
              <>
                <FolderIcon className="w-4 h-4" />
                <span>Browse Folders</span>
              </>
            </Button>
          </div>
          {!isMobile ? (
            <div className="md:mt-8 mt-12 md:p-4 p-6 bg-gray-50 md:rounded-xl rounded-2xl md:max-w-sm max-w-md md:w-full w-auto animate-in slide-in-from-bottom-4  hover:bg-gray-100 transition-colors duration-300">
              <h3 className="font-semibold text-gray-900 mb-2 md:text-sm text-base">
                Quick tip
              </h3>
              <p className="md:text-xs text-sm text-gray-600">
                You can drag and drop files directly into this area, or use the
                upload button to browse your device.
              </p>
            </div>
          ) : null}
        </div>
      )}
    </>
  );
};

export default EmptyPhotos;
