"use client";

import ImageGrid from "@/components/ImageGrid";
import PhotoLoader from "@/components/loaders/PhotoLoader";
import PhotosPreview, { formatFileSize } from "@/components/photosPreview";
import { Button } from "@/components/ui/button";
import useInputContext from "@/hooks/useInputContext";
import { useGetFolderPhotosQuery } from "@/services/api";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, FolderIcon, Upload } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "@/components/Logo";
import Pagination from "@/components/Pagination";
import useCurrentPage from "@/hooks/useCurrentPage";
import { useDragAndDrop } from "@/hooks/useDragAndDrop";

const Folder = () => {
  const params = useParams();
    const { currentPage, setCurrentPage } = useCurrentPage();
  const foldername = Array.isArray(params.folderName)
    ? params.folderName[0]
    : params.folderName;
  const { data, isLoading, isFetching } = useGetFolderPhotosQuery({
    foldername: foldername?.replace("%20", " ") ?? "",
    page: currentPage,
  });
  const { files, setFiles, ref } = useInputContext();
  const photos = data?.photos;
  const { push } = useRouter();
  const size = photos
    ? photos
        .map((item) => item.size)
        .reduce((initial, current) => {
          return initial + current;
        }, 0)
    : 0;

  const { isDragging, dragHandlers } = useDragAndDrop({
    onFilesDropped: (droppedFiles) => {
      setFiles((prev) => [...prev, ...droppedFiles]);
    },
    existingFiles: files,
  });



  return (
    <section className="mx-2 h-fit md:py-4" {...dragHandlers}>
      <>
        {/* Drag and Drop Overlay */}
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
                <h3 className="text-2xl font-bold text-foreground">
                  Drop your photos here
                </h3>
                <p className="text-muted-foreground">
                  Release to add photos to {foldername?.replaceAll("%20", " ")}
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {files.length < 1 && (
          <motion.div
            className="flex mb-6 items-center gap-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={() => push("/folders")}
                variant="outline"
                size="icon"
                className="glass border-border/30 hover:border-primary/50 hover:bg-primary/10"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </motion.div>

            <div className="flex items-center gap-3">
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-foreground">
                  {foldername?.replaceAll("%20", " ")}
                </h1>
                <p className="text-sm text-muted-foreground">
                  {isLoading || isFetching
                    ? "Loading..."
                    : photos &&
                      `${photos?.length} ${photos?.length === 1 ? "photo" : "photos"} • ${formatFileSize(size)}`}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {files.length > 0 ? (
          <PhotosPreview
            files={files}
            setFiles={setFiles}
            ref={ref}
            folder={foldername?.replaceAll("%20", " ") ?? ""}
          />
        ) : isLoading || isFetching ? (
          <PhotoLoader />
        ) : photos && photos.length > 0 ? (
          <>
            <ImageGrid photos={photos} route={`folders/${foldername}`} />
            <Pagination
              totalPages={data?.totalPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </>
        ) : photos && photos.length < 1 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center justify-center min-h-[50vh] text-center"
          >
            <div className="w-32 h-32 rounded-3xl bg-linear-to-br from-primary/10 via-accent/10 to-primary/10 flex items-center justify-center glass border border-border/30 mb-6">
              <Logo className="text-foreground/20" size="lg" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              This folder is empty
            </h2>
            <p className="text-muted-foreground mb-6">
              Start adding photos to this folder
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center justify-center min-h-[50vh] text-center"
          >
            <div className="w-32 h-32 rounded-3xl bg-linear-to-br from-red-500/10 via-orange-500/10 to-red-500/10 flex items-center justify-center glass border border-red-500/30 mb-6">
              <FolderIcon className="w-16 h-16 text-red-500/50" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Folder not found
            </h2>
            <p className="text-muted-foreground mb-6">
              {foldername} doesn&apos;t exist
            </p>
            <Button
              onClick={() => push("/folders")}
              className="bg-linear-to-r from-primary to-accent hover:opacity-90"
            >
              Back to Folders
            </Button>
          </motion.div>
        )}
      </>
    </section>
  );
};

export default Folder;
