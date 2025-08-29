import baseUrl from "@/baseUrl";
import { GetFolderResponse } from "@/lib/apiTypes";
import { Rootstate } from "@/lib/store";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const PhotoverseAPI = createApi({
  reducerPath: "phoverseAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}`,
    prepareHeaders: (headers, { getState }) => {
      const { auth } = getState() as Rootstate;
      const token = auth.token;

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ["folders"],

  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: "auth/login",
        method: "POST",
        body,
      }),
    }),
    register: builder.mutation({
      query: (body) => ({
        url: "auth/register",
        method: "POST",
        body,
      }),
    }),
    verifyEmail: builder.mutation({
      query: (body) => ({
        url: "auth/verify-otp",
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
    getPhotos: builder.query({
      query: () => "photos",
    }),
    createFolder: builder.mutation({
      query: (body) => ({
        url: "folders",
        method: "POST",
        body,
      }),
      invalidatesTags: ["folders"],
    }),
    getFolders: builder.query<GetFolderResponse, void>({
      query: () => "folders",
      providesTags: ["folders"],
    }),
    uploadPhotos: builder.mutation({
      query: (formData) => ({
        url: "photos/add",
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const {
  useUploadPhotosMutation,
  useLoginMutation,
  useRegisterMutation,
  useVerifyEmailMutation,
  useResendOTPMutation,
  useGetPhotosQuery,
  useCreateFolderMutation,
  useGetFoldersQuery,
} = PhotoverseAPI;
