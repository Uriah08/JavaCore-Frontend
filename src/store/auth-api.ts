import type { GetUserResponse } from "@/lib/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/auth/",
    credentials: "include",
  }),
  tagTypes: [],
  endpoints: (build) => ({
    login: build.mutation({
      query: (data) => ({
        url: "login/",
        credentials: "include",
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    logout: build.mutation<void, void>({
      query: () => ({
        url: "logout/",
        method: "POST",
        credentials: "include",
      }),
    }),
    getCurrentUser: build.query<GetUserResponse, void>({
      query: () => ({
        url: "/me",
        credentials: "include",
        method: "GET",
      })
    }),
    refreshToken: build.mutation<GetUserResponse, void>({
      query: () => ({
        url: "/refresh-token",
        method: "POST",
        credentials: "include",
      })
    })
  }),
});

export const { 
  useLoginMutation, 
  useLogoutMutation, 
  useLazyGetCurrentUserQuery,
  useRefreshTokenMutation
} = authApi;
