import { clsx, type ClassValue } from "clsx";
import { Dispatch, SetStateAction, SyntheticEvent } from "react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getCsrfToken() {
  if (typeof document === "undefined") return null; // SSR safety

  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("XSRF-TOKEN="))
    ?.split("=")[1];
  return token ? token : null;
}

// Gradient colors for placeholders
export const PLACEHOLDER_GRADIENTS = [
  "from-primary/20 via-accent/20 to-primary/20",
  "from-accent/20 via-primary/20 to-accent/20",
  "from-blue-500/20 via-purple-500/20 to-pink-500/20",
  "from-green-500/20 via-teal-500/20 to-blue-500/20",
  "from-orange-500/20 via-red-500/20 to-pink-500/20",
  "from-purple-500/20 via-pink-500/20 to-red-500/20",
  "from-teal-500/20 via-cyan-500/20 to-blue-500/20",
  "from-yellow-500/20 via-orange-500/20 to-red-500/20",
];

/**
 * Get a consistent gradient based on an ID string
 * @param id - Unique identifier (e.g., photo ID, folder ID)
 * @returns Tailwind gradient class string
 */
export function getRandomGradient(id: string): string {
  const index =
    id.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) %
    PLACEHOLDER_GRADIENTS.length;
  return PLACEHOLDER_GRADIENTS[index];
}

export const handleImageLoad = (
  imageId: string,
  event: SyntheticEvent<HTMLImageElement>,
  setImageStates: Dispatch<
    SetStateAction<Record<string, "loading" | "loaded" | "error">>
  >,
) => {
  // Check if image actually loaded with valid dimensions
  const img = event.currentTarget;
  if (img.naturalWidth > 0 && img.naturalHeight > 0) {
    setImageStates((prev) => ({ ...prev, [imageId]: "loaded" }));
  } else {
    setImageStates((prev) => ({ ...prev, [imageId]: "error" }));
  }
};

  export const handleImageError = (
    imageId: string,
    setImageStates: Dispatch<
      SetStateAction<Record<string, "loading" | "loaded" | "error">>
    >,
  ) => {
    setImageStates((prev) => ({ ...prev, [imageId]: "error" }));
  };
