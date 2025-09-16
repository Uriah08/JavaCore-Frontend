import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8000/api/auth/',
    }),
    tagTypes: [],
    endpoints: (build) => ({
        login: build.mutation({
            query: (data) => ({
                url: 'login/',
                credentials: "include",
                method: "POST",
                body: data,
                headers: {
                    "Content-Type": "application/json",
                },
            })
        }),
        logout: build.mutation<void, void>({
            query: () => ({
                url: "logout/",
                method: "POST",
                credentials: "include"
            }),
        }),
    })
})

export const { 
    useLoginMutation,
    useLogoutMutation
} = authApi;