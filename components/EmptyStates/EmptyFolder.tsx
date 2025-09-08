"use client";
import { FolderIcon, FolderPlusIcon, ImageIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { changeModalStatus } from "@/lib/slices/routingSlice";
import { useRouter } from "next/navigation";

const EmptyFolder = () => {
  const dispatch = useDispatch();
  const setModalStatus = (value: "" | "preview" | "select" | "foldername") => {
    dispatch(changeModalStatus(value));
  };
  const router = useRouter();
  return (
    <>
      {
        <div className="flex flex-col items-center justify-center  min-h-fit text-center animate-in fade-in-50 duration-500">
          <div className="relative md:mb-6 mb-8 animate-in slide-in-from-top-4 duration-700 delay-150">
            <div className="w-24 h-24  bg-gradient-to-br from-blue-100 to-blue-200 md:rounded-2xl rounded-3xl flex items-center justify-center mb-4 transition-all duration-500 hover:scale-110 hover:rotate-3 hover:shadow-xl">
              <FolderIcon className="md:w-12 md:h-12 w-16 h-16 text-blue-500 transition-all duration-300" />
            </div>
            <div className="absolute md:-top-1 md:-right-1 -top-2 -right-2 md:w-8 md:h-8 w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 md:rounded-xl rounded-2xl flex items-center justify-center animate-bounce">
              <FolderPlusIcon className="w-4 h-4 text-purple-500" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 md:text-xl md:mb-2">
            No Folders yet
          </h1>
          <p className="text-gray-600 md:mb-6 mb-8 md:max-w-sm max-w-md leading-relaxed md:text-sm lg:text-[1rem] text-base md:px-4 px-0">
            Create your first folder to organize your files and keep everything
            tidy
          </p>
          <div className="flex flex-col md:flex-row gap-3 w-full justify-center items-center min-w-fit overflow-hidden md:w-[25%] lg:w-[15%] md:p-4">
            <Button
              className={`flex items-center justify-center space-x-2 bg-blue-500 hover:bg-blue-600 transition-all duration-200 hover:scale-105 hover:shadow-lg w-full md:w-auto`}
              onClick={() => {
                setModalStatus("foldername");
              }}
            >
              <>
                <FolderPlusIcon className="w-4 h-4" />
                Create New Folder
              </>
            </Button>
            <Button
              variant="outline"
              className="flex items-center justify-center space-x-2 bg-transparent transition-all w-full md:w-auto duration-200 hover:scale-105 hover:shadow-md"
              onClick={() => {
                router.push("photos");
              }}
            >
              <ImageIcon className={`w-4 h-4 `} />
              <span className={` "text-white"}`}>Browse Photos</span>
            </Button>
          </div>
        </div>
      }
    </>
  );
};

export default EmptyFolder;
