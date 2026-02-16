"use client";

import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode } from "react";
import { FaArrowLeft } from "react-icons/fa";

const Layout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const router = useRouter();

  const currentPath = pathname.startsWith("/favourites")
    ? "Favourites"
    : pathname.startsWith("/trash")
    ? "Trash"
    : "";
  return (
    <>
      <div className="flex items-center mb-4 border-b border-border/30 pb-4 text-xl">
        <Button
          onClick={() => {
            router.back();
          }}
          className="w-fit h-fit bg-transparent hover:bg-transparent flex items-center justify-center text-foreground"
        >
          <FaArrowLeft />
        </Button>
        <p className="font-semibold">{currentPath}</p>
      </div>
      {children}
    </>
  );
};

export default Layout;
