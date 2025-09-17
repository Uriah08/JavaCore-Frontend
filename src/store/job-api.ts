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
        url: "create",
        method: "POST",
        body: jobData, 
      }),
      invalidatesTags: ["Jobs"],
    }),

    getJobs: builder.query({
      query: () => "get",
      providesTags: ["Jobs"],
    }),

    getJobById: builder.query({
      query: (id: string) => `get/${id}`,
      providesTags: (result, error, id) => [{ type: "Jobs", id }],
    }),

    deleteJobs: builder.mutation({
      query: (ids: string[]) => ({
        url: "delete",
        method: "POST",
        body: { id: ids },
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
} = jobApi;
