"use client";
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
import { FolderPlus, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CreateFolderModal({
  value,
  setValue,
  setModalStatus,
}: {
  value: string;
  setValue: (arg: string) => void;
  setModalStatus: (arg: "" | "preview" | "select" | "foldername") => void;
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
      <DialogContent className="sm:max-w-md glass border-border/30 backdrop-blur-xl">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-primary/20 to-accent/20 flex items-center justify-center">
              <FolderPlus className="w-5 h-5 text-primary" />
            </div>
            <DialogTitle className="text-xl">Create New Folder</DialogTitle>
          </div>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="folder_name" className="text-sm font-medium">
              Folder name
            </Label>
            <Input
              id="folder_name"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setValue(e.target.value)
              }
              value={value}
              placeholder="Enter folder name..."
              className="glass border-border/30 focus:border-primary/50 transition-all"
              autoFocus
            />
            <AnimatePresence>
              {value.trim() && value.length < 3 && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="text-xs text-red-400"
                >
                  Folder name must be at least 3 characters
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>
        
        <DialogFooter className="flex-row gap-2">
          <motion.div 
            className="flex-1"
            whileHover={{ scale: 1.02 }} 
            whileTap={{ scale: 0.98 }}
          >
            <Button
              type="button"
              disabled={!value.trim() || value.length < 3}
              className="w-full bg-linear-to-r from-primary to-accent hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => {
                setModalStatus("select");
              }}
            >
              <FolderPlus className="w-4 h-4 mr-2" />
              Create Folder
            </Button>
          </motion.div>
          
          <DialogClose asChild>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                type="button"
                variant="outline"
                className="glass border-border/30 hover:border-red-500/50 hover:bg-red-500/10 hover:text-red-500"
              >
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
            </motion.div>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
