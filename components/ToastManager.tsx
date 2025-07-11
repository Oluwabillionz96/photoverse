"use client";
import { useEffect } from "react";
import toast, { useToasterStore } from "react-hot-toast";

const TOAST_LIMIT = 5;

const ToastManager = () => {
  const { toasts } = useToasterStore();

  useEffect(() => {
    toasts
      .filter((t) => t.visible)
      .filter((_, i) => i >= TOAST_LIMIT)
      .forEach((t) => toast.dismiss(t.id));
  }, [toasts]);
  return null;
};

export default ToastManager;
