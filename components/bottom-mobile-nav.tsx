import useInputContext from "@/hooks/useInputContext";
import useModalContext from "@/hooks/useModalContext";
import { useParams, useRouter } from "next/navigation";
import { FaFolder, FaPlus } from "react-icons/fa";
import { MdOutlinePhotoSizeSelectActual } from "react-icons/md";

const BottomMobileNav = ({ pathName }: { pathName: string }) => {
  const params = useParams();
  const { changeModalStatus: setModalStatus } = useModalContext();
  const router = useRouter();
  const { ref, openFileDialog } = useInputContext();
  return (
    <nav className="fixed bottom-0 z-50 left-0 right-0 bg-gray-200/50 flex justify-between items-center px-4 py-4 md:hidden">
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
  );
};

export default BottomMobileNav;
