"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import SideNav from "./SideNav";
import { motion } from "framer-motion";
import useScreenSize from "@/hooks/useScreenSize";
import AuthenticationModal from "./modals/AuthenticationModal";
import { useSelector } from "react-redux";
import { Rootstate } from "@/lib/store";
import { verifyToken } from "@/lib/slices/authSlice";
import useAppDispatch from "@/hooks/useAppDispatch";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);
  const isMobile = useScreenSize();
  const [loginInfo, setLoginInfo] = useState({ email: "", password: "" });
  const { authenticated, loading, token } = useSelector(
    (state: Rootstate) => state.auth
  );
  const dispatch = useAppDispatch();
  const [registerInfo, setRegisterInfo] = useState({
    email: "",
    password: "",
    confirmedPassword: "",
  });

  useEffect(() => {
    if (token) {
      dispatch(verifyToken());
    }
  }, [token, dispatch]);

  if (loading) {
    return <div>Loading...</div>; // Or your loading component
  }

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
        {!authenticated && (
          <AuthenticationModal
            loginInfo={loginInfo}
            setLoginInfo={setLoginInfo}
            registerInfo={registerInfo}
            setRegisterInfo={setRegisterInfo}
          />
        )}
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
