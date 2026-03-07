import { Trash2, Heart, Download } from "lucide-react";
import { FaHeart } from "react-icons/fa";
import { motion } from "framer-motion";
import { Photo } from "@/lib/apiTypes";

interface DefaultMobileActionsProps {
  photo: Photo;
  isLoading: boolean;
  onToggleFavorite: () => void;
  onTrash: () => Promise<void>;
}

export default function DefaultMobileActions({
  photo,
  isLoading,
  onToggleFavorite,
  onTrash,
}: DefaultMobileActionsProps) {
  return (
    <div className="absolute bottom-28 z-20 flex justify-center items-center w-full px-4 md:hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex items-center gap-4 px-6 py-3 rounded-2xl bg-black/50 backdrop-blur-md border border-white/20"
      >
        {/* Favorite Button */}
        <motion.button
          onClick={onToggleFavorite}
          disabled={isLoading}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`p-3 rounded-xl border transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed ${
            photo.isFavourite
              ? "bg-pink-500/20 border-pink-500/50 text-pink-500"
              : "bg-black/40 border-white/20 text-white hover:bg-white/10"
          }`}
          title={
            photo.isFavourite ? "Remove from favorites" : "Add to favorites"
          }
        >
          {photo.isFavourite ? (
            <FaHeart className="w-5 h-5" />
          ) : (
            <Heart className="w-5 h-5" />
          )}
        </motion.button>

        {/* Download Button */}
        <motion.a
          href={photo.link?.replace("/upload/", "/upload/fl_attachment/") || ""}
          download
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-3 rounded-xl bg-black/40 border border-white/20 hover:bg-white/10 flex items-center justify-center text-white transition-all"
          title="Download"
        >
          <Download className="w-5 h-5" />
        </motion.a>

        {/* Trash Button */}
        <motion.button
          onClick={onTrash}
          disabled={isLoading}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-3 rounded-xl bg-black/40 border border-white/20 hover:bg-red-500/40 hover:border-red-500/50 flex items-center justify-center transition-all disabled:opacity-50 disabled:cursor-not-allowed text-white"
          title="Move to trash"
        >
          <Trash2 className="w-5 h-5" />
        </motion.button>
      </motion.div>
    </div>
  );
}
