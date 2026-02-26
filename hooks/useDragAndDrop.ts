import { useState, useCallback, useRef, DragEvent } from "react";
import toast from "react-hot-toast";
import { sanitizeFiles } from "@/lib/utils/sanitizeSvg";

interface UseDragAndDropProps {
  onFilesDropped: (files: File[]) => void;
  existingFiles?: File[];
}

const acceptedTypes = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/svg+xml",
];
const maxFiles = 10;
const maxFileSize = 5 * 1024 * 1024;

export const useDragAndDrop = ({
  onFilesDropped,

  existingFiles = [],
}: UseDragAndDropProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const dragCounterRef = useRef(0);

  const isDuplicate = useCallback(
    (file: File): boolean => {
      return existingFiles.some(
        (existingFile) =>
          existingFile.name === file.name &&
          existingFile.size === file.size &&
          existingFile.lastModified === file.lastModified,
      );
    },
    [existingFiles],
  );

  const validateFiles = useCallback(
    (files: FileList | null): File[] => {
      if (!files) return [];

      let filesToProcess = Array.from(files);
      const validFiles: File[] = [];
      const duplicateFiles: string[] = [];
      const invalidTypeFiles: string[] = [];
      const oversizedFiles: string[] = [];
      let limitReached = false;

      // Track signatures of files in the current batch to detect duplicates within the batch
      const batchSignatures = new Set<string>();

      // Check if adding these files would exceed the limit
      const availableSlots = maxFiles - existingFiles.length;

      if (availableSlots <= 0) {
        toast.error("Maximum of 10 files allowed at a time");
        return [];
      }

      if (filesToProcess.length > availableSlots) {
        filesToProcess = filesToProcess.slice(0, availableSlots);
        limitReached = true;
      }

      filesToProcess.forEach((file) => {
        // Check file size first
        if (file.size > maxFileSize) {
          oversizedFiles.push(file.name);
          return;
        }

        // Check if file type is accepted
        if (!acceptedTypes.includes(file.type)) {
          invalidTypeFiles.push(file.name);
          return;
        }

        // Create a stable signature for the file
        const signature = `${file.name}-${file.size}-${file.lastModified}`;

        // Check if file is a duplicate of existing files
        if (isDuplicate(file)) {
          duplicateFiles.push(file.name);
          return;
        }

        // Check if file is a duplicate within the current batch
        if (batchSignatures.has(signature)) {
          duplicateFiles.push(file.name);
          return;
        }

        // Add to batch signatures and valid files
        batchSignatures.add(signature);
        validFiles.push(file);
      });

      // Show toast notifications in priority order
      if (limitReached) {
        toast.error("Only 10 files allowed at a time");
      }

      if (oversizedFiles.length > 0) {
        if (oversizedFiles.length === 1) {
          toast.error(`${oversizedFiles[0]} exceeds 5MB limit`);
        } else {
          toast.error(`${oversizedFiles.length} files exceed 5MB limit`);
        }
      }

      if (invalidTypeFiles.length > 0) {
        if (invalidTypeFiles.length === 1) {
          toast.error(`${invalidTypeFiles[0]} is not an image file`);
        } else {
          toast.error("Only image files are allowed");
        }
      }

      if (duplicateFiles.length > 0) {
        if (duplicateFiles.length === 1) {
          toast.error(`${duplicateFiles[0]} already exists`);
        } else if (
          duplicateFiles.length === filesToProcess.length &&
          !limitReached &&
          oversizedFiles.length === 0 &&
          invalidTypeFiles.length === 0
        ) {
          toast.error("All files already exist");
        } else {
          toast.error(
            `${duplicateFiles.length} duplicate ${duplicateFiles.length === 1 ? "file was" : "files were"} skipped`,
          );
        }
      }

      // Show success message if files were added
      if (validFiles.length > 0) {
        toast.success(
          `${validFiles.length} ${validFiles.length === 1 ? "file" : "files"} added`,
        );
      }

      return validFiles;
    },
    [isDuplicate, existingFiles.length],
  );

  const handleDragEnter = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();

      // Don't show drag overlay if already at max files
      if (existingFiles.length >= maxFiles) {
        return;
      }

      dragCounterRef.current++;
      if (dragCounterRef.current > 0) {
        setIsDragging(true);
      }
    },
    [existingFiles.length],
  );

  const handleDragLeave = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    dragCounterRef.current--;
    if (dragCounterRef.current === 0) {
      setIsDragging(false);
    }
  }, []);

  const handleDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback(
    async (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      
      // Reset drag state
      dragCounterRef.current = 0;
      setIsDragging(false);

      const files = validateFiles(e.dataTransfer.files);
      if (files.length > 0) {
        try {
          const sanitizedFiles = await sanitizeFiles(files);
          onFilesDropped(sanitizedFiles);
        } catch (error) {
          toast.error("Failed to process files");
          console.error("File sanitization error:", error);
        }
      }
    },
    [onFilesDropped, validateFiles],
  );

  return {
    isDragging,
    dragHandlers: {
      onDragEnter: handleDragEnter,
      onDragLeave: handleDragLeave,
      onDragOver: handleDragOver,
      onDrop: handleDrop,
    },
  };
};
