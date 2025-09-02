"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import SideNav from "./SideNav";
import { motion } from "framer-motion";
import useScreenSize from "@/hooks/useScreenSize";
import AuthenticationModal, { Loading } from "./modals/AuthenticationModal";
import { useSelector } from "react-redux";
import { Rootstate } from "@/lib/store";
import { getUser, refreshAccessToken } from "@/lib/slices/authSlice";
import useAppDispatch from "@/hooks/useAppDispatch";
import MobileNavs from "./MobileNavs";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const isCollapsed =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("collapsed") || "true")
      : true;
  const [collapsed, setCollapsed] = useState(true);
  useEffect(() => {
    setCollapsed(isCollapsed);
  }, []);
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
      dispatch(getUser());
    } else {
      dispatch(refreshAccessToken());
    }
  }, [token, dispatch]);


  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <motion.main
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className={`relative mb-24 md:mb-0 ${
            !isMobile && collapsed
              ? "ml-[5rem]"
              : "md:ml-[9rem] lg:ml-[17.5rem]"
          }`}
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
          <MobileNavs>{children}</MobileNavs>
        </motion.main>
      )}
    </>
  );
};

export default Layout;
