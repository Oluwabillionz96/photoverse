// import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ProgressTracker = ({
  progress,
  handleDone,
  isLoading,
  isError,
}: {
  progress: number;
  handleDone: () => void;
  isLoading: boolean;
  isError: boolean;
}) => {
  //   const [uploadedPhotos, setUploadedPhotos] = useState(0);
  const isComplete = progress === 100;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full left-0 right-0 px-2 md:px-0 glass backdrop-blur-xl bottom-0 flex justify-center items-center fixed top-0"
    >
      <div className="glass border border-border/30 w-full max-w-sm rounded-2xl shadow-2xl p-6">
        {/* Icon and Header */}
        <div className="flex items-center gap-4 mb-6">
          <motion.div
            animate={
              !isComplete
                ? {
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0],
                  }
                : {}
            }
            transition={{
              repeat: isComplete ? 0 : Infinity,
              duration: 2,
              ease: "easeInOut",
            }}
            className={`shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-lg ${
              isError
                ? "bg-linear-to-br from-red-500/20 to-red-600/20 border border-red-500/30"
                : "bg-linear-to-br from-primary/20 to-accent/20 border border-primary/30"
            }`}
          >
            {isError ? "❌" : isComplete ? "✓" : "📸"}
          </motion.div>

          <div className="flex-1 min-w-0">
            <h2
              className={`text-lg font-bold mb-1 ${
                isError
                  ? "text-red-400"
                  : "bg-linear-to-r from-primary to-accent bg-clip-text text-transparent"
              }`}
            >
              {isError ? "Upload Failed" : "Uploading Photos"}
            </h2>
          </div>
        </div>

        {/* Progress Bar */}
        {!isError && (
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-medium text-muted-foreground">
                Progress
              </span>
              <motion.span
                key={progress}
                initial={{ scale: 1.3, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="text-sm font-bold bg-linear-to-r from-primary to-accent bg-clip-text text-transparent"
              >
                {progress}%
              </motion.span>
            </div>

            <div className="relative h-2 glass rounded-full overflow-hidden border border-border/30">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="absolute top-0 left-0 h-full bg-linear-to-r from-primary to-accent rounded-full shadow-lg shadow-primary/50"
              />
              <motion.div
                animate={{
                  x: ["-100%", "100%"],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                  ease: "linear",
                }}
                className="absolute top-0 left-0 h-full w-1/3 bg-linear-to-r from-transparent via-white/40 to-transparent"
              />
            </div>
          </div>
        )}

        {/* Status Message */}
        <AnimatePresence mode="wait">
          {!isComplete && !isError ? (
            <motion.div
              key="uploading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center gap-2 py-3 px-4 glass border border-border/30 rounded-lg mb-4"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  repeat: Infinity,
                  duration: 1,
                  ease: "linear",
                }}
                className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full"
              />
              <span className="text-sm text-foreground font-medium">
                Uploading...
              </span>
            </motion.div>
          ) : isLoading ? (
            <motion.div
              key="uploading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center gap-4 py-3 px-4 glass border border-border/30 rounded-lg mb-4"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  repeat: Infinity,
                  duration: 1,
                  ease: "linear",
                }}
                className="w-8 aspect-square border-2 border-primary rounded-full border-t-transparent"
              />
              <span className="text-xs text-muted-foreground font-medium">
                Your files are being processed. This may take a moment.
              </span>
            </motion.div>
          ) : isError ? (
            <motion.div
              key="complete"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="py-3 px-4 glass border border-red-500/30 rounded-lg mb-4 text-center"
            >
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                }}
                className="text-2xl mb-1"
              >
                💀
              </motion.div>
              <p className="text-sm text-red-400 font-semibold">
                Upload Failed: An Error Occured
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="complete"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="py-3 px-4 glass border border-primary/30 rounded-lg mb-4 text-center"
            >
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                }}
                className="text-2xl mb-1"
              >
                🎉
              </motion.div>
              <p className="text-sm bg-linear-to-r from-primary to-accent bg-clip-text text-transparent font-semibold">
                Upload complete!
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Reset Button */}
        {!isLoading && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleDone}
            className={`w-full py-2.5 px-4 rounded-lg font-semibold transition-all duration-200 text-sm shadow-lg ${
              isError
                ? "bg-linear-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-red-500/50"
                : "bg-linear-to-r from-primary to-accent hover:opacity-90 text-primary-foreground shadow-primary/50"
            }`}
          >
            {isError ? "Back" : " Done"}
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

export default ProgressTracker;
