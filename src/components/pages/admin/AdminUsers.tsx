"use client";

import React from "react";
import { useAuthContext } from "@/context/AuthProvider"; 
import SidebarLayout from "./SidebarLayout";

import ChangePassword from "@/components/container/admin/forms/manage-user-forms/ChangePassword";
import RegisterClient from "@/components/container/admin/forms/manage-user-forms/RegisterClient";
import VerifyClients from "@/components/container/admin/forms/manage-user-forms/VerifyClient";

const AdminUsers = () => {
  const { authUser } = useAuthContext();

  return (
    <SidebarLayout>
      <div className="w-full p-3 sm:p-5 flex flex-col xl:flex-row gap-3 sm:gap-5">
        <div className="flex flex-col w-full xl:w-2/3 gap-3 sm:gap-5">
          <div className="rounded-xl bg-white flex flex-col p-5 shadow-lg ">
            <h1 className="text-2xl sm:text-2xl font-bold">User Management</h1>
            <div className="flex lg:flex-row flex-col gap-3 lg:items-center mt-5">
              <h1 className="text-main text-2xl sm:text-3xl font-bold">
                {authUser?.email || "No Email"}
              </h1>
              <h1 className="bg-main px-3 py-1 font-semibold text-white rounded-full w-fit">
                {authUser?.role || "No Role"}
              </h1>
            </div>
            <h1 className="text-2xl text-main">{authUser?.id || "No Name"}</h1>
          </div>

          <div className="rounded-xl bg-white flex flex-col p-5 shadow-lg">
            <h1 className="text-xl sm:text-2xl font-bold">Change password</h1>
            <ChangePassword />
          </div>
        </div>

        <div className="w-full xl:w-1/3 flex flex-col gap-3 sm:gap-5">
          <div className="rounded-xl bg-white p-5 shadow-lg h-fit flex flex-col w-full">
            <h1 className="text-xl sm:text-2xl font-bold">Register Client</h1>
            <RegisterClient />
          </div>
          <div className="rounded-xl bg-white p-5 shadow-lg h-fit flex flex-col w-full">
            <h1 className="text-xl sm:text-2xl font-bold">Verify Client</h1>
            <VerifyClients />
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
};

export default AdminUsers;
