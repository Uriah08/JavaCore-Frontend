import type { GetAllClientsResponse, GetUserResponse } from "@/lib/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/user/",
    credentials: "include",
  }),
  tagTypes: ["Users"],
  endpoints: (build) => ({
    getMe: build.query<GetUserResponse, void>({
      query: () => ({
        url: "me/",
        method: "GET",
      }),
    }),
    getAllClients: build.query<GetAllClientsResponse, void>({
      query: () => "/get", 
      providesTags: ["Users"],
    }),
  }),
});

export const { useGetMeQuery, useGetAllClientsQuery } = userApi;
