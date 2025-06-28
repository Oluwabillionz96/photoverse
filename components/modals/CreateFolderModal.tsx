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
  open,
  setOpen,
  value,
  setValue,
}: {
  open: boolean;
  setOpen: (arg: boolean) => void;
  value: string;
  setValue: (arg: string) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button
              type="button"
              variant="destructive"
              className="text-[1.1rem] hover:scale-105"
            >
              <FaX /> Cancel
            </Button>
          </DialogClose>
          <Button
            type="button"
            disabled={!value.trim()}
            className="text-[1.1rem] hover:scale-105"
          >
            <FaPlus /> Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
