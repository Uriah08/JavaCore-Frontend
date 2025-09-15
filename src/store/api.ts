import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8080/api/user/',
    }),
    tagTypes: [],
    endpoints: (build) => ({
        createUser: build.mutation({
            query: (data) => ({
                url: 'create/',
                method: "POST",
                body: data,
                headers: {
                    "Content-Type": "application/json",
                },
            })
        })
    })
})

export const { 
    useCreateUserMutation 
} = api;