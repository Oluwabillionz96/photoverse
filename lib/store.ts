import { PhotoverseAPI } from "@/services/api";
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import authReducer from "./slices/authSlice";
import photoReducer from "./slices/photoSlice";

export const store = configureStore({
  reducer: {
    [PhotoverseAPI.reducerPath]: PhotoverseAPI.reducer,
    auth: authReducer,
    photo: photoReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(PhotoverseAPI.middleware),
});

export type Rootstate = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
