import type { AreaResponse } from "@/lib/types";
import { machineListApi } from "./baseApi";

export const areaApi = machineListApi.injectEndpoints({
  endpoints: (builder) => ({
    getAreas: builder.query<AreaResponse, void>({
      query: () => "/machine-list/area/get",
      providesTags: ["Areas"],
    }),

    // GET single area by id
    getAreaById: builder.query({
      query: (id: string) => `/machine-list/area/get/${id}`,
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
        url: "/machine-list/area/update",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Areas"],
    }),

    // DELETE
    softDeleteArea: builder.mutation({
      query: (ids: string[]) => ({
        url: "/machine-list/area/delete",
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
  useSoftDeleteAreaMutation,
} = areaApi;
