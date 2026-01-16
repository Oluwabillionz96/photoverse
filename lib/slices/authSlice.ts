import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    email: "",
    loading: false,
    otpId: "",
  },
  reducers: {
    updateEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    updateVerificationId: (state, action: PayloadAction<string>) => {
      state.otpId = action.payload;
    },
  },
});

export const { updateEmail, updateVerificationId } = authSlice.actions;
export default authSlice.reducer;
