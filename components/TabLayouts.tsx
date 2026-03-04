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
import { AnimatePresence, motion } from "framer-motion";
import useScreenSize from "@/hooks/useScreenSize";
import { useDispatch, useSelector } from "react-redux";
import { Rootstate } from "@/lib/store";
import { Trash2 } from "lucide-react";
import useImageHandler from "@/hooks/useImageHandler";
import { removeSelectedPhoto } from "@/lib/slices/photoSlice";

const TabLayouts = ({ collapsed }: { collapsed: boolean }) => {
  const pathname = usePathname();
  const params = useParams();
  const router = useRouter();
  const { ref, openFileDialog } = useInputContext();
  const { modalStatus, changeModalStatus: setModalStatus } = useModalContext();
  const { logout } = useLogout();
  const isMobile = useScreenSize();
  const { selectedPhotoIds } = useSelector((state: Rootstate) => state.photo);
  const isSelected = selectedPhotoIds.length > 0;
  const {
    mutations: { movePhotoTotrash },
  } = useImageHandler();
  const dispatch = useDispatch();
  return (
    <>
      {false ? (
        <Loading />
      ) : (
        <div
          className={`md:flex justify-between items-center px-6 py-4 hidden bg-background border-b border-border fixed top-16 z-40 transition-all duration-500 ${
            isMobile
              ? "left-0 right-0"
              : collapsed
                ? "left-20 right-0"
                : "md:left-56 lg:left-64 right-0"
          }`}
        >
          {/* View Toggle */}
          <div className="flex gap-2 p-1 bg-secondary rounded-xl border border-border">
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
                  className="absolute inset-0 bg-primary rounded-lg"
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
                  className="absolute inset-0 bg-primary rounded-lg"
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
                variant={"outline"}
                disabled={modalStatus === "foldername"}
                className={`h-10 px-6 border-border hover:border-primary hover:bg-primary/10 hover:text-primary transition-all disabled:cursor-not-allowed font-semibold`}
                onClick={() => {
                  if (isSelected) {
                    movePhotoTotrash(selectedPhotoIds);
                    dispatch(removeSelectedPhoto(selectedPhotoIds));
                    return;
                  }

                  if (params.folderName || pathname === "/photos") {
                    openFileDialog(ref);
                    return;
                  }
                  setModalStatus("foldername");
                }}
              >
                {isSelected ? <Trash2 /> : <FaPlus className="w-4 h-4 mr-2" />}
                {isSelected
                  ? "Move to Trash"
                  : pathname === "/folders"
                    ? "Create Folder"
                    : params.folderName || pathname === "/photos"
                      ? "Add Photo"
                      : ""}
              </Button>
            </motion.div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <AnimatePresence mode="wait">
                  {!isSelected ? (
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      animate={{ opacity: 1 }}
                      initial={{ opacity: 0 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                    >
                      <Button
                        variant="outline"
                        className="h-10 px-6 border-border hover:border-primary hover:bg-primary/10 hover:text-primary transition-all font-semibold"
                      >
                        <IoSettingsSharp className="w-4 h-4 mr-2" />
                        Settings
                      </Button>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="bg-popover border-border"
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
