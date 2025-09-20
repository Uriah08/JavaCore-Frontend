import type { GetAllClientsResponse, GetUserResponse } from "@/lib/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/user/",
    credentials: "include",
  }),
  tagTypes: ['User'],
  endpoints: (build) => ({
    createUser: build.mutation({
      query: (data) => ({
        url: 'register/',
        method: "POST",
        body: data,
      })
    }),
    getMe: build.query<GetUserResponse, void>({
      query: () => ({
        url: 'me/',
        method: "GET"
      }),
      providesTags: ['User']
    }),
    changePassword: build.mutation({
      query: (data) => ({
        url: 'change-password/',
        method: "POST",
        body: data
      })
    }),
    getAllClients: build.query<GetAllClientsResponse, void>({
      query: () => "/get", 
      providesTags: ["User"],
    }),
  }),
});

export const { 
  useGetMeQuery, 
  useGetAllClientsQuery, 
  useCreateUserMutation, 
  useChangePasswordMutation 
} = userApi;
