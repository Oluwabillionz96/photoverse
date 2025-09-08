import {
  createContext,
  Dispatch,
  RefObject,
  SetStateAction,
  useContext,
} from "react";

export const InputContext = createContext<{
  ref: RefObject<HTMLInputElement | null>;
  openFileDialog: (arg: RefObject<HTMLInputElement | null>) => void;
  files: File[];
  setFiles: Dispatch<SetStateAction<File[]>>;
} | null>(null);

const useInputContext = () => {
  const ctx = useContext(InputContext);

  if (!ctx) {
    throw new Error("useInputContext must be used inside InputProvider");
  }
  return ctx;
};

export default useInputContext;
