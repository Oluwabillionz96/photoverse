"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import SideNav from "./SideNav";
import { motion } from "framer-motion";
import useScreenSize from "@/hooks/useScreenSize";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);
  const isMobile = useScreenSize();
  return (
    <motion.main
      animate={{
        marginLeft: isMobile ? "0" : collapsed ? "5rem" : "17.5rem",
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <motion.header className={`bg-[#141414]`}>
        <Link href={"/"}>
          <Image
            width={100}
            height={100}
            src={"/photoverse-logo.png"}
            alt="logo"
            className="block mx-auto"
          />
        </Link>
      </motion.header>
      <SideNav collapsed={collapsed} setCollapsed={setCollapsed} />
      {children}
    </motion.main>
  );
};

export default Layout;
