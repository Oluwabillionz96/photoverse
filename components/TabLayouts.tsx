"use client";

import { Button } from "./ui/button";
import { MdOutlinePhotoSizeSelectActual } from "react-icons/md";
import { FaFolder, FaPlus } from "react-icons/fa";
import { useParams, usePathname, useRouter } from "next/navigation";
import useModalContext from "@/hooks/useModalContext";
import useInputContext from "@/hooks/useInputContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { IoSettingsSharp } from "react-icons/io5";
import { Loading } from "./loaders/Loading";
import useLogout from "@/hooks/useLogout";
import { motion } from "framer-motion";
import useScreenSize from "@/hooks/useScreenSize";

const TabLayouts = ({ collapsed }: { collapsed: boolean }) => {
  const pathname = usePathname();
  const params = useParams();
  const router = useRouter();
  const { ref, openFileDialog } = useInputContext();
  const { modalStatus, changeModalStatus: setModalStatus } = useModalContext();
  const { logout } = useLogout();
  const isMobile = useScreenSize();

  return (
    <>
      {false ? (
        <Loading />
      ) : (
        <div
          className={`md:flex justify-between items-center px-6 py-4 hidden glass border-b border-border/30 fixed top-20 z-40 transition-all duration-500 ${
            isMobile
              ? "left-0 right-0"
              : collapsed
                ? "left-20 right-0"
                : "md:left-56 lg:left-64 right-0"
          }`}
        >
          {/* View Toggle */}
          <div className="flex gap-2 p-1 glass rounded-xl border border-border/30">
            <motion.button
              className={`px-6 py-2.5 rounded-lg flex items-center gap-2 font-semibold text-sm transition-all relative ${
                pathname.startsWith(`/photos`)
                  ? "text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              onClick={() => router.push("/photos")}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {pathname.startsWith(`/photos`) && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-lg"
                  transition={{ type: "spring", duration: 0.5 }}
                />
              )}
              <MdOutlinePhotoSizeSelectActual className="w-4 h-4 relative z-10" />
              <span className="relative z-10">Photos</span>
            </motion.button>

            <motion.button
              className={`px-6 py-2.5 rounded-lg flex items-center gap-2 font-semibold text-sm transition-all relative ${
                pathname.startsWith(`/folders`)
                  ? "text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              onClick={() => router.push("/folders")}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {pathname.startsWith(`/folders`) && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-linear-to-r from-primary to-accent rounded-lg"
                  transition={{ type: "spring", duration: 0.5 }}
                />
              )}
              <FaFolder className="w-4 h-4 relative z-10" />
              <span className="relative z-10">Folders</span>
            </motion.button>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                disabled={modalStatus === "foldername"}
                className="h-10 px-6 glass border-border/30 hover:border-primary/50 hover:bg-primary/10 hover:text-primary transition-all disabled:cursor-not-allowed font-semibold"
                onClick={() => {
                  if (params.folderName || pathname === "/photos") {
                    openFileDialog(ref);
                    return;
                  }
                  setModalStatus("foldername");
                }}
              >
                <FaPlus className="w-4 h-4 mr-2" />
                {pathname === "/folders"
                  ? "Create Folder"
                  : params.folderName || pathname === "/photos"
                    ? "Add Photo"
                    : ""}
              </Button>
            </motion.div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="outline"
                    className="h-10 px-6 glass border-border/30 hover:border-primary/50 hover:bg-primary/10 hover:text-primary transition-all font-semibold"
                  >
                    <IoSettingsSharp className="w-4 h-4 mr-2" />
                    Settings
                  </Button>
                </motion.div>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="glass border-border/30"
                align="end"
              >
                <DropdownMenuItem
                  onClick={logout}
                  className="cursor-pointer hover:bg-primary/10 hover:text-primary"
                >
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      )}
    </>
  );
};

export default TabLayouts;
