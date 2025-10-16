import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
// import { FaPlus } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import Spinner from "../loaders/Spinner";

const RenameFolderModal = ({
    
  isOpen,
  setIsOpen,
  handleRename,
  folderId,
  loading,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  handleRename: (folderId: string, foldername: string) => void;
  folderId: string;
  loading: boolean;
}) => {
  const [value, setValue] = useState("");
  useEffect(() => {
    if (!isOpen) {
      setValue("");
      return;
    }
  }, [isOpen]);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>New Folder Name</DialogTitle>
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
              disabled={loading}
            />
          </div>
        </div>
        <DialogFooter className="sm:justify-start flex-row">
          <Button
            type="button"
            disabled={!value.trim() || value.length < 3 || loading}
            className="sm:text-[1.1rem] text-sm hover:scale-105 bg-green-500 hover:bg-green-600"
            onClick={() => {
              handleRename(folderId, value);
            }}
          >
            {loading && <Spinner />}
            {!loading ? "Re-name" : "Renaming"} Folder
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
};

export default RenameFolderModal;
