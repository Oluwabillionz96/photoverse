import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface Routing {
  tab: string;
  createFolder: boolean;
  files: File[];
}

const tab = typeof window !== "undefined" ? localStorage.getItem("tab") : null;

const initialState: Routing = {
  tab: tab ?? "folders",
  createFolder: false,
  files: [],
};

const routingSlice = createSlice({
  name: "routing",
  initialState,
  reducers: {
    changeTab: (state, action: PayloadAction<string>) => {
      state.tab = action.payload;
      localStorage.setItem("tab", action.payload);
    },
    changeCreateFolder: (state, action: PayloadAction<boolean>) => {
      state.createFolder = action.payload;
    },
    // changeFiles
  },
});

export const { changeTab, changeCreateFolder } = routingSlice.actions;
export default routingSlice.reducer;
