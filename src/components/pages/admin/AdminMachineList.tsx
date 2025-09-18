"use client";

import React from "react";
import List from "@/components/container/list/machine-list/List";
import { Route } from "lucide-react";
import SidebarLayout from "./SidebarLayout";

const AdminMachineList = () => {
  // dummy data
  const machines = {
    areas: 12,
    equipmentGroup: 8,
    equipmentName: 25,
    components: 40,
  };

  const routes = [
    { id: 1, routeName: "Main Plant Inspection" },
    { id: 2, routeName: "Cooling System Check" },
    { id: 3, routeName: "Generator Routine" },
  ];

  return (
    <SidebarLayout>
      <div className="w-full h-full p-3 sm:p-5 flex xl:flex-row flex-col gap-3 sm:gap-5">
        {/* Machine List */}
        <div className="w-full xl:w-2/3 p-5 bg-white rounded-xl shadow-lg">
          <h1 className="text-xl sm:text-2xl font-bold">Machine list</h1>
          <List />
        </div>

        {/* Record Count & Recent Routes */}
        <div className="w-full xl:w-1/3 xl:sticky xl:top-5 h-full flex flex-col gap-3 sm:gap-5">
          {/* Record Count */}
          <div className="bg-white h-2/3 w-full rounded-xl shadow-lg p-5">
            <h1 className="text-lg sm:text-2xl font-bold">Record Count</h1>
            <div className="grid grid-cols-1 gap-3 mt-3">
              <div className="flex flex-col gap-3 bg-main p-3 rounded-lg">
                <h1 className="text-lg font-semibold text-white">Areas</h1>
                <h1 className="text-4xl font-bold text-white">
                  {machines.areas}
                </h1>
              </div>
              <div className="flex flex-col gap-3 bg-main p-3 rounded-lg">
                <h1 className="text-lg font-semibold text-white">
                  Equipment Group
                </h1>
                <h1 className="text-4xl font-bold text-white">
                  {machines.equipmentGroup}
                </h1>
              </div>
              <div className="flex flex-col gap-3 bg-main p-3 rounded-lg">
                <h1 className="text-lg font-semibold text-white">Equipments</h1>
                <h1 className="text-4xl font-bold text-white">
                  {machines.equipmentName}
                </h1>
              </div>
              <div className="flex flex-col gap-3 bg-main p-3 rounded-lg">
                <h1 className="text-lg font-semibold text-white">Components</h1>
                <h1 className="text-4xl font-bold text-white">
                  {machines.components}
                </h1>
              </div>
            </div>
          </div>

          {/* Recent Routes */}
          <div className="bg-white h-2/3 w-full rounded-xl shadow-lg p-5">
            <h1 className="text-lg sm:text-2xl font-bold">Recent Routes</h1>
            <div className="flex flex-col gap-3 mt-5">
              {routes.length > 0 ? (
                routes.map((route) => (
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
                ))
              ) : (
                <h1 className="text-center text-zinc-400 text-sm">
                  No recent routes
                </h1>
              )}
            </div>
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
};

export default AdminMachineList;
