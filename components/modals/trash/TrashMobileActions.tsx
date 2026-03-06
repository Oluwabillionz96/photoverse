import { RotateCcw, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { Photo } from "@/lib/apiTypes";

interface TrashMobileActionsProps {
  photo: Photo;
  isLoading: boolean;
  onRestore: () => Promise<void>;
  onDelete: () => Promise<void>;
}

export default function TrashMobileActions({
  photo,
  isLoading,
  onRestore,
  onDelete,
}: TrashMobileActionsProps) {
  return (
    <div className="absolute bottom-28 z-20 flex justify-center items-center w-full px-4 md:hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex items-center gap-4 px-6 py-3 rounded-2xl bg-black/50 backdrop-blur-md border border-white/20"
      >
        {/* Restore Button */}
        <motion.button
          onClick={onRestore}
          disabled={isLoading}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-black/40 hover:bg-emerald-500/40 border border-white/20 hover:border-emerald-500/50 text-white font-semibold text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <RotateCcw className="w-4 h-4" />
          Restore
        </motion.button>

        {/* Separator */}
        <div className="w-px h-8 bg-white/20" />

        {/* Delete Permanently Button */}
        <motion.button
          onClick={onDelete}
          disabled={isLoading}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-black/40 hover:bg-red-500/40 border border-white/20 hover:border-red-500/50 text-white font-semibold text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Trash2 className="w-4 h-4" />
          Delete
        </motion.button>
      </motion.div>
    </div>
  );
}
