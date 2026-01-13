"use client";

// import React, { useState } from "react";
import { Button } from "./ui/button";
import { MdOutlinePhotoSizeSelectActual } from "react-icons/md";
// import DropDown from "./dropDown";
import { FaFolder, FaPlus } from "react-icons/fa";
import { redirect, useParams, usePathname, useRouter } from "next/navigation";
import useModalContext from "@/hooks/useModalContext";
import useInputContext from "@/hooks/useInputContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { IoSettingsSharp } from "react-icons/io5";

import { Loading } from "./loaders/Loading";
import useLogout from "@/hooks/useLogout";

const TabLayouts = () => {
  const pathname = usePathname();
  const params = useParams();
  const router = useRouter();
  const { ref, openFileDialog } = useInputContext();
  const { modalStatus, changeModalStatus: setModalStatus } = useModalContext();
  const { logout } = useLogout();
  return (
    <>
      {false ? (
        <Loading />
      ) : (
        <div className="md:flex  justify-between items-center px-4 my-4 hidden">
          <div className="flex justify-center  gap-8">
            <Button
              variant={"outline"}
              className={`w-[8.6rem] hover:transition hover:duration-500 h-[2.6rem] flex items-center  hover:bg-white hover:scale-105 hover:rotate-1 hover:border-blue-500 hover:text-blue-500 hover:border justify-center gap-4 rounded-[5px] hover:cursor-pointer ${
                pathname.startsWith(`/photos`)
                  ? "bg-blue-500 hover:bg-blue-500 hover:text-white hover:border-none  text-white border-0"
                  : ""
              }`}
              onClick={() => {
                router.push("/photos");
              }}
            >
              <MdOutlinePhotoSizeSelectActual
                className={
                  !pathname.startsWith("/photos") ? "text-blue-500" : ""
                }
              />
              Photos
            </Button>

            <Button
              variant={"outline"}
              className={`w-[8.6rem] h-[2.6rem] hover:transition hover:duration-500 flex items-center  hover:bg-white hover:scale-105 hover:rotate-1 hover:border-blue-500 hover:text-blue-500 hover:border justify-center gap-4 rounded-[5px] hover:cursor-pointer ${
                pathname.startsWith(`/folders`)
                  ? "bg-blue-500 hover:bg-blue-500 hover:text-white hover:border-none  text-white border-0"
                  : ""
              }`}
              onClick={() => {
                router.push("/folders");
              }}
            >
              <FaFolder
                className={
                  !pathname.startsWith(`/folders`) ? "text-blue-500" : ""
                }
              />
              Folders
            </Button>
          </div>
          <div className="flex items-center justify-center gap-6 relative">
            <Button
              variant={"outline"}
              disabled={modalStatus === "foldername"}
              className="w-[8.6rem] h-[2.6rem] flex items-center disabled:cursor-not-allowed justify-center gap-2"
              onClick={() => {
                if (params.folderName || pathname === "/photos") {
                  openFileDialog(ref);
                  return;
                }
                setModalStatus("foldername");
              }}
            >
              <FaPlus />
              {pathname === "/folders"
                ? "Create Folder"
                : params.folderName || pathname === "/photos"
                ? "Add photo"
                : ""}
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="flex items-center justify-center gap-2"
                >
                  <IoSettingsSharp /> Settings
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-16" align="end">
                <DropdownMenuItem
                  onClick={() => {
                    logout();
                    redirect("/");
                  }}
                >
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      )}
    </>
  );
};

export default TabLayouts;
