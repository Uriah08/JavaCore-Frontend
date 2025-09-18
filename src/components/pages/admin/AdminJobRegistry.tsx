import SidebarLayout from "./SidebarLayout";
import { BookmarkCheck, Route, WalletCards } from "lucide-react";
import AnalogClock from "@/components/ui/clock";
import { DataTable } from "@/components/container/tables/job-registry/data-table";
import { useColumns } from "@/components/container/tables/job-registry/columns";
import { useGetJobsQuery } from "@/store/job-api";
import { WaveChart } from "@/components/container/charts/date-surveryed-chart";
import { Skeleton } from "@/components/ui/skeleton";
import { PieCharts } from "@/components/container/charts/pie-chart";

const AdminJobRegistry = () => {
  const columns = useColumns();
  const { data, isLoading: jobsLoading } = useGetJobsQuery();
  const jobsData = data?.jobs ?? []

  const chart1 = jobsData.map((job) => job.dateSurveyed).filter((date) => date);
  const chart2 = jobsData.map((job) => job.status).filter((status) => status);

  const finishedJobs = jobsData.filter((job) => job.dateFinished);

  const recentJobs = [...(data?.jobs || [])]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 3);
  
  // dummy data muna
  // const jobs = [
  //   {
  //     id: 1,
  //     user: { name: "Bornok" },
  //     jobDescription: "Pump inspection",
  //     status: "Waiting for Analysis",
  //     createdAt: "2025-09-10",
  //   },
  //   {
  //     id: 2,
  //     user: { name: "kengkoy" },
  //     jobDescription: "Gearbox test",
  //     status: "Being Analysed",
  //     createdAt: "2025-09-14",
  //   },
  //   {
  //     id: 3,
  //     user: { name: "joburat" },
  //     jobDescription: "Vibration check",
  //     status: "Finished",
  //     createdAt: "2025-09-15",
  //   },
  // ];

  const routes = [
    { id: 1, routeName: "Route A" },
    { id: 2, routeName: "Route B" },
  ];

  // const finishedJobs = jobs.filter((j) => j.status === "Finished");

  return (
    <SidebarLayout>
      <div className="w-full p-3 sm:p-5 flex xl:flex-row flex-col gap-3 sm:gap-5">
        {/* Left column */}
        <div className="w-full xl:w-2/3 h-full gap-3 sm:gap-5 flex flex-col">
          <div className="w-full h-full p-5 bg-white rounded-xl flex flex-col shadow-lg">
            <h1 className="text-xl sm:text-2xl font-bold">Job Registry</h1>
            <DataTable columns={columns} data={jobsData} loading={jobsLoading}/>
          </div>

          {jobsLoading ? (
            <Skeleton className="w-full h-[320px] shadow-lg" />
          ) : (
            <WaveChart chartDatas={chart1} />
          )}

          <div className="flex md:flex-row flex-col gap-3 sm:gap-5">
            {jobsLoading ? (
              <>
                <Skeleton className="md:w-1/2 w-full h-[400px] shadow-lg" />
                <Skeleton className="md:w-1/2 w-full h-[400px] shadow-lg" />
              </>
            ) : (
              <>
                <PieCharts chartDatas={chart2} />
                {/* <BarCharts data={severities}/> */}
              </>
            )}
          </div>
        </div>

        {/* Right column */}
        <div className="w-full xl:w-1/3 xl:sticky xl:top-5 h-full flex flex-col gap-3 sm:gap-5">
          {/* Clock */}
          <div className="bg-main h-[200px] w-full rounded-xl shadow-lg flex items-center justify-center flex-col">
            <AnalogClock />
          </div>

          {/* Job counts */}
          <div className="w-full rounded-xl bg-white flex flex-col justify-end p-5 gap-3 shadow-lg">
            <h1 className="text-base sm:text-xl font-semibold text-black">
              Job Counts
            </h1>
            <div className="flex gap-3 sm:gap-5">
              <div className="bg-main rounded-lg w-1/2 h-[100px] p-3">
                <div className="flex flex-col gap-5">
                  <div className="flex gap-3 items-center">
                    <WalletCards className="bg-white text-main p-1 rounded-md" />
                    <h1 className="text-white font-semibold">Total</h1>
                  </div>
                  <h1 className="text-white font-bold text-3xl">
                    {jobsData.length || 0}
                  </h1>
                </div>
              </div>
              <div className="bg-main rounded-lg w-1/2 h-[100px] p-3">
                <div className="flex flex-col gap-5">
                  <div className="flex gap-3 items-center">
                    <BookmarkCheck className="bg-white text-main p-1 rounded-md" />
                    <h1 className="text-white font-semibold">Finished</h1>
                  </div>
                  <h1 className="text-white font-bold text-3xl">
                    {finishedJobs.length}
                  </h1>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full rounded-xl bg-white flex flex-col justify-end p-5 gap-5 shadow-lg max-h-[500px]">
          <h1 className="text-base sm:text-xl font-semibold text-black mb-3">
            Recent Clients
          </h1>
          {jobsLoading ? (
            <>
              <Skeleton className="w-full h-[50px]" />
              <Skeleton className="w-full h-[50px]" />
              <Skeleton className="w-full h-[50px]" />
            </>
          ) : (
            recentJobs.map((job) => (
              <div key={job.id} className="flex justify-between relative">
                <div
                  className={`h-full absolute w-1 ${
                    job.status === "Waiting for Analysis"
                      ? "bg-red-500"
                      : job.status === "Being Analysed"
                      ? "bg-orange-500"
                      : job.status === "Being Reviewed"
                      ? "bg-yellow-500"
                      : "bg-green-500"
                  } rounded-s-sm`}
                />
                <div
                  className={`absolute rounded-lg left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 h-[20px] max-w-[200px] w-full bg-opacity-30 
                ${
                  job.status === "Waiting for Analysis"
                    ? "bg-red-500"
                    : job.status === "Being Analysed"
                    ? "bg-orange-500"
                    : job.status === "Being Reviewed"
                    ? "bg-yellow-500"
                    : "bg-green-500"
                }`}
                />
                <div className="flex flex-col ml-3 z-10">
                  <h1 className="font-semibold">{job.user.name}</h1>
                  <p className="text-zinc-600 text-sm">{job.jobDescription}</p>
                </div>
                <h1 className="text-xs text-zinc-600">
                  {new Date(job.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </h1>
              </div>
            ))
          )}
        </div>

          {/* Recent routes */}
          <div className="bg-white h-2/3 w-full rounded-xl shadow-lg p-5">
            <h1 className="text-base sm:text-xl font-semibold text-black mb-3">
              Recent Routes
            </h1>
            <div className="flex flex-col gap-3 mt-5">
              {routes.map((route) => (
                <div
                  key={route.id}
                  className="flex gap-3 border rounded-md p-2"
                >
                  <Route
                    size={24}
                    className="text-white bg-main rounded-md p-1"
                  />
                  <h1 className="text-lg font-semibold">{route.routeName}</h1>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
};

export default AdminJobRegistry;
