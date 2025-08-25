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
import { useRouter } from "next/navigation";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [collapsed, setCollapsed] = useState(true);
  const isMobile = useScreenSize();
  const [loginInfo, setLoginInfo] = useState({ email: "", password: "" });
  const { authenticated, loading, token } = useSelector(
    (state: Rootstate) => state.auth
  );
  const { tab } = useSelector((state: Rootstate) => state.routing);
  const dispatch = useAppDispatch();
  const [registerInfo, setRegisterInfo] = useState({
    email: "",
    password: "",
    confirmedPassword: "",
  });
  const router = useRouter();

  useEffect(() => {
    if (token) {
      dispatch(getUser());
    } else {
      dispatch(refreshAccessToken());
    }
  }, [token, dispatch]);

  useEffect(() => {
    router.push(`/${tab}`);
  }, [tab, router]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <motion.main
          // animate={{
          //   marginLeft: !isMobile ? (collapsed ? "5rem" : "17.5rem") : "",
          // }}
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
