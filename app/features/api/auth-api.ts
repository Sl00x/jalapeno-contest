import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import User from "../models/user.model";

const baseQuery = fetchBaseQuery({
  baseUrl: "/api/auth",
  mode: "cors",
  prepareHeaders: (headers, { getState }) => {
    if (localStorage.getItem("authenticated")) {
      const token = localStorage.getItem("authenticated")?.replaceAll('"', "");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
    }
    headers.set("Access-Control-Allow-Origin", "*");
    return headers;
  },
});
export const baseQueryWithRetry = retry(baseQuery, { maxRetries: 2 });

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQuery,
  tagTypes: ["Contest", "Profile"],
  endpoints: (builder) => ({
    getProfile: builder.query<User, void>({
      query: () => ({
        url: "/profile",
        method: "GET",
        type: "application/json",
      }),
      providesTags: ["Profile"],
    }),
    register: builder.mutation<User, Partial<User>>({
      query: (body) => ({
        url: "/register",
        method: "POST",
        type: "application/json",
        body,
      }),
    }),
    login: builder.mutation<{ access_token: string }, { email: string; password: string }>({
      query: (body) => ({
        url: "/login",
        method: "POST",
        type: "application/json",
        body,
      }),
    }),
  }),
});

export const { useGetProfileQuery, useLoginMutation, useRegisterMutation } = authApi;
