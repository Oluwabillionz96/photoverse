"use client";

import DropDown from "@/components/dropDown";
import EmptyState from "@/components/EmptyState";
import CreateFolderModal from "@/components/modals/CreateFolderModal";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
// import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { FaPlus, FaTrashAlt } from "react-icons/fa";
import { FaFolder, FaRegStar } from "react-icons/fa6";
import { MdOutlinePhotoSizeSelectActual } from "react-icons/md";

export default function Home() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [files, setFiles] = useState<File[]>([]);

  const [tab, setTab] = useState(searchParams.get("filter") || "folders");
  const filterValues = ["Recent", "Name(a-z)", "Name(z-a)", "Size"];
  const [values, setValues] = useState("Recent");
  const [createFolder, setCreateFolder] = useState(false);
  const [folderName, setFolderName] = useState("");
  const fileInput = useRef<HTMLInputElement>(null);

  function handleUpload() {
    fileInput.current?.click();
  }

  useEffect(() => {
    const filter = searchParams.get("filter");
    if (!filter || filter !== tab) {
      router.replace(`${pathname}?filter=${tab}`);
    }
  }, [router, pathname, searchParams, tab]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles.length >= 10) {
      selectedFiles.splice(10 - files.length);
      toast.error("Only ten files must be uploaded at a time");
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
    <>
      {/* Mobile Nav */}
      <nav className="flex justify-between  px-2 my-4 md:hidden ">
        <Link href={"/favourites"}>
          <button className="border w-[8.6rem] h-[2.6rem] flex items-center justify-center gap-4 rounded-[5px] border-gray-500">
            <span className="text-blue-500">
              <FaRegStar />
            </span>
            Favourites
          </button>
        </Link>

        <Link href={"/trash"}>
          <button className="border w-[8.6rem] h-[2.6rem] flex items-center justify-center gap-4 rounded-[5px] border-gray-500">
            <span className="text-blue-500">
              <FaTrashAlt />
            </span>{" "}
            Trash
          </button>
        </Link>
      </nav>

      <div className="md:flex  justify-between items-center px-4 my-4 hidden">
        <div className="flex justify-center  gap-8">
          <Button
            variant={"outline"}
            className={`w-[8.6rem] hover:transition hover:duration-500 h-[2.6rem] flex items-center  hover:bg-white hover:scale-105 hover:rotate-1 hover:border-blue-500 hover:text-blue-500 hover:border justify-center gap-4 rounded-[5px] hover:cursor-pointer ${
              tab === "photos" &&
              "bg-blue-500 hover:bg-blue-500 hover:text-white hover:border-none  text-white border-0"
            }`}
            onClick={() => {
              setTab("photos");
            }}
          >
            <MdOutlinePhotoSizeSelectActual
              className={`${tab !== "photos" && "text-blue-500"}`}
            />
            Photos
          </Button>

          <Button
            variant={"outline"}
            className={`w-[8.6rem] h-[2.6rem] hover:transition hover:duration-500 flex items-center  hover:bg-white hover:scale-105 hover:rotate-1 hover:border-blue-500 hover:text-blue-500 hover:border justify-center gap-4 rounded-[5px] hover:cursor-pointer ${
              tab === "folders" &&
              "bg-blue-500 hover:bg-blue-500 hover:text-white hover:border-none  text-white border-0"
            }`}
            onClick={() => {
              setTab("folders");
            }}
          >
            <FaFolder className={`${tab !== "folders" && "text-blue-500"}`} />
            Folders
          </Button>
        </div>
        <div className="flex items-center justify-center gap-6 relative">
          <DropDown
            trigger={values}
            items={filterValues}
            initialValue={values}
            changeValue={setValues}
            className="w-32"
          />
          <Button
            variant={"outline"}
            disabled={createFolder}
            className="w-[8.6rem] h-[2.6rem] flex items-center disabled:cursor-not-allowed justify-center gap-2"
            onClick={() => setCreateFolder(true)}
          >
            <FaPlus />
            Create Folder
          </Button>
          <CreateFolderModal
            value={folderName}
            open={createFolder}
            setOpen={setCreateFolder}
            setValue={setFolderName}
          />
        </div>
      </div>

      <section className=" pt-5 mx-2 h-fit md:py-20">
        <EmptyState
          tab={tab}
          setCreateFolder={setCreateFolder}
          setTab={setTab}
          handleUpload={handleUpload}
          files={files}
          setFiles={setFiles}
          ref={fileInput}
        />
      </section>
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
      <nav className="fixed bottom-0 left-0 right-0 bg-gray-200/50 flex justify-between items-center px-4 py-4 md:hidden">
        <button
          className={`flex flex-col justify-center items-center text-black text-xl  ${
            tab === "photos" && "text-blue-600"
          }`}
          onClick={() => {
            setTab("photos");
          }}
        >
          <MdOutlinePhotoSizeSelectActual />
          Photos
        </button>
        <button
          className="flex justify-center items-center text-2xl p-4 bg-black text-white rounded-full "
          onClick={() => setCreateFolder(true)}
        >
          <FaPlus />
        </button>{" "}
        <button
          className={`flex flex-col justify-center items-center ${
            tab === "folders" && "text-blue-600"
          } text-xl`}
          onClick={() => {
            setTab("folders");
          }}
        >
          <FaFolder />
          Folders
        </button>
      </nav>
    </>
  );
}
