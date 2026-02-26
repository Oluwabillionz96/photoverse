"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FaSignOutAlt } from "react-icons/fa";

interface LogoutModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function LogoutModal({ open, onClose, onConfirm }: LogoutModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="glass border-border/30 max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            <FaSignOutAlt className="text-accent" />
            Logout
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to logout from this device?
          </DialogDescription>
        </DialogHeader>

        <div className="flex gap-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="flex-1 glass border-border/30"
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            className="flex-1"
          >
            Logout
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
