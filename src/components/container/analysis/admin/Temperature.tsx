"use client";

import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { toast } from "sonner";

interface SelectedComponent {
  id: string;
  routeComponentID: string;
}

interface TemperatureSectionProps {
  isLoading: boolean;
  selectedComponent: SelectedComponent | null;
}

const Temperature: React.FC<TemperatureSectionProps> = ({
  isLoading,
  selectedComponent,
}) => {
  const [openTemperature, setOpenTemperature] = React.useState(false);

  const handleOpen = () => {
    if (!selectedComponent) {
      toast.error("Select Component First!", {
        description: "No component selected.",
      });
      return;
    }
    setOpenTemperature(true);
  };

  // Dummy temperatures
  const temperatures = selectedComponent
    ? [
        { temperature: 25 },
        { temperature: 24 },
        { temperature: 23 },
        { temperature: 22 },
        { temperature: 21 },
      ]
    : [];

  const showLoading = isLoading;

  const formatTemperature = (temp: number, unit: "C" | "F" = "C") =>
    unit === "C" ? `${temp}°C` : `${(temp * 9) / 5 + 32}°F`;

  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="flex justify-between items-center">
        <h1 className="text-sm font-medium">Temperature Record</h1>
        <Dialog open={openTemperature} onOpenChange={setOpenTemperature}>
          <Button
            onClick={handleOpen}
            type="button"
            className="w-auto font-normal text-sm cursor-text"
            variant={"outline"}
          >
            Add new Temp
          </Button>

          {openTemperature && (
            <div className="p-4 border rounded-lg bg-white shadow-md">
              <h2 className="font-semibold text-zinc-800">Add Temperature</h2>
              <p className="text-sm text-zinc-600 mt-2">
                Dummy dialog content here.
              </p>
              <Button
                onClick={() => setOpenTemperature(false)}
                className="mt-4"
              >
                Close
              </Button>
            </div>
          )}
        </Dialog>
      </div>

      <div className="border rounded-lg flex overflow-auto">
        {Array.from({ length: 5 }).map((_, index) => {
          const temp = temperatures[index] || null;

          return (
            <div key={index} className="flex flex-col border-r w-full">
              <h1 className="text-sm font-semibold text-zinc-800 px-3 py-1 text-center border-b">
                {index === 0 ? "Current" : "Previous"}
              </h1>
              <div className="flex justify-center items-center py-1">
                {showLoading ? (
                  <Skeleton className="w-5 h-5 animate-pulse bg-zinc-200" />
                ) : temp ? (
                  <p className="text-center">
                    {formatTemperature(temp.temperature, "C")}
                  </p>
                ) : (
                  <div className="w-5 h-5" />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Temperature;
