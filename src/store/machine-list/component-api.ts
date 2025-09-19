import type { ComponentResponse } from "@/lib/types";
import { machineListApi } from "./baseApi";

export const componentApi = machineListApi.injectEndpoints({
  endpoints: (builder) => ({
    getComponent: builder.query<ComponentResponse, string>({
      query: (equipmentNameId) =>
        `/machine-list/component/get?equipmentNameId=${equipmentNameId}`,
      providesTags: ["Component"],
    }),

    // CREATE
    createComponent: builder.mutation({
      query: (componentData) => ({
        url: "/create",
        method: "POST",
        body: componentData,
      }),
      invalidatesTags: ["Component"],
    }),

    // UPDATE
    updateComponent: builder.mutation({
      query: (data) => ({
        url: "/machine-list/equipment-name/update",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Component"],
    }),

    // DELETE
    softDeleteComponent: builder.mutation({
      query: (ids: string[]) => ({
        url: "/machine-list/equipment-name/delete",
        method: "DELETE",
        body: ids,
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: ["Component"],
    }),
  }),
});

export const {
  useGetComponentQuery,
  useLazyGetComponentQuery,
  useCreateComponentMutation,
  useUpdateComponentMutation,
  useSoftDeleteComponentMutation,
} = componentApi;
