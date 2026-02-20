"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaExclamationTriangle } from "react-icons/fa";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface DeleteAccountModalProps {
  open: boolean;
  onClose: () => void;
}

export default function DeleteAccountModal({ open, onClose }: DeleteAccountModalProps) {
  const router = useRouter();
  const [confirmText, setConfirmText] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();

    if (confirmText !== "DELETE") {
      toast.error('Please type "DELETE" to confirm');
      return;
    }

    setLoading(true);
    try {
      // TODO: Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      toast.success("Account deleted successfully");
      router.push("/auth/login");
    } catch (error) {
      toast.error("Failed to delete account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="glass border-destructive/30 max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl text-destructive flex items-center gap-2">
            <FaExclamationTriangle />
            Delete Account
          </DialogTitle>
          <DialogDescription>
            This action cannot be undone. All your photos, folders, and data will be permanently deleted.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleDelete} className="space-y-4 mt-4">
          <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20">
            <p className="text-sm text-foreground">
              <strong>Warning:</strong> This will permanently delete:
            </p>
            <ul className="text-sm text-muted-foreground mt-2 space-y-1 list-disc list-inside">
              <li>All your photos and folders</li>
              <li>Your account information</li>
              <li>All settings and preferences</li>
            </ul>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirm-text">
              Type <strong>DELETE</strong> to confirm
            </Label>
            <Input
              id="confirm-text"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder="DELETE"
              required
              className="glass border-border/30"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Enter your password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="glass border-border/30"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 glass border-border/30"
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="destructive"
              className="flex-1"
              disabled={loading || confirmText !== "DELETE"}
            >
              {loading ? "Deleting..." : "Delete Account"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
