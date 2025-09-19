import type { GetUserResponse } from "@/lib/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8000/api/user/',
        credentials: "include"
    }),
    tagTypes: [],
    endpoints: (build) => ({
        getMe: build.query<GetUserResponse, void>({
            query: () => ({
                url: 'me/',
                method: "GET"
            })
        })
    })
})

export const { 
    useGetMeQuery
} = userApi;