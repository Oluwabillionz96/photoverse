// import baseUrl from "@/baseUrl";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { Rootstate } from "../store";

// export const refreshAccessToken = createAsyncThunk(
//   "refreshToken",
//   async (_, { rejectWithValue, getState }) => {
//     const { auth } = getState() as Rootstate;
//     const refreshToken = auth?.refreshToken;

//     if (!refreshToken) {
//       return rejectWithValue("No token found");
//     }

//     try {
//       const body = { token: refreshToken };
//       const response = await fetch(`${baseUrl}auth/refresh`, {
//         method: "Post",
//         headers: {
//           "content-type": "application/json",
//         },
//         body: JSON.stringify(body),
//       });

//       if (!response.ok) {
//         localStorage.removeItem("refresh");
//         localStorage.removeItem("token");
//       }

//       const data = await response.json();

//       return data?.accessToken;
//     } catch (error) {
//       console.error(error);
//     }
//   }
// );

// export const getUser = createAsyncThunk(
//   "getUser",
//   async (_, { rejectWithValue, getState }) => {
//     // const token = localStorage.getItem("token");
//     const { auth } = getState() as Rootstate;
//     const token = auth.token;

//     if (!token) {
//       return rejectWithValue("No token Found");
//     }

//     try {
//       const response = await fetch(`${baseUrl}auth/me`, {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       });

//       const data = await response.json();

//       if (!response.ok || !data.isAuthenticated) {
//         localStorage.removeItem("token");
//         return rejectWithValue("Token invalid");
//       }

//       return data.isAuthenticated;
//     } catch (err) {
//       localStorage.removeItem("token");
//       console.log(err);
//       return rejectWithValue(`Verification failed`);
//     }
//   }
// );

const authSlice = createSlice({
  name: "auth",
  initialState: {
    email: "",
    loading: false,
  },
  reducers: {
    updateEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
  },
});

export const { updateEmail } = authSlice.actions;
export default authSlice.reducer;
