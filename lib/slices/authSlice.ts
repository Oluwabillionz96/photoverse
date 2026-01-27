import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    email: "",
    loading: false,
    verificationId: "",
    user: {
      email: "",
      isAuthenticated: false,
    },
  },
  reducers: {
    updateEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    updateVerificationId: (state, action: PayloadAction<string>) => {
      state.verificationId = action.payload;
    },
    updateLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    updateUser: (
      state,
      action: PayloadAction<{ email: string; isAuthenticated: boolean }>,
    ) => {
      state.user.email = action.payload.email;
      state.user.isAuthenticated = action.payload.isAuthenticated;
    },
  },
});

export const { updateEmail, updateVerificationId, updateLoading, updateUser } =
  authSlice.actions;
export default authSlice.reducer;
