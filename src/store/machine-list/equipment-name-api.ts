import type { EquipmentNameResponse } from "@/lib/types";
import { machineListApi } from "./baseApi";

export const equipmentNameApi = machineListApi.injectEndpoints({
  endpoints: (builder) => ({
    getEquipmentName: builder.query<EquipmentNameResponse, string>({
      query: (groupId) => `/machine-list/equipment-name/get?groupId=${groupId}`,
      providesTags: ["EquipmentName"],
    }),

    // CREATE
    createEquipmentName: builder.mutation({
      query: (equipmentNameData) => ({
        url: "/create",
        method: "POST",
        body: equipmentNameData,
      }),
      invalidatesTags: ["EquipmentName"],
    }),

    // UPDATE
    updateEquipmentName: builder.mutation({
      query: (data) => ({
        url: "/machine-list/equipment-name/update",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["EquipmentName"],
    }),

    // DELETE
    softDeleteEquipmentName: builder.mutation({
      query: (ids: string[]) => ({
        url: "/machine-list/equipment-name/delete",
        method: "DELETE",
        body: ids,
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: ["EquipmentName"],
    }),
  }),
});

export const {
  useGetEquipmentNameQuery,
  useLazyGetEquipmentNameQuery,
  useCreateEquipmentNameMutation,
  useUpdateEquipmentNameMutation,
  useSoftDeleteEquipmentNameMutation,
} = equipmentNameApi;
