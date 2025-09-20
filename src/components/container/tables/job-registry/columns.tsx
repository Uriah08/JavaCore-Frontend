"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ArrowUpDown } from "lucide-react";

import { Checkbox } from "@/components/ui/checkbox";

import { type ExtendedJob } from "@/lib/types";
import { useAuthContext } from "@/context/AuthProvider";
import { Dialog } from "@/components/ui/dialog";
import Analyst from "../../dialogs/Analyst";
import { useState } from "react";
import Status from "../../dialogs/Status";
import Reviewer from "../../dialogs/Reviewer";
import { toast } from "sonner";
// import React from "react";
// import Reviewer from "../../dialogs/Reviewer";
// import Status from "../../dialogs/Status";

// import { useSession } from "next-auth/react";
// import ExportClient from "../../dialogs/client/ExportClient";
// import { selectedJob } from "@/schema";

// import { useRouter } from "next/navigation";

export const useColumns = () => {
  const { authUser } = useAuthContext();
//   const { data: session } = useSession();

//   const router = useRouter();

  const columns: ColumnDef<ExtendedJob>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          className="mx-2 bg-white border-main data-[state=checked]:bg-[#b70000] data-[state=checked]:border-zinc-200 data-[state=checked]:text-white"
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          className="mx-2 border-main data-[state=checked]:bg-[#b70000] data-[state=checked]:border-zinc-200 data-[state=checked]:text-white"
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "no",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="hover:bg-follow hover:text-white"
          >
            No
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const no = row.getValue("no") as string;
        return <div className="flex justify-center">{no}</div>;
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string;

        const bgColor =
          status === "Waiting for Analysis"
            ? "bg-red-500"
            : status === "Being Analysed"
            ? "bg-orange-500"
            : status === "Being Reviewed"
            ? "bg-yellow-500"
            : "bg-green-500";
        return (
          <div
            className={`w-fit h-full p-2 rounded-full mx-auto ${bgColor}`}
          ></div>
        );
      },
    },
    {
      id: "user",
      accessorKey: "user",
      accessorFn: (row) => row.user?.name || null,
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className={`hover:bg-follow hover:text-white ${authUser?.role !== "admin" && "hidden"}`}
          >
            Client
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        );
      },
      filterFn: (row, columnId, value) => {
        const rowValue = row.getValue(columnId) as string;
        return rowValue.toLowerCase().includes(value.toLowerCase());
      },
      cell: ({ row }) => {
        return <div className={`flex ml-4 ${authUser?.role !== "admin" && "hidden"}`}>{row.original.user?.name || ''}</div>;
      },
    },
    {
      accessorKey: "area",
      header: "Area",
      cell: ({ row }) => {
        const area = row.getValue("area") as string;
        return (
          <h1 className="whitespace-nowrap overflow-hidden text-ellipsis">
            {area}
          </h1>
        );
      },
    },
    {
      accessorKey: "dateSurveyed",
      header: () => <div className="whitespace-nowrap">Date Surveyed</div>,
      cell: ({ row }) => {
        const dateSurveyed = row.getValue("dateSurveyed") as string;
        const formattedDate = new Date(dateSurveyed).toLocaleDateString(
          "en-US",
          {
            month: "short",
            day: "numeric",
            year: "numeric",
          }
        );
        return (
          <h1 className="whitespace-nowrap overflow-hidden text-ellipsis">
            {formattedDate}
          </h1>
        );
      },
    },
    {
      accessorKey: "jobNumber",
      header: () => <div className="whitespace-nowrap">Job Number</div>,
    },
    {
      accessorKey: "poNumber",
      header: () => <div className="whitespace-nowrap">PO Number</div>,
    },
    {
      accessorKey: "woNumber",
      header: () => <div className="whitespace-nowrap">WO Number</div>,
    },
    {
      accessorKey: "reportNumber",
      header: () => <div className="whitespace-nowrap">Report Number</div>,
    },
    {
      accessorKey: "jobDescription",
      header: () => <div className="whitespace-nowrap">Job Description</div>,
      cell: ({ row }) => {
        const jobDescription = row.getValue("jobDescription") as string;
        return (
          <h1 className="whitespace-nowrap overflow-hidden text-ellipsis">
            {jobDescription.length > 40
              ? `${jobDescription.substring(0, 37)}...`
              : jobDescription}
          </h1>
        );
      },
    },
    {
      accessorKey: "method",
      header: "Method",
      cell: ({ row }) => {
        const method = row.getValue("method") as string;
        return (
          <h1 className="whitespace-nowrap overflow-hidden text-ellipsis">
            {method}
          </h1>
        );
      },
    },
    {
      accessorKey: "inspector",
      header: "Inspector",
      cell: ({ row }) => {
        const inspector = row.getValue("inspector") as string;
        return (
          <h1 className="whitespace-nowrap overflow-hidden text-ellipsis">
            {inspector}
          </h1>
        );
      },
    },
    {
      accessorKey: "analyst",
      header: "Analyst",
      cell: ({ row }) => {
        const analyst = row.getValue("analyst") as string;
        return (
          <h1 className="whitespace-nowrap overflow-hidden text-ellipsis">
            {analyst || "N/A"}
          </h1>
        );
      },
    },
    {
      accessorKey: "reviewer",
      header: "Reviewer",
      cell: ({ row }) => {
        const reviewer = row.getValue("reviewer") as string;
        return (
          <h1 className="whitespace-nowrap overflow-hidden text-ellipsis">
            {reviewer || "N/A"}
          </h1>
        );
      },
    },
    {
      accessorKey: "dateFinished",
      header: () => <div className="whitespace-nowrap">Date Finished</div>,
      cell: ({ row }) => {
        const dateFinished = row.getValue("dateFinished") as string;

        if (!dateFinished) {
          return (
            <h1 className="whitespace-nowrap overflow-hidden text-ellipsis">
              Not Finished
            </h1>
          );
        }

        const formattedDate = new Date(dateFinished).toLocaleDateString(
          "en-US",
          {
            month: "short",
            day: "numeric",
            year: "numeric",
          }
        );
        return (
          <h1 className="whitespace-nowrap overflow-hidden text-ellipsis">
            {formattedDate}
          </h1>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const job = row.original;

        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [dialogState, setDialogState] = useState<{
          [key: string]: boolean;
        }>({
          analyst: false,
          reviewer: false,
          status: false,
          export: false,
        });

        const openDialog = (key: string) =>
          setDialogState((prev) => ({ ...prev, [key]: true }));
        const closeDialog = (key: string) =>
          setDialogState((prev) => ({ ...prev, [key]: false }));

        // const transformedJob: Job = {
        //   jobNumber: job.jobNumber,
        //   area: job.area ?? "",
        //   user: job.user ? { id: job.user.id, name: job.user.name } : undefined,
        //   yearWeekNumber: job.yearWeekNumber,
        //   reviewer: job.reviewer ?? null,
        //   poNumber: job.poNumber ?? null,
        //   woNumber: job.woNumber ?? null,
        //   reportNumber: job.reportNumber ?? null,
        //   inspectionRoute: job.inspectionRoute,
        //   jobDescription: job.jobDescription,
        //   dateSurveyed: job.dateSurveyed,
        //   routeList: job.routeList
        //     ? {
        //         routeName: job.routeList.routeName,
        //         machines: job.routeList.machines.map((machine) => ({
        //           id: machine.id,
        //         })),
        //       }
        //     : undefined,
        // };

        // const viewAnalysis = () => {
        //   localStorage.setItem("jobNo", job.jobNumber);
        //   router.push("/analysis-report");
        // };

        return (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0 cursor-pointer">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem
                  onClick={() => {navigator.clipboard.writeText(job.jobNumber); toast("Job Number Copied!")}}
                >
                  Copy Job Number
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                onClick={() => openDialog("analyst")}
                className={`${authUser?.role !== "admin" && "hidden"}`}
                >
                  Assign Analyst
                </DropdownMenuItem>
                <DropdownMenuItem 
                onClick={() => openDialog("reviewer")}
                className={`${authUser?.role !== "admin" && "hidden"}`}
                >
                  Assign Reviewer
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => openDialog("status")}
                  className={`${authUser?.role !== "admin" && "hidden"}`}
                >
                  Update Status
                </DropdownMenuItem>
                <DropdownMenuItem
                >
                  View Analysis
                </DropdownMenuItem>
                <DropdownMenuItem
                //   onClick={() => openDialog("export")}
                >
                  Export Report
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Dialog Components */}
            <Dialog
              open={dialogState.analyst}
              onOpenChange={() => closeDialog("analyst")}
            >
              <Analyst
                onClose={() => closeDialog("analyst")}
                id={job.id}
                defaultAnalyst={job.analyst || "None"}
              />
            </Dialog>
            <Dialog
              open={dialogState.reviewer}
              onOpenChange={() => closeDialog("reviewer")}
            >
              <Reviewer
                onClose={() => closeDialog("reviewer")}
                id={job.id}
                defaultReviewer={job.reviewer || "None"}
              />
            </Dialog>
            <Dialog
              open={dialogState.status}
              onOpenChange={() => closeDialog("status")}
            >
              <Status
                onClose={() => closeDialog("status")}
                id={job.id}
                defaultStatus={job.status}
                route={job.inspectionRoute}
              />
            </Dialog>
            {/* <Dialog
              aria-describedby={undefined}
              open={dialogState.export}
              onOpenChange={() => closeDialog("export")}
            >
              <ExportClient
                onClose={() => closeDialog("export")}
                data={transformedJob}
              />
            </Dialog> */}
          </>
        );
      },
    },
  ];
  return authUser?.role === "user"
    ? columns.filter((col) => col.id !== "select")
    : columns
};