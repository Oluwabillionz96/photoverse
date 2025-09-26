"use client";

import { Button } from "@/components/ui/button";
import { Rootstate } from "@/lib/store";
import { redirect, usePathname, useRouter } from "next/navigation";
import { ReactNode } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useSelector } from "react-redux";

const Layout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { authenticated } = useSelector((state: Rootstate) => state.auth);

  if (!authenticated) {
    redirect("/");
  }

  const currentPath = pathname.startsWith("/favourites")
    ? "Favourites"
    : pathname.startsWith("/trash")
    ? "Trash"
    : "";
  return (
    <>
      <div className="flex items-center my-4 border-b pb-4  text-xl">
        <Button
          onClick={() => {
            router.back();
          }}
          className="w-fit h-fit text-black bg-transparent hover:bg-transparent flex items-center justify-center"
        >
          <FaArrowLeft />
        </Button>
        <p className="">{currentPath}</p>
      </div>
      {children}
    </>
  );
};

export default Layout;
