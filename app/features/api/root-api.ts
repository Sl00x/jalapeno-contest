import {
    createApi,
    fetchBaseQuery,
    retry,
} from "@reduxjs/toolkit/query/react";


const baseQuery = fetchBaseQuery({
    baseUrl: "https://del-teatro.fr/api",//api link here
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

export const rootApi = createApi({
    reducerPath: "rootApi",
    baseQuery: baseQuery,
    tagTypes: ["User"],
    endpoints: (builder) => ({
    }),
});

export const { } = rootApi;
