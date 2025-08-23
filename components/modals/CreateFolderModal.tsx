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
import { useCreateFolderMutation } from "@/services/api";
import { ChangeEvent } from "react";
import toast from "react-hot-toast";
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
  const [createFolder, { isLoading }] = useCreateFolderMutation();
  async function CreateFolder() {
    const response = await createFolder({ name: value });
    if ("data" in response) {
      toast.success(response.data.message);
      setValue("");
    } else if ("error" in response) {
      const error = response.error as {
        status?: number | string;
        data?: { message: string };
      };

      const message =
        error?.data?.message ||
        (error?.status === "FETCH_ERROR"
          ? "Network error. Please check your connection."
          : "An unexpected error occurred.");

      toast.error(message);
    }
    setOpen(false);
  }

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
          <Button
            type="button"
            disabled={!value.trim() || value.length < 3 || isLoading}
            className="text-[1.1rem] hover:scale-105 bg-green-500 hover:bg-green-600"
            onClick={CreateFolder}
          >
            <FaPlus /> Create
          </Button>
          <DialogClose asChild>
            <Button
              type="button"
              variant="destructive"
              className="text-[1.1rem] hover:scale-105"
            >
              <FaX /> Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
