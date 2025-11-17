import Link from "next/link";
import { FaRegHeart, FaTrashAlt } from "react-icons/fa";

const TopMobileNav = () => {
  return (
    <nav className="flex justify-between  px-2 my-4 md:hidden ">
      <Link href={"/favourites"}>
        <button className="border w-[8.6rem] h-[2.6rem] flex items-center justify-center gap-4 rounded-[5px] border-gray-500">
          <span className="text-blue-500">
            <FaRegHeart />
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
  );
};

export default TopMobileNav;
