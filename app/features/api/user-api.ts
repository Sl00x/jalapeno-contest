import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "/api/user",
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
    refund: builder.mutation<void, { amount: number; orderId: string }>({
      query: (body) => ({
        url: `/refund`,
        method: "PUT",
        type: "application/json",
        body,
      }),
    }),
  }),
});

export const { useGetTicketForContestQuery, useRefundMutation } = userApi;
