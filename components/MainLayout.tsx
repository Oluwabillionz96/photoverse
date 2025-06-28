"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import SideNav from "./SideNav";
import { motion } from "framer-motion";
import useScreenSize from "@/hooks/useScreenSize";
import AuthenticationModal from "./modals/AuthenticationModal";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);
  const isMobile = useScreenSize();
  return (
    <>
      <motion.main
        initial={{
          marginLeft: isMobile ? 0 : "17.5rem",
        }}
        animate={{
          marginLeft: isMobile ? "0" : collapsed ? "5rem" : "17.5rem",
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="relative"
      >
        <AuthenticationModal />
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
    </>
  );
};

export default Layout;
