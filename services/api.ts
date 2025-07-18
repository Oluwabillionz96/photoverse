import baseUrl from "@/baseUrl";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const PhotoverseAPI = createApi({
  reducerPath: "phoverseAPI",
  baseQuery: fetchBaseQuery({ baseUrl: `${baseUrl}` }),
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
  }),
});

export const { useLoginMutation, useRegisterMutation } = PhotoverseAPI;
