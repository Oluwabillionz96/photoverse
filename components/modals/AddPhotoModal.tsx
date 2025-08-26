import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import { Card } from "../ui/card";

const AddPhotoModal = ({
  open,
  setOpen,
  folderName,
}: {
  open: boolean;
  setOpen: (arg: boolean) => void;
  folderName: string;
}) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Images to Folder</DialogTitle>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4"
            onClick={() => setOpen(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Please add at least one image to create the folder &quot;
            {folderName}&quot;
          </p>
          <div className="space-y-3">
            <Card></Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddPhotoModal;
