import type { JobsResponse } from "@/lib/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const jobApi = createApi({
  reducerPath: "jobApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/job",
    credentials: "include",
  }),
  tagTypes: ["Jobs"],
  endpoints: (builder) => ({
    createJob: builder.mutation({
      query: (jobData) => ({
        url: "/create",
        method: "POST",
        body: jobData, 
      }),
      invalidatesTags: ["Jobs"],
    }),
    getJobs: builder.query<JobsResponse, void>({
      query: () => "/get",
      providesTags: ["Jobs"],
    }),
    getJobById: builder.query({
      query: (id) => `get/${id}`,
      providesTags: ["Jobs"],
    }),
    deleteJobs: builder.mutation({
      query: (ids) => ({
        url: "/delete",
        method: "DELETE",
        body: ids,
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: ["Jobs"],
    }),
    updateJob: builder.mutation({
      query: (data) => ({
        url: "/update",
        method: "PATCH",
        body: data,
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: ["Jobs"],
    }),
  }),
});

export const {
  useCreateJobMutation,
  useGetJobsQuery,
  useGetJobByIdQuery,
  useDeleteJobsMutation,
  useUpdateJobMutation
} = jobApi;
