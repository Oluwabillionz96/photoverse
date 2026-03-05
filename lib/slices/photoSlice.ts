import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  photoIds: string[];
  selectedPhotoIds: string[];
  photoLoading: boolean;
}

const initialState: InitialState = {
  photoIds: [],
  selectedPhotoIds: [],
  photoLoading: false,
};

const photoSlice = createSlice({
  name: "photo",
  initialState,
  reducers: {
    updatePhotoId: (state, action: PayloadAction<string[]>) => {
      state.photoIds = action.payload;
    },
    updateSelectedPhotosIds: (state, action: PayloadAction<string[]>) => {
      state.selectedPhotoIds = [...state.selectedPhotoIds, ...action.payload];
    },
    removeSelectedPhoto: (state, action: PayloadAction<string[]>) => {
      state.selectedPhotoIds = state.selectedPhotoIds.filter(
        (item) => !action.payload.includes(item),
      );
    },
    updatePhotoLoading: (state, action: PayloadAction<boolean>) => {
      state.photoLoading = action.payload;
    },
  },
});

export const { updatePhotoId, updateSelectedPhotosIds, removeSelectedPhoto, updatePhotoLoading } =
  photoSlice.actions;
export default photoSlice.reducer;
