import { changeModalStatus, changeTab } from "@/lib/slices/routingSlice";
import { Rootstate } from "@/lib/store";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaFolder, FaPlus, FaRegStar, FaTrashAlt } from "react-icons/fa";
import { MdOutlinePhotoSizeSelectActual } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

const MobileNavs = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const { tab } = useSelector((state: Rootstate) => state.routing);
  const pathName = usePathname();
  const dispatch = useDispatch();
  const setModalStatus = (value: "" | "preview" | "select" | "foldername") => {
    dispatch(changeModalStatus(value));
  };
  function setTab(value: "folders" | "photos") {
    dispatch(changeTab(value));
  }

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
      {(pathName === "/folders" || pathName === "/photos") && (
        <nav className="fixed bottom-0 left-0 right-0 bg-gray-200/50 flex justify-between items-center px-4 py-4 md:hidden">
          <button
            className={`flex flex-col justify-center items-center text-black text-xl  ${
              tab === "photos" && pathName === "/photos" ? "text-blue-600" : ""
            }`}
            onClick={() => {
              setTab("photos");
            }}
          >
            <MdOutlinePhotoSizeSelectActual />
            Photos
          </button>
          {pathName === "/folders" && (
            <button
              className="flex justify-center items-center text-2xl p-4 bg-black text-white rounded-full "
              onClick={() => {
                if (pathName === "/folders") {
                  setModalStatus("foldername");
                }
              }}
            >
              <FaPlus />
            </button>
          )}
          <button
            className={`flex flex-col justify-center items-center ${
              tab === "folders" && pathName === "/folders"
                ? "text-blue-600"
                : ""
            } text-xl`}
            onClick={() => {
              setTab("folders");
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
