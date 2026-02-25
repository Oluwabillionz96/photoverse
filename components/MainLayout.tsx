"use client";
import Link from "next/link";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import SideNav from "./SideNav";
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
import Logo from "./Logo";
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
                pathname.startsWith("/trash") ||
                pathname.startsWith("/favourites")
                  ? "md:pt-28 pt-20"
                  : "pt-20 md:pt-40"
              } ${files.length < 1 ? "mb-24" : "mb-0"} md:mb-0 ${
                isMobile ? "ml-0" : collapsed ? "md:ml-20" : "md:ml-56 lg:ml-64"
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
                  <header className="bg-[#18181b] border-b border-border fixed top-0 left-0 right-0 z-50">
                    <div className="flex justify-between items-center px-6 py-4">
                      {/* Left: Logo & Brand */}
                      <Link href="/" className="flex items-center gap-3">
                        <Logo className="text-white" size="md" />
                        <div className="hidden sm:block">
                          <span className="text-xl font-bold block">
                            Photoverse
                          </span>
                        </div>
                      </Link>

                      {/* Right: Mobile Logout */}
                      <div className="md:hidden">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="icon">
                              <FaUser className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={logout}
                              className="cursor-pointer"
                            >
                              Log out
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </header>
                  <SideNav collapsed={collapsed} setCollapsed={setCollapsed} />
                  <MobileNavs collapsed={collapsed}>{children}</MobileNavs>
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
