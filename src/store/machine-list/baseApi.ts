import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const machineListApi = createApi({
  reducerPath: "machineListApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api",
    credentials: "include",
  }),
  tagTypes: ["Areas", "EquipmentGroup", "EquipmentName", "Component"],
  endpoints: () => ({}),
});