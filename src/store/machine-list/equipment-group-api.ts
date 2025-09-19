import type { EquipmentGroupResponse } from "@/lib/types";
import { machineListApi } from "./baseApi";

export const equipmentGroupApi = machineListApi.injectEndpoints({
  endpoints: (builder) => ({
    getEquipmentGroup: builder.query<EquipmentGroupResponse, string>({
      query: (areaId) => `/machine-list/equipment-group/get?areaId=${areaId}`,
      providesTags: ["EquipmentGroup"],
    }),

    // CREATE
    createEquipmentGroup: builder.mutation({
      query: (equipmentGroupData) => ({
        url: "/create",
        method: "POST",
        body: equipmentGroupData,
      }),
      invalidatesTags: ["EquipmentGroup"],
    }),

    // UPDATE
    updateEquipmentGroup: builder.mutation({
      query: (data) => ({
        url: "/machine-list/equipment-group/update",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["EquipmentGroup"],
    }),

    // DELETE
    softDeleteEquipmentGroup: builder.mutation({
      query: (ids: string[]) => ({
        url: "/machine-list/equipment-group/delete",
        method: "DELETE",
        body: ids,
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: ["EquipmentGroup"],
    }),
  }),
});

export const {
    useGetEquipmentGroupQuery, 
    useLazyGetEquipmentGroupQuery,
    useCreateEquipmentGroupMutation, 
    useUpdateEquipmentGroupMutation, 
    useSoftDeleteEquipmentGroupMutation
} = equipmentGroupApi;
