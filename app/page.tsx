"use client";

import { redirect } from "next/navigation";

import { Rootstate } from "@/lib/store";
// import { usePathname, useRouter } from "next/navigation";
// import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function Home() {
  // const router = useRouter();
  const { tab } = useSelector((state: Rootstate) => state.routing);
  // const pathname = usePathname();

  // useEffect(() => {
  //   if (pathname === "/") {
  //     router.push(`/${tab}`);
  //   }

  //   return;
  // }, [tab, router, pathname]);
  redirect(`/${tab}`);

  return <></>;
}
