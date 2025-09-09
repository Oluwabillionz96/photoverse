"use client";
import useInputContext from "@/hooks/useInputContext";
import useModalContext from "@/hooks/useModalContext";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import { FaFolder, FaPlus, FaRegStar, FaTrashAlt } from "react-icons/fa";
import { MdOutlinePhotoSizeSelectActual } from "react-icons/md";

const MobileNavs = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const pathName = usePathname();
  const params = useParams();
  const { changeModalStatus: setModalStatus } = useModalContext();
  const router = useRouter();

  const { ref, openFileDialog, files } = useInputContext();

  return (
    <>
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
      {children}
      {(pathName.startsWith("/folders") || pathName.startsWith("/photos")) &&
        files.length < 1 && (
          <nav className="fixed bottom-0 left-0 right-0 bg-gray-200/50 flex justify-between items-center px-4 py-4 md:hidden">
            <button
              className={`flex flex-col justify-center items-center text-black text-xl  ${
                pathName.startsWith("/photos") ? "text-blue-600" : ""
              }`}
              onClick={() => {
                router.push("/photos");
              }}
            >
              <MdOutlinePhotoSizeSelectActual />
              Photos
            </button>

            <button
              className="flex justify-center items-center text-2xl p-4 bg-black text-white rounded-full "
              onClick={() => {
                if (pathName === "/folders") {
                  setModalStatus("foldername");
                } else if (pathName === "/photos") {
                  openFileDialog(ref);
                } else if (params.folderName) {
                  openFileDialog(ref);
                }
              }}
            >
              <FaPlus />
            </button>

            <button
              className={`flex flex-col justify-center items-center ${
                pathName.startsWith("/folders") ? "text-blue-600" : ""
              } text-xl`}
              onClick={() => {
                router.push("/folders");
              }}
            >
              <FaFolder />
              Folders
            </button>
          </nav>
        )}
    </>
  );
};

export default MobileNavs;
