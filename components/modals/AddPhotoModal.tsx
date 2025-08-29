import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { FolderOpen, Upload } from "lucide-react";
import { Card, CardContent } from "../ui/card";
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
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Images to Folder</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground text-center">
              Please add at least one image to create the folder &quot;
              {folderName}&quot;
            </p>
            <div className="space-y-3">
              <Card
                className="cursor-pointer hover:bg-accent transition-colors"
                onClick={handleUpload}
              >
                <CardContent className="flex flex-col items-center md:space-x-4 gap-2 md:gap-0 p-4 md:flex-row">
                  <div className="md:w-12 md:h-12 p-2 md:p-0 bg-primary/10 rounded-lg flex items-center justify-center">
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
                  className="cursor-pointer hover:bg-accent transition-colors"
                  onClick={() => {}}
                >
                  <CardContent className="flex items-center space-x-4 p-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
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
