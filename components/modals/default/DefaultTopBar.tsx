import { X, ArrowLeft, Trash2 } from "lucide-react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { GrDownload } from "react-icons/gr";
import { motion } from "framer-motion";
import { Photo } from "@/lib/apiTypes";
import { usePathname } from "next/navigation";

interface DefaultTopBarProps {
  photo: Photo;
  isLoading: boolean;
  onClose: () => void;
  onToggleFavorite: () => void;
  onTrash: () => Promise<void>;
}

export default function DefaultTopBar({
  photo,
  isLoading,
  onClose,
  onToggleFavorite,
  onTrash,
}: DefaultTopBarProps) {
  const pathname = usePathname();

  return (
    <div className="absolute top-4 z-20 flex justify-between items-center w-full px-4">
      <motion.button
        onClick={onClose}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="p-2 bg-black/50 backdrop-blur-md border border-white/10 hover:bg-black/70 text-white rounded-full transition-colors focus:outline-none"
      >
        <div className="lg:hidden">
          <ArrowLeft className="w-8 h-8" />
        </div>
        <div className="hidden lg:block">
          <X className="w-8 h-8" />
        </div>
      </motion.button>

      {/* Action Buttons */}
      <div className="hidden md:flex items-center gap-2">
        {/* Download Button */}
        <motion.a
          href={photo.link?.replace("/upload/", "/upload/fl_attachment/") || ""}
          download
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/20 hover:bg-white/10 flex items-center justify-center transition-all"
          title="Download"
        >
          <GrDownload className="w-5 h-5 text-white" />
        </motion.a>

        {/* Favorite Button */}
        <motion.button
          onClick={onToggleFavorite}
          disabled={isLoading}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed ${
            photo.isFavourite
              ? "border-pink-500/50 hover:bg-pink-500/40"
              : "border-white/20 hover:bg-white/10"
          }`}
          title={
            photo.isFavourite ? "Remove from favorites" : "Add to favorites"
          }
        >
          {photo.isFavourite ? (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 15 }}
            >
              <FaHeart className="w-5 h-5 text-pink-500" />
            </motion.div>
          ) : (
            <FaRegHeart className="w-5 h-5 text-white" />
          )}
        </motion.button>

        {/* Trash Button */}
        {!pathname.startsWith("/trash") && (
          <motion.button
            onClick={onTrash}
            disabled={isLoading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/20 hover:bg-red-500/40 hover:border-red-500/50 flex items-center justify-center transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            title="Move to trash"
          >
            <Trash2 className="w-5 h-5 text-white" />
          </motion.button>
        )}
      </div>
    </div>
  );
}
