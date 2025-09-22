import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  photoIds: string[];
}

const initialState: InitialState = {
  photoIds: [],
};

const photoSlice = createSlice({
  name: "photo",
  initialState,
  reducers: {
    updatePhotoId: (state, action: PayloadAction<string[]>) => {
      state.photoIds = action.payload;
    },
  },
});

export const { updatePhotoId } = photoSlice.actions;
export default photoSlice.reducer;
