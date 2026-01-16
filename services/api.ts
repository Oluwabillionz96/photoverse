import baseUrl from "@/baseUrl";
import { GetFolderResponse, GetPhotoResponse, Photo } from "@/lib/apiTypes";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const PhotoverseAPI = createApi({
  reducerPath: "phoverseAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}`,
    credentials: "include",
  }),
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
    resendOTP: builder.mutation({
      query: (body) => ({
        url: "auth/resend-otp",
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
    uploadPhotos: builder.mutation({
      query: (formData) => ({
        url: "photos/add",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["photos", "folders"],
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
  useUploadPhotosMutation,
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
