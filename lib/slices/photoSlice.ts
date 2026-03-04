import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  photoIds: string[];
  selectedPhotoIds: string[];
}

const initialState: InitialState = {
  photoIds: [],
  selectedPhotoIds: [],
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
      action: PayloadAction<string[]>
    ) => {
      state.selectedPhotoIds = [...state.selectedPhotoIds, ...action.payload];
    },
    removeSelectedPhoto: (state, action: PayloadAction<string[]>) => {
      state.selectedPhotoIds = state.selectedPhotoIds.filter(
        (item) => !action.payload.includes(item)
      );
    },
  },
});

export const { updatePhotoId, updateSelectedPhotosIds, removeSelectedPhoto } =
  photoSlice.actions;
export default photoSlice.reducer;
