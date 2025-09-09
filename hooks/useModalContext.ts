import { createContext, useContext } from "react";

export const ModalContext = createContext<{
  modalStatus: "" | "preview" | "select" | "foldername";
  changeModalStatus: (arg: "" | "preview" | "select" | "foldername") => void;
} | null>(null);

const useModalContext = () => {
  const ctx = useContext(ModalContext);
  if (!ctx) {
    throw new Error("useModalContext must be used inside ModalProvider");
  }
  return ctx;
};

export default useModalContext;
