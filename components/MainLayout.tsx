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
import MobileDebugPanel from "./mobile-debuggin-panel";
// import { AxiosError } from "axios";
// import toast from "react-hot-toast";
// import toast from "react-hot-toast";

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
  const [logs, setLogs] = useState<DebugLog[]>([]);
  const addLog = (message: string, type: DebugLog["type"] = "info") => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs((prev) => [...prev, { timestamp, message, type }].slice(-10)); // Keep last 10 logs
  };
  const initialize = async () => {
    addLog("🔍 [Initialize] Starting...");
    addLog(`🔍 [Initialize] user.isAuthenticated: ${user.isAuthenticated}`);
    addLog(`🔍 [Initialize] pathname: ${pathname}`);

    // IMPORTANT: Skip initialize if user is already authenticated
    if (user.isAuthenticated) {
      addLog("🔍 [Initialize] User already authenticated in store - skipping");
      return;
    }

    if (pathname.startsWith("/auth") || pathname.startsWith("/api")) {
      addLog("🔍 [Initialize] On auth/api page - skipping");
      return;
    }

    // Check if we have a CSRF token (indicates previous authentication)
    const csrfToken = localStorage.getItem("csrfToken");
    addLog(`🔍 [Initialize] CSRF token exists: ${csrfToken}`);

    if (!csrfToken && pathname !== "/") {
      addLog("🔍 [Initialize] No CSRF token - redirecting to mainlayout-cause");
      router.push("/auth/mainlayout-cause?reason=no-csrf");
      return;
    }

    try {
      dispatch(updateLoading(true));
      addLog("🔍 [Initialize] Calling authApi.getUser()...");

      const response = await authApi.getUser();
      addLog(
        `🔍 [Initialize] Response received:
        ${JSON.stringify(response)}`,
      );
      addLog(
        `🔍 [Initialize] response.isAuthenticated:",
        ${response.isAuthenticated}`,
      );

      if (response.isAuthenticated) {
        addLog("🔍 [Initialize] User IS authenticated - updating store");
        dispatch(
          updateUser({
            email: response.email,
            isAuthenticated: response.isAuthenticated,
          }),
        );
      } else if (pathname !== "/") {
        addLog(
          "🔍 [Initialize] User NOT authenticated - redirecting to mainlayout-cause",
        );
        router.push("/auth/mainlayout-cause?reason=not-authenticated");
      }
    } catch (error) {
      // addLog(`🔍 [Initialize] ERROR caught: ${error}`);
      addLog(
        `🔍 [Initialize] Error details:",
        ${JSON.stringify(error, null, 2)}`,
      );

      if (pathname === "/") {
        addLog("🔍 [Initialize] On home page - not redirecting");
        return;
      }

      addLog(
        "🔍 [Initialize] Error on protected route - redirecting to mainlayout-cause",
      );
      router.push("/auth/mainlayout-cause?reason=error");
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

          {typeof window !== "undefined" &&
            /mobile/i.test(navigator.userAgent) && (
              <MobileDebugPanel addLog={addLog} logs={logs} />
            )}
        </>
      )}
    </>
  );
};

export default Layout;
