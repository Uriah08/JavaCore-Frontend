import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { symbols } from "@/schema";

interface SelectedComponent {
  id: string;
  routeComponentID: string;
}

interface SeverityHistoryProps {
  isLoading: boolean;
  selectedComponent: SelectedComponent | null;
}

const SeverityHistorySection: React.FC<SeverityHistoryProps> = ({
  isLoading,
  selectedComponent,
}) => {
  // Map severity labels → image filenames
  const severityMap: Record<string, string> = Object.fromEntries(
    symbols.map((s) => [s.label, `${s.image}.png`])
  );

  // For now, use static mock data instead of API
  const comments = selectedComponent
    ? [
        { severity: "Normal" },
        { severity: "Moderate" },
        { severity: "Severe" },
        { severity: "Critical" },
        { severity: "Missed Points" },
      ]
    : [];

  return (
    <div className="border rounded-lg flex overflow-auto">
      {Array.from({ length: 10 }).map((_, index) => {
        const comment = comments[index] || null;

        return (
          <div key={index} className="flex flex-col border-r w-full">
            <h1 className="text-sm font-semibold text-zinc-800 px-3 py-1 text-center border-b">
              {index === 0 ? "Current" : "Previous"}
            </h1>
            <div className="flex justify-center items-center py-1">
              {isLoading ? (
                <Skeleton className="w-5 h-5 animate-pulse bg-zinc-200" />
              ) : comment ? (
                <img
                  src={`/severity/${severityMap[comment.severity]}`}
                  width={30}
                  height={30}
                  alt="Severity Symbol"
                  className="w-5 object-cover"
                />
              ) : (
                <div className="w-5 h-5" />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SeverityHistorySection;
