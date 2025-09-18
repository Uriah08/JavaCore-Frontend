"use client";

import { DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
// import { Button } from "@/components/ui/button";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Plus, Edit, Trash } from "lucide-react";
// import React, { useState } from "react";

interface SelectedJob {
  user?: {
    id?: string;
    name?: string;
  };
}

interface SelectedComponent {
  component?: {
    id: string;
    name: string;
  };
}

interface DetailsDialogProps {
  isLoading: boolean;
  selectedComponent: SelectedComponent | null;
  selectedJob: SelectedJob | null;
}

interface ComponentDetail {
  header: string;
  value: string;
}

const Details: React.FC<DetailsDialogProps> = ({
  isLoading,
  selectedComponent,
  selectedJob,
}) => {
  // const [activeDetail, setActiveDetail] = useState<string | null>(null);
  // const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});

  // Pretend IDs (from selected props, but static mock data anyway)
  const componentId = selectedComponent?.component?.id ?? "RC-1001";
  const clientId = selectedJob?.user?.id ?? "USER-001";

  // --- Mocked API replacement ---
  const tableData: ComponentDetail[] = [
    { header: "Component ID", value: componentId },
    { header: "Component Name", value: selectedComponent?.component?.name ?? "Main Switchboard" },
    { header: "Client ID", value: clientId },
    { header: "Client Name", value: selectedJob?.user?.name ?? "John Doe" },
    { header: "Status", value: "Active" },
    { header: "Installed On", value: "2025-09-18" },
  ];

  const showLoading = isLoading;

  return (
    <DialogContent className="border-main rounded-lg p-0 overflow-hidden space-y-0">
      <div>
        <div className="bg-main text-white p-4">
          <DialogTitle className="text-lg">Details</DialogTitle>
        </div>

        <table className="w-full table-auto m-0">
          <tbody>
            {showLoading ? (
              Array.from({ length: 3 }).map((_, index) => (
                <tr key={index} className="border-red-400 border-b">
                  <th className="p-3 text-left bg-red-300 font-normal w-auto">
                    <Skeleton className="w-24 h-5 animate-pulse bg-zinc-200" />
                  </th>
                  <td className="p-3 w-auto min-w-[200px]">
                    <Skeleton className="w-32 h-5 animate-pulse bg-zinc-200" />
                  </td>
                </tr>
              ))
            ) : tableData.length > 0 ? (
              tableData.map((row, index) => (
                <tr key={index} className="border-red-400 border-b">
                  <th className="p-3 text-left bg-red-300 font-normal w-auto">
                    {row.header}
                  </th>
                  <td className="p-3 w-auto min-w-[200px]">{row.value}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={2} className="p-3 text-center text-main">
                  No details available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </DialogContent>
  );
};

export default Details;
