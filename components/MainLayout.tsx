"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import SideNav from "./SideNav";
import { motion } from "framer-motion";

const Layout = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <motion.header
      className={`bg-[#141414] ${collapsed ? "md:ml-20" : "md:ml-70"}`}
    >
      <Link href={"/"}>
        <Image
          width={100}
          height={100}
          src={"/photoverse-logo.png"}
          alt="logo"
          className="block mx-auto"
        />
      </Link>
      <SideNav collapsed={collapsed} setCollapsed={setCollapsed} />
    </motion.header>
  );
};

export default Layout;
