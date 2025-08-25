import {
  AlertTriangleIcon,
  FolderIcon,
  FolderPlusIcon,
  ImageIcon,
  ImagePlusIcon,
} from "lucide-react";
import { Button } from "./ui/button";
import useScreenSize from "@/hooks/useScreenSize";
import PhotosPreview from "./photosPreview";
import { RefObject } from "react";
import { usePathname } from "next/navigation";

const EmptyState = ({
  tab,
  setCreateFolder,
  setTab,
  handleUpload,
  files,
  setFiles,
  ref,
}: {
  tab: string;
  setCreateFolder: (arg: boolean) => void;
  setTab: (arg: string) => void;
  handleUpload?: () => void;
  files?: File[];
  ref?: RefObject<HTMLInputElement | null>;
  setFiles?: (arg: File[]) => void;
}) => {
  const isMobile = useScreenSize();
  const pathname = usePathname();
  const isPhoto = tab === "photos" && pathname === "/photos";
  const isFolder = tab === "folders" && pathname === "/folders";
  return (
    <>
      {isPhoto &&
      files &&
      files.length > 0 &&
      setFiles !== undefined &&
      ref !== undefined ? (
        <PhotosPreview files={files} setFiles={setFiles} ref={ref} />
      ) : (
        <div className="flex flex-col items-center justify-center  min-h-fit text-center animate-in fade-in-50 duration-500">
          {isFolder ? (
            <div className="relative md:mb-6 mb-8 animate-in slide-in-from-top-4 duration-700 delay-150">
              <div className="w-24 h-24  bg-gradient-to-br from-blue-100 to-blue-200 md:rounded-2xl rounded-3xl flex items-center justify-center mb-4 transition-all duration-500 hover:scale-110 hover:rotate-3 hover:shadow-xl">
                <FolderIcon className="md:w-12 md:h-12 w-16 h-16 text-blue-500 transition-all duration-300" />
              </div>
              <div className="absolute md:-top-1 md:-right-1 -top-2 -right-2 md:w-8 md:h-8 w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 md:rounded-xl rounded-2xl flex items-center justify-center animate-bounce">
                <FolderPlusIcon className="w-4 h-4 text-purple-500" />
              </div>
            </div>
          ) : isPhoto ? (
            <div className="relative md:mb-6 mb-8 animate-in slide-in-from-top-4 duration-700 delay-150">
              <div className=" w-24 h-24 bg-gradient-to-br from-green-100 to-green-200 md:rounded-2xl rounded-3xl flex items-center justify-center mb-4 transition-all duration-500 hover:scale-110 hover:rotate-3 hover:shadow-xl">
                <ImageIcon className="w-12 h-12 text-green-500 transition-all duration-300" />
              </div>
              <div className="absolute md:-top-1 md:-right-1 -top-2 -right-2 md:w-8 md:h-8 w-12 h-12 bg-gradient-to-br from-pink-100 to-pink-200 md:rounded-xl rounded-2xl flex items-center justify-center animate-bounce">
                <ImagePlusIcon className="md:w-4 sm:h-4 w-6 h-6 text-pink-500" />
              </div>
            </div>
          ) : (
            <>
              <div className="relative mb-6 sm:mb-8">
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-red-100 to-orange-100 rounded-full flex items-center justify-center animate-in zoom-in-50 duration-500 delay-200">
                  <AlertTriangleIcon className="w-10 h-10 sm:w-12 sm:h-12 text-red-500 animate-pulse" />
                </div>
                {/* Decorative circles */}
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-200 rounded-full animate-bounce delay-300"></div>
                <div className="absolute -bottom-1 -left-2 w-4 h-4 bg-orange-200 rounded-full animate-bounce delay-500"></div>
              </div>
            </>
          )}
          {isFolder || isPhoto ? (
            <h1 className="text-2xl font-bold text-gray-900 md:text-xl md:mb-2">
              No {tab} yet
            </h1>
          ) : (
            <h1 className="text-2xl font-bold text-gray-900 md:text-xl md:mb-2">
              Oops! Seems you&apos;re lost
            </h1>
          )}
          <p className="text-gray-600 md:mb-6 mb-8 md:max-w-sm max-w-md leading-relaxed md:text-sm lg:text-[1rem] text-base md:px-4 px-0">
            {isFolder
              ? "Create your first folder to organize your files and keep everything tidy"
              : isPhoto
              ? "Upload your first photos to start building your collection. Supported formats include JPG, PNG, GIF, and more."
              : "Let's get you back on track"}
          </p>
          <div className="flex flex-col md:flex-row gap-3 w-full justify-center items-center min-w-fit overflow-hidden md:w-[25%] lg:w-[15%] md:p-4">
            <Button
              className={`flex items-center justify-center space-x-2 ${
                isPhoto
                  ? " bg-green-500 hover:bg-green-600"
                  : "bg-blue-500 hover:bg-blue-600"
              } transition-all duration-200 hover:scale-105 hover:shadow-lg w-full md:w-auto`}
              onClick={() => {
                if (isFolder) {
                  setCreateFolder(true);
                } else if (isPhoto && handleUpload !== undefined) {
                  handleUpload();
                } else {
                  setTab("folders");
                }
              }}
            >
              {isFolder ? (
                <>
                  <FolderPlusIcon className="w-4 h-4" />
                  Create New Folder
                </>
              ) : isPhoto ? (
                <>
                  <ImagePlusIcon className="w-4 h-4" />
                  Upload Photos
                </>
              ) : (
                <>
                  <FolderIcon className="w-4 h-4" />
                  <span>Browse Folders</span>
                </>
              )}
            </Button>
            <Button
              variant="outline"
              className={`flex items-center justify-center space-x-2 ${
                isFolder || isPhoto
                  ? "bg-transparent"
                  : " bg-green-500 hover:bg-green-600"
              } transition-all w-full md:w-auto duration-200 hover:scale-105 hover:shadow-md`}
              onClick={() => {
                if (tab === "photos") {
                  setTab("folders");
                } else {
                  setTab("photos");
                }
              }}
            >
              {tab === "photos" ? (
                <>
                  <FolderIcon className="w-4 h-4" />
                  <span>Browse Folders</span>
                </>
              ) : (
                <>
                  <ImageIcon
                    className={`w-4 h-4 ${
                      !(isFolder || isPhoto) && "text-white"
                    }`}
                  />
                  <span className={`${!(isFolder || isPhoto) && "text-white"}`}>
                    Browse Photos
                  </span>
                </>
              )}
            </Button>
          </div>
          {tab === "photos" && !isMobile && (
            <div className="md:mt-8 mt-12 md:p-4 p-6 bg-gray-50 md:rounded-xl rounded-2xl md:max-w-sm max-w-md md:w-full w-auto animate-in slide-in-from-bottom-4  hover:bg-gray-100 transition-colors duration-300">
              <h3 className="font-semibold text-gray-900 mb-2 md:text-sm text-base">
                Quick tip
              </h3>
              <p className="md:text-xs text-sm text-gray-600">
                You can drag and drop files directly into this area, or use the
                upload button to browse your device.
              </p>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default EmptyState;
