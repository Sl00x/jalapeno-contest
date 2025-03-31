import Contest from "@/features/models/contest.model";
import User from "@/features/models/user.model";
import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "/api",
  mode: "cors",
  prepareHeaders: (headers) => {
    if (localStorage.getItem("access_token")) {
      const token = localStorage.getItem("access_token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
    }
    headers.set("Access-Control-Allow-Origin", "*");
    return headers;
  },
});
export const baseQueryWithRetry = retry(baseQuery, { maxRetries: 2 });

export const API_TAGS = ["Contest", "ME"];

export const rootApi = createApi({
  reducerPath: "rootApi",
  baseQuery: baseQuery,
  tagTypes: API_TAGS,
  endpoints: (builder) => ({
    // BEGIN /user

    getMe: builder.query<User, void>({
      query: () => ({
        url: `/user/me`,
        method: "GET",
        type: "application/json",
      }),
      providesTags: ["ME"],
    }),

    createUser: builder.mutation<void, { id: string }>({
      query: (body) => ({
        url: `/user`,
        method: "POST",
        type: "application/json",
        body,
      }),
      invalidatesTags: ["ME"],
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
  useGetContestsQuery,
  useLazyGetContestsQuery,
  useParticipateMutation,
  useGetContestQuery,
  useGetContestEndSoonQuery,
  useGetSelfContestsQuery,
  useCreateUserMutation,
  useGetMeQuery,
} = rootApi;
