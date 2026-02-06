"use client";
import Image from "next/image";
import Link from "next/link";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import SideNav from "./SideNav";
import { motion } from "framer-motion";
import useScreenSize from "@/hooks/useScreenSize";
import { useDispatch, useSelector } from "react-redux";
import { Rootstate } from "@/lib/store";
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
import { FaUser } from "react-icons/fa";
import { usePathname, useRouter } from "next/navigation";
import { Loading } from "./loaders/Loading";
import useLogout from "@/hooks/useLogout";
import { authApi } from "@/services/auth";
import { updateLoading, updateUser } from "@/lib/slices/authSlice";
import { getCsrfToken } from "@/lib/utils";
// import MobileDebugPanel from "./mobile-debuggin-panel";

export interface DebugLog {
  timestamp: string;
  message: string;
  type: "info" | "success" | "error" | "warning";
}

const Layout = ({ children }: { children: React.ReactNode }) => {
  const isCollapsed =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("collapsed") || "true")
      : true;
  const { logout } = useLogout();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    setCollapsed(isCollapsed);
  }, [isCollapsed]);
  const { loading, user } = useSelector((state: Rootstate) => state.auth);
  const pathname = usePathname();
  // const [logs, setLogs] = useState<DebugLog[]>([]);
  // const addLog = (message: string, type: DebugLog["type"] = "info") => {
  //   const timestamp = new Date().toLocaleTimeString();
  //   setLogs((prev) => [...prev, { timestamp, message, type }].slice(-100)); // Keep last 10 logs
  // };
  const initialize = async () => {
    // IMPORTANT: Skip initialize if user is already authenticated
    if (user.isAuthenticated) {
      return;
    }

    if (pathname.startsWith("/auth") || pathname.startsWith("/api")) {
      return;
    }

    // Check if we have a CSRF token (indicates previous authentication)
    const csrfToken = getCsrfToken();

    if (!csrfToken && pathname !== "/") {
      router.push("/auth/login");
      return;
    }

    try {
      dispatch(updateLoading(true));

      const response = await authApi.getUser();

      if (response.isAuthenticated) {
        dispatch(
          updateUser({
            email: response.email,
            isAuthenticated: response.isAuthenticated,
          }),
        );
      } else if (pathname !== "/") {
        router.push("/auth/login");
      }
    } catch (error) {
      console.log(error);

      if (pathname === "/") {
        return;
      }

      router.push("/auth/login");
      return;
    } finally {
      dispatch(updateLoading(false));
    }
  };

  useEffect(() => {
    initialize();
  }, []);

  const isMobile = useScreenSize();

  const fileInput = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [modalStatus, setModalStatus] = useState<
    "" | "preview" | "select" | "foldername"
  >("");

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          {pathname === "/" || pathname.startsWith("/auth") ? (
            <>{children}</>
          ) : (
            <main
              className={`relative transition-all duration-500 ease-in-out ${
                files.length < 1 ? "mb-24" : "mb-0"
              } md:mb-0 ${
                isMobile
                  ? "ml-0"
                  : collapsed
                    ? "md:ml-[5rem]"
                    : "md:ml-[9rem] lg:ml-[17.5rem]"
              }`}
            >
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
                          <DropdownMenuItem onClick={logout}>
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
            </main>
          )}

          {/* {typeof window !== "undefined" &&
            /mobile/i.test(navigator.userAgent) && (
              <MobileDebugPanel addLog={addLog} logs={logs} />
            )} */}
        </>
      )}
    </>
  );
};

export default Layout;
