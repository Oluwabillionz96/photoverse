"use client"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { FolderOpen, Upload } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { useDragAndDrop } from "@/hooks/useDragAndDrop";
import { motion, AnimatePresence } from "framer-motion";
import useInputContext from "@/hooks/useInputContext";
// import { handleFileChange } from "@/lib/utils/handleInputChange";

const AddPhotoModal = ({
  folderName,
  folder,
  handleUpload,
  setModalStatus,
}: {
  folderName: string;
  folder?: string[];
  handleUpload: () => void;
  setModalStatus: (arg: "" | "preview" | "select" | "foldername") => void;
}) => {
  const { setFiles, files } = useInputContext();

  const { isDragging, dragHandlers } = useDragAndDrop({
    onFilesDropped: (droppedFiles) => {
      setFiles(droppedFiles);
      setModalStatus("");
    },
    existingFiles: files,
  });

  return (
    <>
      <Dialog
        open={true}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            setModalStatus("foldername");
          }
          // setOpen(isOpen);
        }}
      >
        <DialogContent className="sm:max-w-md glass border-border/30 backdrop-blur-xl" {...dragHandlers}>
          {/* Drag overlay */}
          <AnimatePresence>
            {isDragging && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-sm rounded-lg pointer-events-none"
              >
                <div className="glass border-2 border-dashed border-primary/50 rounded-2xl p-8 flex flex-col items-center gap-3">
                  <Upload className="w-16 h-16 text-primary" />
                  <p className="text-lg font-semibold text-foreground">
                    Drop photos here
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <DialogHeader>
            <DialogTitle className="text-xl">Add Images to Folder</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground text-center">
              Please add at least one image to create the folder &quot;
              {folderName}&quot;
            </p>
            <div className="space-y-3">
              <Card
                className="cursor-pointer hover:bg-primary/5 transition-colors glass border-border/30"
                onClick={handleUpload}
              >
                <CardContent className="flex flex-col items-center md:space-x-4 gap-2 md:gap-0 p-4 md:flex-row">
                  <div className="md:w-12 md:h-12 p-2 md:p-0 bg-linear-to-br from-primary/10 to-accent/10 rounded-lg flex items-center justify-center">
                    <Upload className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Choose from Device</h3>
                    <p className="text-sm text-muted-foreground">
                      Upload images from your device
                    </p>
                  </div>
                </CardContent>
              </Card>

              {folder && folder?.length > 0 && (
                <Card
                  className="cursor-pointer hover:bg-primary/5 transition-colors glass border-border/30"
                  onClick={() => {}}
                >
                  <CardContent className="flex items-center space-x-4 p-4">
                    <div className="w-12 h-12 bg-linear-to-br from-primary/10 to-accent/10 rounded-lg flex items-center justify-center">
                      <FolderOpen className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Choose from Photoverse</h3>
                      <p className="text-sm text-muted-foreground">
                        Select images from your existing folders on Photoverse
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddPhotoModal;
