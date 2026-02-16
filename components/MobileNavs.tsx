"use client";
import useInputContext from "@/hooks/useInputContext";
import useModalContext from "@/hooks/useModalContext";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import { FaFolder, FaPlus, FaRegHeart, FaTrashAlt } from "react-icons/fa";
import { MdOutlinePhotoSizeSelectActual } from "react-icons/md";
import { motion } from "framer-motion";

import TabLayouts from "./TabLayouts";

const MobileNavs = ({
  children,
  collapsed,
}: Readonly<{ children: React.ReactNode; collapsed: boolean }>) => {
  const pathName = usePathname();
  const params = useParams();
  const { changeModalStatus: setModalStatus } = useModalContext();
  const router = useRouter();
  const { ref, openFileDialog, files } = useInputContext();

  return (
    <>
      {/* Top Quick Actions */}
      {(pathName.startsWith("/folders") || pathName.startsWith("/photos")) && (
        <nav className="flex justify-between gap-2 px-4 mb-4 md:hidden">
          <Link href="/favourites" className="flex-1">
            <motion.button
              className="w-full h-11 glass border border-border/30 rounded-xl flex items-center justify-center gap-2 font-semibold text-sm hover:border-primary/50 transition-all"
              whileTap={{ scale: 0.95 }}
            >
              <FaRegHeart className="text-primary w-4 h-4" />
              Favourites
            </motion.button>
          </Link>

          <Link href="/trash" className="flex-1">
            <motion.button
              className="w-full h-11 glass border border-border/30 rounded-xl flex items-center justify-center gap-2 font-semibold text-sm hover:border-primary/50 transition-all"
              whileTap={{ scale: 0.95 }}
            >
              <FaTrashAlt className="text-primary w-4 h-4" />
              Trash
            </motion.button>
          </Link>
        </nav>
      )}

      {(pathName.startsWith("/folders") || pathName.startsWith("/photos")) && (
        <TabLayouts collapsed={collapsed} />
      )}

      {children}

      {/* Bottom Navigation Bar */}
      {(pathName.startsWith("/folders") ||
        pathName.startsWith("/photos") ||
        pathName.startsWith("/trash") ||
        pathName.startsWith("/favourites")) &&
        files.length < 1 && (
          <motion.nav
            className="fixed bottom-0 left-0 right-0 glass border-t border-border/30 flex justify-around items-center px-6 py-4 md:hidden z-50"
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <motion.button
              className={`flex flex-col items-center gap-1 transition-all ${
                pathName.startsWith("/photos")
                  ? "text-primary scale-110"
                  : "text-muted-foreground"
              }`}
              onClick={() => router.push("/photos")}
              whileTap={{ scale: 0.9 }}
            >
              <MdOutlinePhotoSizeSelectActual className="w-6 h-6" />
              <span className="text-xs font-semibold">Photos</span>
            </motion.button>

            {/* Only show create button on folders/photos pages */}
            {(pathName.startsWith("/folders") ||
              pathName.startsWith("/photos")) && (
              <motion.button
                className="relative -mt-6"
                onClick={() => {
                  if (pathName === "/folders") {
                    setModalStatus("foldername");
                  } else if (pathName === "/photos") {
                    openFileDialog(ref);
                  } else if (params.folderName) {
                    openFileDialog(ref);
                  }
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <div className="w-14 h-14 rounded-full bg-linear-to-r from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/50">
                  <FaPlus className="w-6 h-6 text-primary-foreground" />
                </div>
              </motion.button>
            )}

            <motion.button
              className={`flex flex-col items-center gap-1 transition-all ${
                pathName.startsWith("/folders")
                  ? "text-primary scale-110"
                  : "text-muted-foreground"
              }`}
              onClick={() => router.push("/folders")}
              whileTap={{ scale: 0.9 }}
            >
              <FaFolder className="w-6 h-6" />
              <span className="text-xs font-semibold">Folders</span>
            </motion.button>
          </motion.nav>
        )}
    </>
  );
};

export default MobileNavs;
