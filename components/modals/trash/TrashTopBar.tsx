import { X, ArrowLeft, RotateCcw, Trash2, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { Photo } from "@/lib/apiTypes";

interface TrashTopBarProps {
  photo: Photo;
  timeLeft: string;
  isLoading: boolean;
  onClose: () => void;
  onRestore: () => Promise<void>;
  onDelete: () => Promise<void>;
}

export default function TrashTopBar({
  photo,
  timeLeft,
  isLoading,
  onClose,
  onRestore,
  onDelete,
}: TrashTopBarProps) {
  return (
    <div className="absolute top-4 z-20 flex justify-between items-center w-full px-4">
      {/* Close button */}
      <motion.button
        onClick={onClose}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="p-2 bg-black/50 backdrop-blur-md border border-white/10 hover:bg-black/70 text-white rounded-full transition-colors focus:outline-none"
      >
        <div className="lg:hidden">
          <ArrowLeft className="w-7 h-7" />
        </div>
        <div className="hidden lg:block">
          <X className="w-7 h-7" />
        </div>
      </motion.button>

      {/* Time left badge */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/50 backdrop-blur-md border border-white/20"
      >
        <Clock className="w-4 h-4 text-orange-400" />
        <span className="text-sm font-semibold text-white">{timeLeft}</span>
      </motion.div>

      {/* Desktop Action Buttons */}
      <div className="hidden md:flex items-center gap-2">
        <motion.button
          onClick={onRestore}
          disabled={isLoading}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/20 hover:bg-emerald-500/40 hover:border-emerald-500/50 flex items-center justify-center transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          title="Restore"
        >
          <RotateCcw className="w-5 h-5 text-white" />
        </motion.button>

        <motion.button
          onClick={onDelete}
          disabled={isLoading}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/20 hover:bg-red-500/40 hover:border-red-500/50 flex items-center justify-center transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          title="Delete Permanently"
        >
          <Trash2 className="w-5 h-5 text-white" />
        </motion.button>
      </div>

      {/* Placeholder for spacing on mobile */}
      <div className="w-11 md:hidden" />
    </div>
  );
}
