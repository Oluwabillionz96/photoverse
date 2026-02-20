import { motion, AnimatePresence } from "framer-motion";
import { Upload } from "lucide-react";

const DragAndDropOverlay = ({
  isDragging,
  isPreview,
}: {
  isDragging: boolean;
  isPreview?: boolean;
}) => {
  return (
    <AnimatePresence>
      {isDragging && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-60 flex items-center justify-center bg-background/80 backdrop-blur-md pointer-events-none"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="glass border-2 border-dashed border-primary/50 rounded-3xl p-12 flex flex-col items-center gap-4"
          >
            <div className="w-24 h-24 rounded-full bg-linear-to-br from-primary/20 to-accent/20 flex items-center justify-center">
              <Upload className="w-12 h-12 text-primary" />
            </div>
            {!isPreview && (
              <h3 className="text-2xl font-bold text-foreground">
                Drop your photos here
              </h3>
            )}

            <p
              className={
                isPreview
                  ? "text-lg font-semibold text-foreground"
                  : "text-muted-foreground"
              }
            >
              {isPreview
                ? "Drop to add more photos"
                : "Release to add photos to your collection"}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DragAndDropOverlay;
