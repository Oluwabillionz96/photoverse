import baseUrl from "@/baseUrl";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Rootstate } from "../store";

export const refreshAccessToken = createAsyncThunk(
  "refreshToken",
  async (_, { rejectWithValue, getState }) => {
    const { auth } = getState() as Rootstate;
    const refreshToken = auth?.refreshToken;

    if (!refreshToken) {
      return rejectWithValue("No token found");
    }

    try {
      const body = { token: refreshToken };
      const response = await fetch(`${baseUrl}auth/refresh`, {
        method: "Post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        localStorage.removeItem("refresh");
        localStorage.removeItem("token");
      }

      const data = await response.json();

      return data?.accessToken;
    } catch (error) {
      console.error(error);
    }
  }
);

export const getUser = createAsyncThunk(
  "getUser",
  async (_, { rejectWithValue, getState }) => {
    // const token = localStorage.getItem("token");
    const { auth } = getState() as Rootstate;
    const token = auth.token;

    if (!token) {
      return rejectWithValue("No token Found");
    }

    try {
      const response = await fetch(`${baseUrl}auth/me`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok || !data.isAuthenticated) {
        localStorage.removeItem("token");
        return rejectWithValue("Token invalid");
      }

      return data.isAuthenticated;
    } catch (err) {
      localStorage.removeItem("token");
      console.log(err);
      return rejectWithValue(`Verification failed`);
    }
  }
);

const token =
  typeof window !== "undefined" ? localStorage.getItem("token") : null;
const refreshToken =
  typeof window !== "undefined" ? localStorage.getItem("refresh") : null;

const authSlice = createSlice({
  name: "auth",
  initialState: {
    authenticated: false,
    token,
    refreshToken,
    loading: false,
  },
  reducers: {
    authenticate: (
      state,
      action: PayloadAction<{
        token: { accessToken: string; refreshToken: string };
      }>
    ) => {
      state.token = action.payload.token.accessToken;
      state.refreshToken = action.payload.token.refreshToken;
      localStorage.setItem("token", action.payload.token.accessToken);
      localStorage.setItem("refresh", action.payload.token.refreshToken);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUser.fulfilled, (state, action: PayloadAction<boolean>) => {
        state.loading = false;
        state.authenticated = action.payload;
      })
      .addCase(getUser.rejected, (state) => {
        state.loading = false;
        state.authenticated = false;
        state.token = null;
      })
      .addCase(refreshAccessToken.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        refreshAccessToken.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.loading = false;
          state.token = action.payload;
        }
      )
      .addCase(refreshAccessToken.rejected, (state) => {
        state.loading = false;
        state.authenticated = false;
        state.token = null;
        state.refreshToken = null;
      });
  },
});

export const { authenticate } = authSlice.actions;
export default authSlice.reducer;
