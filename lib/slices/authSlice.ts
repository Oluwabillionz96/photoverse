import baseUrl from "@/baseUrl";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export const verifyToken = createAsyncThunk(
  "verifyToken",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("token");

    if (!token) {
      return rejectWithValue("No token Found");
    }

    try {
      const response = await fetch(`${baseUrl}auth/verify-token`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok || !data.isValid) {
        localStorage.removeItem("token");
        return rejectWithValue("Token invalid");
      }

      return data;
    } catch (err) {
      localStorage.removeItem("token");
      console.error(err);
      return rejectWithValue(`Verification failed`);
    }
  }
);

const token =
  typeof window !== "undefined" ? localStorage.getItem("token") : null;

const authSlice = createSlice({
  name: "auth",
  initialState: {
    authenticated: false,
    token,
    loading: false,
  },
  reducers: {
    authenticate: (
      state,
      action: PayloadAction<{ authenticate: boolean; token: string }>
    ) => {
      state.authenticated = action.payload.authenticate;
      state.token = action.payload.token;
      localStorage.setItem("token", action.payload.token);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(verifyToken.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyToken.fulfilled, (state) => {
        state.loading = false;
        state.authenticated = true;
      })
      .addCase(verifyToken.rejected, (state) => {
        state.loading = false;
        state.authenticated = false;
        state.token = null;
      });
  },
});

export const { authenticate } = authSlice.actions;
export default authSlice.reducer;
