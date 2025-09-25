import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  photoIds: string[];
  selectedPhotosIds: string[];
}

const initialState: InitialState = {
  photoIds: [],
  selectedPhotosIds: [],
};

const photoSlice = createSlice({
  name: "photo",
  initialState,
  reducers: {
    updatePhotoId: (state, action: PayloadAction<string[]>) => {
      state.photoIds = action.payload;
    },
    updateSelectedPhotosIds: (
      state,
      action: PayloadAction<string[] | string>
    ) => {
      state.selectedPhotosIds = [...state.selectedPhotosIds, ...action.payload];
    },
    removeSelectedPhoto: (state, action: PayloadAction<string[]>) => {
      state.selectedPhotosIds = state.selectedPhotosIds.filter(
        (item) => !action.payload.includes(item)
      );
    },
  },
});

export const { updatePhotoId, updateSelectedPhotosIds, removeSelectedPhoto } =
  photoSlice.actions;
export default photoSlice.reducer;
