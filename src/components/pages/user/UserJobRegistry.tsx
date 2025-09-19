import { DataTable } from "@/components/container/tables/job-registry/data-table";
import SidebarLayout from "./SidebarLayout";
import { useUserJobQuery } from "@/store/job-api";
import { useColumns } from "@/components/container/tables/job-registry/columns";
import { WaveChart } from "@/components/container/charts/date-surveryed-chart";
import { Skeleton } from "@/components/ui/skeleton";
import { PieCharts } from "@/components/container/charts/pie-chart";

const UserJobRegistry = () => {
  const columns = useColumns();
  const { data, isLoading: jobsLoading } = useUserJobQuery();
  const jobsData = data?.jobs ?? []
  const chart1 = jobsData.map((job) => job.dateSurveyed).filter((date) => date);
  const chart2 = jobsData.map((job) => job.status).filter((status) => status);
  
  return (
    <SidebarLayout>
      <div className="w-full p-3 sm:p-5 flex xl:flex-row flex-col gap-3 sm:gap-5">
        <div className="w-full h-full gap-3 sm:gap-5 flex flex-col">
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
      </div>
    </SidebarLayout>
  )
}

export default UserJobRegistry