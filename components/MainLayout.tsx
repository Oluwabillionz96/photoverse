"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import SideNav from "./SideNav";
import { motion } from "framer-motion";
import useScreenSize from "@/hooks/useScreenSize";
import AuthenticationModal from "./AuthenticationModal";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const isMobile = useScreenSize();

  useEffect(() => {
    setIsAuthenticated(false);
  }, []);
  return (
    <>
      <motion.main
        animate={{
          marginLeft: isMobile ? "0" : collapsed ? "5rem" : "17.5rem",
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="relative"
      >
        {/* {!isAuthenticated && <AuthenticationModal />} */}
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
