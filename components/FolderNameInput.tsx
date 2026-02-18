import { ChangeEvent } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { motion, AnimatePresence } from "framer-motion";

interface FolderNameInputProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  autoFocus?: boolean;
}

const FolderNameInput = ({
  value,
  onChange,
  label = "Folder name",
  placeholder = "Enter folder name...",
  disabled = false,
  autoFocus = true,
}: FolderNameInputProps) => {
  const isInvalid = value.trim() && value.length < 3;

  return (
    <div className="space-y-2">
      <Label htmlFor="folder_name" className="text-sm font-medium">
        {label}
      </Label>
      <Input
        id="folder_name"
        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        className="glass border-border/30 focus:border-primary/50 transition-all"
        autoFocus={autoFocus}
      />
      <AnimatePresence>
        {isInvalid && (
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
  );
};

export default FolderNameInput;
