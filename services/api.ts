import baseUrl from "@/baseUrl";
import { GetFolderResponse, GetPhotoResponse, Photo } from "@/lib/apiTypes";
import { getCsrfToken } from "@/lib/utils";

import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl,
  credentials: "include",
  prepareHeaders: (headers) => {
    const csrfToken = getCsrfToken();
    if (csrfToken) {
      headers.set("X-XSRF-TOKEN", csrfToken);
    }

    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  // If we get a 401 (unauthorized), try to refresh the token
  if (result.error && result.error.status === 401) {
    console.log("Access token expired, attempting refresh...");

    // Try to refresh the token
    const refreshResult = await baseQuery(
      { url: "auth/refresh", method: "POST" },
      api,
      extraOptions,
    );

    if (refreshResult.data) {
      // Refresh successful - new tokens (JWT + CSRF) are now in cookies
      console.log("Token refreshed successfully, retrying original request");

      // Retry the original request with new tokens
      result = await baseQuery(args, api, extraOptions);
    } else {
      // Refresh failed - redirect to login
      console.log("Token refresh failed, redirecting to login");
      window.location.href = "/auth/fucking-base-query";
    }
  }

  return result;
};

export const PhotoverseAPI = createApi({
  reducerPath: "phoverseAPI",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["folders", "photos", "favourite"],

  endpoints: (builder) => ({
    getForgotPasswordOTP: builder.mutation({
      query: (body) => ({
        url: "forgot-password/get-otp",
        method: "POST",
        body,
      }),
    }),
    verifyForgotPasswordOTP: builder.mutation({
      query: (body) => ({
        url: "forgot-password/verify-otp",
        method: "POST",
        body,
      }),
    }),
    continueToAccount: builder.mutation({
      query: (body) => ({
        url: "forgot-password/continue-to-account",
        method: "POST",
        body,
      }),
    }),
    resetPassword: builder.mutation({
      query: (body) => ({
        url: "forgot-password/reset-password",
        method: "POST",
        body,
      }),
    }),
    resendOTP: builder.mutation({
      query: ({ type, ...body }) => ({
        url: `auth/resend-otp?type=${type}`,
        method: "POST",
        body,
      }),
    }),
    getPhotos: builder.query<GetPhotoResponse, { page: string | number }>({
      query: ({ page }) => `photos?limit=60&page=${page}`,
      providesTags: ["photos"],
    }),
    createFolder: builder.mutation({
      query: (body) => ({
        url: "folders",
        method: "POST",
        body,
      }),
      invalidatesTags: ["folders"],
    }),
    getFolders: builder.query<GetFolderResponse, { page: string | number }>({
      query: ({ page }) => `folders?limit=12&page=${page}`,
      providesTags: ["folders"],
    }),
    getFolderPhotos: builder.query<GetPhotoResponse, { foldername: string }>({
      query: ({ foldername }) => `photos/${foldername}`,
      providesTags: ["photos"],
    }),
    getOnePhoto: builder.query<Photo, { id: string }>({
      query: ({ id }) => `photos/one/${id}`,
      providesTags: ["photos"],
    }),
    toggleFavourite: builder.mutation({
      query: (body) => ({
        url: "photos/favourite",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["photos"],
    }),
    getFavourite: builder.query<GetPhotoResponse, { page: string | number }>({
      query: ({ page }) => `photos/favourite?limit=60&page=${page}`,
      providesTags: ["favourite"],
    }),
    renameFolder: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `folders/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["folders"],
    }),
    movePhotoToTrash: builder.mutation({
      query: (body) => ({
        url: "photos/trash",
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["folders", "photos"],
    }),
  }),
});

export const {
  useGetForgotPasswordOTPMutation,
  useVerifyForgotPasswordOTPMutation,
  useContinueToAccountMutation,
  useResetPasswordMutation,
  useResendOTPMutation,
  useGetPhotosQuery,
  useCreateFolderMutation,
  useGetFoldersQuery,
  useGetFolderPhotosQuery,
  useGetOnePhotoQuery,
  useToggleFavouriteMutation,
  useGetFavouriteQuery,
  useRenameFolderMutation,
  useMovePhotoToTrashMutation,
} = PhotoverseAPI;
