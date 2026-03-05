"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Trash2, X, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * ConfirmMoveToTrashModal - A confirmation dialog for moving photos to trash
 *
 * Usage with useImageHandler hook:
 *
 * const {
 *   mutations: { requestMoveToTrash, confirmMoveToTrash, cancelMoveToTrash },
 *   showConfirmModal,
 *   pendingTrashPhotos,
 * } = useImageHandler();
 *
 * // Trigger the confirmation modal
 * <button onClick={() => requestMoveToTrash([photoId])}>Move to Trash</button>
 *
 * // Render the modal
 * <ConfirmMoveToTrashModal
 *   isOpen={showConfirmModal}
 *   onClose={cancelMoveToTrash}
 *   onConfirm={confirmMoveToTrash}
 *   photoCount={pendingTrashPhotos.length}
 * />
 */

interface ConfirmMoveToTrashModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  photoCount: number;
  isLoading?: boolean;
}

export default function ConfirmMoveToTrashModal({
  isOpen,
  onClose,
  onConfirm,
  photoCount,
  isLoading = false,
}: ConfirmMoveToTrashModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="sm:max-w-md glass border-border/30 backdrop-blur-xl overflow-hidden p-0"
        onPointerDownOutside={(e) => e.preventDefault()}
        onInteractOutside={(e) => e.preventDefault()}
      >
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-linear-to-br from-red-500/5 via-transparent to-orange-500/5 pointer-events-none" />

        <div className="relative p-6">
          <DialogHeader>
            <div className="flex flex-col items-center text-center gap-4 mb-2">
              {/* Animated icon */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                  delay: 0.1,
                }}
                className="relative"
              >
                <div className="absolute inset-0 bg-red-500/20 rounded-2xl blur-xl" />
                <div className="relative w-16 h-16 rounded-2xl bg-linear-to-br from-red-500/30 to-orange-500/30 flex items-center justify-center border border-red-500/30">
                  <motion.div
                    animate={{
                      rotate: [0, -10, 10, -10, 0],
                    }}
                    transition={{
                      duration: 0.5,
                      delay: 0.3,
                      ease: "easeInOut",
                    }}
                  >
                    <Trash2 className="w-8 h-8 text-red-500" />
                  </motion.div>
                </div>
              </motion.div>

              <div className="space-y-2">
                <DialogTitle className="text-2xl font-bold">
                  Move to Trash?
                </DialogTitle>
                <DialogDescription className="text-base text-muted-foreground">
                  You&apos;re about to move{" "}
                  <span className="font-semibold text-foreground">
                    {photoCount} {photoCount === 1 ? "photo" : "photos"}
                  </span>{" "}
                  to trash.
                </DialogDescription>
              </div>

              {/* Info badge */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500/10 border border-blue-500/20"
              >
                <AlertTriangle className="w-4 h-4 text-blue-500" />
                <span className="text-sm text-blue-500">
                  You can restore {photoCount === 1 ? "it" : "them"} later
                </span>
              </motion.div>
            </div>
          </DialogHeader>

          {/* Custom buttons */}
          <div className="flex gap-3 mt-6">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              disabled={isLoading}
              className="flex-1 px-6 py-3 rounded-xl font-semibold text-foreground bg-secondary/50 hover:bg-secondary border border-border/50 hover:border-border transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <X className="w-4 h-4" />
              Cancel
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={(e) => {
                e.stopPropagation();
                onConfirm();
                onClose();
              }}
              disabled={isLoading}
              className="flex-1 px-6 py-3 rounded-xl font-semibold text-white bg-linear-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 shadow-lg shadow-red-500/25 hover:shadow-red-500/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 relative overflow-hidden group"
            >
              <AnimatePresence mode="wait">
                {isLoading ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2"
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </motion.div>
                    Moving...
                  </motion.div>
                ) : (
                  <motion.div
                    key="idle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Move to Trash
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Shine effect */}
              <motion.div
                className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.5 }}
              />
            </motion.button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
