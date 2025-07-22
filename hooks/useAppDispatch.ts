// ""
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/store";

export default function useAppDispatch() {
  return useDispatch<AppDispatch>();
}
