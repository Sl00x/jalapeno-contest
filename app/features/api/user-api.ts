import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import Contest from "../models/contest.model";
import { AnyARecord } from "dns";

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

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: baseQuery,
  tagTypes: ["Contest", "Profile", "ProfileTickets"],
  endpoints: (builder) => ({
    getTicketForContest: builder.query<any[], number>({
      query: (id) => ({
        url: `/${id}/tickets`,
        method: "GET",
        type: "application/json",
      }),
      providesTags: ["ProfileTickets"],
    }),
  }),
});

export const { useGetTicketForContestQuery } = userApi;
