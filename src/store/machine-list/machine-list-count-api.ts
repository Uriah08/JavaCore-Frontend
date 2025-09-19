import { machineListApi } from "./baseApi";
import type { MachinesCountResponse } from "@/lib/types";

export const machineCountApi = machineListApi.injectEndpoints({
  endpoints: (builder) => ({
    getMachinesCount: builder.query<MachinesCountResponse, void>({
      query: () => "/machine-list/machine-list-count/counts",
      providesTags: ["Areas", "EquipmentGroup", "EquipmentName", "Component"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetMachinesCountQuery } = machineCountApi;
