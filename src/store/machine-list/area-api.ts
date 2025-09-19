import type { AreaResponse } from "@/lib/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const areaApi = createApi({
  reducerPath: "areaApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/machine-list/area", 
    credentials: "include",
  }),
  tagTypes: ["Areas"],
  endpoints: (builder) => ({
    // GET all areas
    getAreas: builder.query<AreaResponse, void>({
      query: () => "/get",
      providesTags: ["Areas"],
    }),

    // GET single area by id
    getAreaById: builder.query({
      query: (id: string) => `get/${id}`,
      providesTags: ["Areas"],
    }),

    // CREATE
    createArea: builder.mutation({
      query: (areaData) => ({
        url: "/create",
        method: "POST",
        body: areaData,
      }),
      invalidatesTags: ["Areas"],
    }),

    // UPDATE
    updateArea: builder.mutation({
      query: (data) => ({
        url: "/update",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Areas"],
    }),

    // DELETE
    deleteArea: builder.mutation({
      query: (ids: string[]) => ({
        url: "/delete",
        method: "DELETE",
        body: ids,
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: ["Areas"],
    }),
  }),
});

export const {
  useGetAreasQuery,
  useGetAreaByIdQuery,
  useCreateAreaMutation,
  useUpdateAreaMutation,
  useDeleteAreaMutation,
} = areaApi;
