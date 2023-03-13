import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import Contest from "../models/contest.model";

const baseQuery = fetchBaseQuery({
  baseUrl: "/api/contest",
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

export const contestApi = createApi({
  reducerPath: "contestApi",
  baseQuery: baseQuery,
  tagTypes: ["Contest"],
  endpoints: (builder) => ({
    getContests: builder.query<Contest[], void>({
      query: () => ({
        url: "",
        method: "GET",
        type: "application/json",
      }),
    }),
  }),
});

export const { useGetContestsQuery } = contestApi;