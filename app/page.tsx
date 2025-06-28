"use client";

import DropDown from "@/components/dropDown";
import CreateFolderModal from "@/components/modals/CreateFolderModal";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
// import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaPlus, FaTrashAlt } from "react-icons/fa";
import { FaFolder, FaRegStar } from "react-icons/fa6";
import { MdOutlinePhotoSizeSelectActual } from "react-icons/md";

export default function Home() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [tab, setTab] = useState(searchParams.get("filter") || "folders");
  const filterValues = ["Recent", "Name(a-z)", "Name(z-a)", "Size"];
  const [values, setValues] = useState("Recent");
  const [createFolder, setCreateFolder] = useState(false);
  const [folderName, setFolderName] = useState("");

  useEffect(() => {
    const filter = searchParams.get("filter");
    if (!filter || filter !== tab) {
      router.replace(`${pathname}?filter=${tab}`);
    }
  }, [router, pathname, searchParams, tab]);
  return (
    <section>
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
    </section>
  );
}
