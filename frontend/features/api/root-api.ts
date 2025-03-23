import Contest from "@/features/models/contest.model";
import User from "@/features/models/user.model";
import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "/api",
  mode: "cors",
  prepareHeaders: (headers) => {
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

export const rootApi = createApi({
  reducerPath: "rootApi",
  baseQuery: baseQuery,
  tagTypes: ["Contest", "Profile"],
  endpoints: (builder) => ({
    // BEGIN /auth

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
    login: builder.mutation<
      { access_token: string },
      { email: string; password: string }
    >({
      query: (body) => ({
        url: "/login",
        method: "POST",
        type: "application/json",
        body,
      }),
      invalidatesTags: ["Profile"],
    }),

    // END /auth
    // BEGIN /user

    refund: builder.mutation<void, { amount: number; orderId: string }>({
      query: (body) => ({
        url: `/user/refund`,
        method: "PUT",
        type: "application/json",
        body,
      }),
    }),

    // END /user
    // BEGIN /contest

    getContests: builder.query<Contest[], string | undefined>({
      query: (query) => ({
        url: "/contest" + (query ? `?query=${query}` : ""),
        method: "GET",
        type: "application/json",
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Contest" as const, id })),
              "Contest",
            ]
          : ["Contest"],
    }),
    getSelfContests: builder.query<Contest[], void>({
      query: () => ({
        url: "/contest/self",
        method: "GET",
        type: "application/json",
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Contest" as const, id })),
              "Contest",
            ]
          : ["Contest"],
    }),
    getContest: builder.query<Contest, number>({
      query: (id: number) => ({
        url: `/contest/${id}`,
        method: "GET",
        type: "application/json",
      }),
      providesTags: (_, __, arg) => [{ type: "Contest", id: arg }],
    }),

    getContestEndSoon: builder.query<Contest, void>({
      query: () => ({
        url: `/contest/soon`,
        method: "GET",
        type: "application/json",
      }),
      providesTags: (result) => [{ type: "Contest", id: result?.id }],
    }),

    participate: builder.mutation<Contest, number>({
      query: (id: number) => ({
        url: `/contest/${id}/participate`,
        method: "POST",
        type: "application/json",
      }),
      invalidatesTags: (_, __, arg) => [{ type: "Contest", id: arg }],
    }),

    // END /contest
  }),
});

export const {
  useRefundMutation,
  useGetContestsQuery,
  useLazyGetContestsQuery,
  useParticipateMutation,
  useGetContestQuery,
  useGetContestEndSoonQuery,
  useGetSelfContestsQuery,
  useGetProfileQuery,
  useLoginMutation,
  useRegisterMutation,
} = rootApi;
