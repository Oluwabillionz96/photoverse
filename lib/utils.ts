import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getCsrfToken() {
  if (typeof document === "undefined") return null; // SSR safety

  const token = document.cookie
  .split("; ")
  .find(row => row.startsWith("XSRF-TOKEN="))
  ?.split("=")[1];
  return token ? token : null;
}
