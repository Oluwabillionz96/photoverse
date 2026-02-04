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

  //   useEffect(() => {
  //     if (isComplete) return;

  //     const progressInterval = setInterval(() => {
  //       setProgress((prev) => {
  //         const newProgress = prev + 1;

  //         // const photosUploaded = Math.floor((newProgress / 100) * totalPhotos);
  //         // setUploadedPhotos(photosUploaded);

  //         if (newProgress >= 100) {
  //           setIsComplete(true);
  //           clearInterval(progressInterval);
  //           return 100;
  //         }

  //         return newProgress;
  //       });
  //     }, 60);

  //     return () => clearInterval(progressInterval);
  //   }, [isComplete, totalPhotos]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full left-0 right-0 px-2 md:px-0 bg-black/50 backdrop-blur-md bottom-0 flex justify-center items-center fixed top-0"
    >
      <div className="bg-white w-full max-w-sm rounded-2xl shadow-xl border border-gray-200 p-6">
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
            className={`flex-shrink-0 w-12 h-12 bg-gradient-to-br ${isError ? "from-red-50 to-red-100" : "from-green-50 to-green-100 "} rounded-xl flex items-center justify-center text-2xl shadow-sm`}
          >
            {isError ? "❌" : isComplete ? "✓" : "📸"}
          </motion.div>

          <div className="flex-1 min-w-0">
            <h2
              className={`text-lg font-bold ${isError ? "text-red-700" : "text-green-700"} mb-1`}
            >
              {isError ? "Upload Failed" : "Uploading Photos"}
            </h2>
            {/* <motion.p
              key={uploadedPhotos}
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-gray-600"
            >
              {isComplete
                ? `${totalPhotos} photos uploaded`
                : `${uploadedPhotos} of ${totalPhotos} photos`}
            </motion.p> */}
          </div>
        </div>

        {/* Progress Bar */}
        {!isError && (
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-medium text-gray-500">
                Progress
              </span>
              <motion.span
                key={progress}
                initial={{ scale: 1.3, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="text-sm font-bold text-green-700"
              >
                {progress}%
              </motion.span>
            </div>

            <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-green-500 via-green-600 to-green-700 rounded-full"
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
                className="absolute top-0 left-0 h-full w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent"
              />
            </div>
          </div>
        )}

        {/* Status Message */}
        <AnimatePresence mode="wait">
          {!isComplete ? (
            <motion.div
              key="uploading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center gap-2 py-3 px-4 bg-gray-50 rounded-lg mb-4"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  repeat: Infinity,
                  duration: 1,
                  ease: "linear",
                }}
                className="w-4 h-4 border-2 border-green-500 border-t-transparent rounded-full"
              />
              <span className="text-sm text-gray-600 font-medium">
                Uploading...
              </span>
            </motion.div>
          ) : isLoading ? (
            <motion.div
              key="uploading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center gap-4 py-3 px-4 bg-gray-50 rounded-lg mb-4"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  repeat: Infinity,
                  duration: 1,
                  ease: "linear",
                }}
                className="w-8 aspect-square border-2 border-green-500 rounded-full border-t-transparent"
              />
              <span className="text-xs text-gray-600 font-medium">
                Your files are being processed. This may take a moment.
              </span>
            </motion.div>
          ) : isError ? (
            <motion.div
              key="complete"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="py-3 px-4 bg-red-50 border border-red-200 rounded-lg mb-4 text-center"
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
              <p className="text-sm text-red-800 font-semibold">
                Upload Failed: An Error Occured
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="complete"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="py-3 px-4 bg-green-50 border border-green-200 rounded-lg mb-4 text-center"
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
              <p className="text-sm text-green-800 font-semibold">
                Upload complete!
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Reset Button */}
        {isComplete && !isLoading && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleDone}
            className={`w-full py-2.5 px-4 rounded-lg font-semibold ${isError ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"} text-white transition-all duration-200 text-sm shadow-sm`}
          >
            {isError ? "Back" : " Done"}
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

export default ProgressTracker;
