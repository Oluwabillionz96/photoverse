"use client";

import { Rootstate } from "@/lib/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function Home() {
  const router = useRouter();
  const { tab } = useSelector((state: Rootstate) => state.routing);

  useEffect(() => {
    router.push(`/${tab}`);
  }, [tab, router]);


  return (
    <>
    </>
  );
}
