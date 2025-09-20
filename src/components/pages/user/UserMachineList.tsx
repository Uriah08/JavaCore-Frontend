import List from '@/components/container/list/machine-list/List'
import SidebarLayout from './SidebarLayout'
import { useGetMachinesCountQuery } from "@/store/machine-list/machine-list-count-api";

const UserMachineList = () => {
  const { data: machines } = useGetMachinesCountQuery();
  return (
    <SidebarLayout>
      <div className="w-full bg-white h-full p-3 sm:p-5 flex xl:flex-row flex-col gap-3 sm:gap-5">
        <div className="w-full xl:w-2/3 p-5 bg-white rounded-xl shadow-lg border">
          <h1 className="text-xl sm:text-2xl font-bold">Machine list</h1>
          <List/>
        </div>
        <div className="w-full xl:w-1/3 xl:sticky xl:top-5 h-full flex flex-col gap-3 sm:gap-5 rounded-xl border">
          {/* Record Count */}
          <div className="bg-white h-full w-full rounded-xl shadow-lg p-5">
            <h1 className="text-lg sm:text-2xl font-bold">Record Count</h1>
            <div className="grid grid-cols-1 gap-3 mt-3">
              <div className="flex flex-col gap-3 bg-main p-3 rounded-lg">
                <h1 className="text-lg font-semibold text-white">Areas</h1>
                <h1 className="text-4xl font-bold text-white">
                  {machines?.areas || 0}
                </h1>
              </div>
              <div className="flex flex-col gap-3 bg-main p-3 rounded-lg">
                <h1 className="text-lg font-semibold text-white">
                  Equipment Group
                </h1>
                <h1 className="text-4xl font-bold text-white">
                  {machines?.equipmentGroup || 0}
                </h1>
              </div>
              <div className="flex flex-col gap-3 bg-main p-3 rounded-lg">
                <h1 className="text-lg font-semibold text-white">Equipments</h1>
                <h1 className="text-4xl font-bold text-white">
                  {machines?.equipmentName || 0}
                </h1>
              </div>
              <div className="flex flex-col gap-3 bg-main p-3 rounded-lg">
                <h1 className="text-lg font-semibold text-white">Components</h1>
                <h1 className="text-4xl font-bold text-white">
                  {machines?.components || 0}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SidebarLayout>
  )
}

export default UserMachineList