"use client";
import Image from "next/image";
import Link from "next/link";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import SideNav from "./SideNav";
import { motion } from "framer-motion";
import useScreenSize from "@/hooks/useScreenSize";
import AuthenticationModal, { Loading } from "./modals/AuthenticationModal";
import { useSelector } from "react-redux";
import { Rootstate } from "@/lib/store";
import {
  getUser,
  logUserOut,
  refreshAccessToken,
} from "@/lib/slices/authSlice";
import useAppDispatch from "@/hooks/useAppDispatch";
import MobileNavs from "./MobileNavs";
import {
  handleFileChange,
  openFileDialog,
} from "@/lib/utils/handleInputChange";
import { InputContext } from "@/hooks/useInputContext";
import { ModalContext } from "@/hooks/useModalContext";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useLogoutMutation } from "@/services/api";
import toast from "react-hot-toast";
import { FaUser } from "react-icons/fa";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const isCollapsed =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("collapsed") || "true")
      : true;
  const [collapsed, setCollapsed] = useState(true);
  useEffect(() => {
    setCollapsed(isCollapsed);
  }, [isCollapsed]);
  const isMobile = useScreenSize();
  const [loginInfo, setLoginInfo] = useState({ email: "", password: "" });
  const { authenticated, loading, token, refreshToken } = useSelector(
    (state: Rootstate) => state.auth
  );
  const dispatch = useAppDispatch();
  const [registerInfo, setRegisterInfo] = useState({
    email: "",
    password: "",
    confirmedPassword: "",
  });
  const fileInput = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [modalStatus, setModalStatus] = useState<
    "" | "preview" | "select" | "foldername"
  >("");
  const [logout, { isLoading }] = useLogoutMutation();

  useEffect(() => {
    if (token) {
      dispatch(getUser());
    } else {
      dispatch(refreshAccessToken());
    }
  }, [token, dispatch]);

  async function Logout() {
    const payload = { token: refreshToken };

    const response = await logout(payload);
    if ("data" in response) {
      dispatch(logUserOut(false));
      toast.success(response.data?.message);
    } else if ("error" in response) {
      const error = response.error as {
        status?: number | string;
        data?: { error: string };
      };

      const message =
        error?.data?.error ||
        (error?.status === "FETCH_ERROR"
          ? "Network error. Please check your connection."
          : "An unexpected error occurred.");

      toast.error(message);
    }
  }

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <motion.main
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className={`relative ${files.length < 1 ? "mb-24" : "mb-0"} md:mb-0 ${
            isMobile
              ? "ml-0"
              : collapsed
              ? "md:ml-[5rem]"
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
          <ModalContext
            value={{ modalStatus, changeModalStatus: setModalStatus }}
          >
            <InputContext
              value={{
                ref: fileInput,
                openFileDialog: openFileDialog,
                files: files,
                setFiles: setFiles,
              }}
            >
              <motion.header
                className={`bg-[#141414] relative flex justify-around items-center`}
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

                <div className="md:hidden">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        className="flex items-center justify-center gap-2 text-black"
                      >
                        <FaUser />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-16" align="end">
                      <DropdownMenuItem onClick={Logout}>
                        Log out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </motion.header>
              <SideNav collapsed={collapsed} setCollapsed={setCollapsed} />
              <MobileNavs>{children}</MobileNavs>
              <input
                type="file"
                className="hidden"
                ref={fileInput}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  handleFileChange(e, files, setFiles);
                }}
                accept="image/*"
                multiple
              />
            </InputContext>
          </ModalContext>
        </motion.main>
      )}
    </>
  );
};

export default Layout;
