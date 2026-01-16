import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    email: "",
    loading: false,
    verificationId: "",
  },
  reducers: {
    updateEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    updateVerificationId: (state, action: PayloadAction<string>) => {
      state.verificationId = action.payload;
    },
  },
});

export const { updateEmail, updateVerificationId } = authSlice.actions;
export default authSlice.reducer;
