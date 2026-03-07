import Link from "next/link";
import { FaRegHeart, FaTrashAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { EllipsisVertical, RefreshCcw, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import useImageHandler from "@/hooks/useImageHandler";
import ShimmerSweep from "./shimmer-sweep";
import { useDispatch } from "react-redux";
import { removeSelectedPhoto } from "@/lib/slices/photoSlice";

const MobileTopNavSkeleton = () => (
  <nav className="flex justify-between gap-2 px-4 my-4 md:hidden">
    {/* Favourites button skeleton */}
    <div className="relative flex-1 h-11 rounded-xl bg-border/30 overflow-hidden">
      <ShimmerSweep via="white/20" duration={1.5} delay={0} repeatDelay={0.5} />
    </div>
    {/* Trash button skeleton */}
    <div className="relative flex-1 h-11 rounded-xl bg-border/30 overflow-hidden">
      <ShimmerSweep
        via="white/20"
        duration={1.5}
        delay={0.15}
        repeatDelay={0.5}
      />
    </div>
  </nav>
);

const MobileTopNav = () => {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const {
    loading,
    mutations: {
      movePhotoTotrash,
      toggleIsFavourite,
      restoretrashedPhoto,
      deletePhoto,
    },
    selectedPhotoIds,
  } = useImageHandler();
  const isSelected = selectedPhotoIds.length > 0;
  const isTrash = pathname.startsWith("/trash");
  if (loading) return <MobileTopNavSkeleton />;
  return (
    <>
      {!isSelected ? (
        (pathname.startsWith("/folders") || pathname.startsWith("/photos")) && (
          <nav className="flex justify-between gap-2 px-4 my-4 md:hidden">
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
        )
      ) : (
        <div className="flex justify-between items-center px-4 mb-4 md:hidden">
          <div className="flex items-center gap-2">
            <X
              className="cursor-pointer"
              onClick={() => dispatch(removeSelectedPhoto(selectedPhotoIds))}
            />
            <p>{selectedPhotoIds.length}</p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <EllipsisVertical />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                onClick={
                  isTrash
                    ? () => {
                        restoretrashedPhoto(selectedPhotoIds);
                      }
                    : () => toggleIsFavourite(selectedPhotoIds)
                }
              >
                {!isTrash ? (
                  <>
                    <FaRegHeart />
                    <p>Toggle favourites</p>
                  </>
                ) : (
                  <>
                    <RefreshCcw />
                    <p>Restore Photo</p>
                  </>
                )}
              </DropdownMenuItem>
              <DropdownMenuItem
                variant="destructive"
                onClick={
                  isTrash
                    ? () => {
                        deletePhoto(selectedPhotoIds);
                      }
                    : () => movePhotoTotrash(selectedPhotoIds)
                }
              >
                <FaTrashAlt />
                {!isTrash ? (
                  <>
                    <p>Move To Trash</p>
                  </>
                ) : (
                  <>
                    <p>Delete Photo</p>
                  </>
                )}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </>
  );
};

export default MobileTopNav;
