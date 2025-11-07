import { usePathname, useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { MdOutlinePhotoSizeSelectActual } from "react-icons/md";
import { FaFolder } from "react-icons/fa";

const DesktopTabNavs = () => {
  const pathname = usePathname();
  const router = useRouter();
  return (
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
          className={!pathname.startsWith("/photos") ? "text-blue-500" : ""}
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
          className={!pathname.startsWith(`/folders`) ? "text-blue-500" : ""}
        />
        Folders
      </Button>
    </div>
  );
};

export default DesktopTabNavs;
