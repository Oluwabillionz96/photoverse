import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChangeEvent } from "react";
import { FaPlus } from "react-icons/fa";
import { FaX } from "react-icons/fa6";

export default function CreateFolderModal({
  value,
  setValue,
  setModalStatus,
}: // modalStatus,
{
  value: string;
  setValue: (arg: string) => void;
  setModalStatus: (arg: "" | "preview" | "select" | "foldername") => void;
  // modalStatus: "" | "preview" | "select" | "foldername";
}) {
  return (
    <Dialog
      open={true}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          setValue("");
          setModalStatus("");
        }
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Folder Name</DialogTitle>
        </DialogHeader>
        <div className="flex items-center gap-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="folder_name" className="sr-only">
              Link
            </Label>
            <Input
              id="folder_name"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setValue(e.target.value)
              }
              value={value}
            />
          </div>
        </div>
        <DialogFooter className="sm:justify-start flex-row">
          <Button
            type="button"
            disabled={!value.trim() || value.length < 3}
            className="sm:text-[1.1rem] text-sm hover:scale-105 bg-green-500 hover:bg-green-600"
            onClick={() => {
              setModalStatus("select");
              console.log("done");
            }}
          >
            <FaPlus /> Create
          </Button>
          <DialogClose asChild>
            <Button
              type="button"
              variant="destructive"
              className="sm:text-[1.1rem] text-sm hover:scale-105"
            >
              <FaX /> Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
