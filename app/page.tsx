"use client";

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

  useEffect(() => {
    const filter = searchParams.get("filter");
    if (!filter || filter !== tab) {
      router.replace(`${pathname}?filter=${tab}`);
    }
  }, [router, pathname, searchParams, tab]);
  return (
    <section>
      <nav className="flex justify-between  px-2 my-4 md:hidden">
        <Link href={"/favourites"}>
          <button className="border w-[8.6rem] h-[2.6rem] flex items-center justify-center gap-4 rounded-[5px] border-gray-500">
            <span className="text-blue-500">
              <FaRegStar />
            </span>{" "}
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
        <button className="flex justify-center items-center text-2xl p-4 bg-black text-white rounded-full ">
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
