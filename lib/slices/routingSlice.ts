import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface Routing {
  tab: string;
  files: File[];
  modalStatus: "" | "preview" | "select" | "foldername";
}

const tab = typeof window !== "undefined" ? localStorage.getItem("tab") : null;

const initialState: Routing = {
  tab: tab ?? "folders",
  files: [],
  modalStatus: "",
};

const routingSlice = createSlice({
  name: "routing",
  initialState,
  reducers: {
    changeTab: (state, action: PayloadAction<string>) => {
      state.tab = action.payload;
      localStorage.setItem("tab", action.payload);
    },
    changeModalStatus: (
      state,
      action: PayloadAction<"" | "preview" | "select" | "foldername">
    ) => {
      state.modalStatus = action.payload;
    },
  },
});

export const { changeTab, changeModalStatus } = routingSlice.actions;
export default routingSlice.reducer;
