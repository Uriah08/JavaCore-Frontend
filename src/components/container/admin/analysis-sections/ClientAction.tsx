import React from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { Input } from "@/components/ui/input"

// Dummy data for client action
const dummyActions = [
  {
    woNumber: "WO-12345",
    createdAt: new Date().toISOString(),
    action: "Replaced faulty component and tested functionality.",
  },
  {
    woNumber: "WO-12344",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    action: "Performed routine maintenance check.",
  },
]

interface ClientActionSectionProps {
  isLoading: boolean
  clientId?: string
  componentId?: string
}

const ClientActionSection: React.FC<ClientActionSectionProps> = ({
  isLoading,
  clientId,
  componentId,
}) => {
  // Use dummy data if both clientId and componentId exist
  const data = clientId && componentId ? dummyActions : []

  const latestAction = data[0] || null
  const latestDate = latestAction
    ? new Date(latestAction.createdAt).toLocaleDateString()
    : "No date available"

  const showLoading = isLoading

  return (
    <div className="flex flex-col gap-3 mt-3 border border-main rounded-lg overflow-hidden">
      <h1 className="text-lg font-semibold bg-main text-white px-4 py-2">
        Client&apos;s Action and WO Number
      </h1>
      <div className="p-3 flex flex-col h-full">
        <h1 className="font-semibold">WO Number</h1>
        {showLoading ? (
          <Skeleton
            className="w-full h-[25px] animate-pulse bg-zinc-200 rounded-md"
            style={{ animationDelay: `0.2s` }}
          />
        ) : (
          <Input
            readOnly
            placeholder="Client WO Number"
            className="mt-2 text-sm"
            value={latestAction?.woNumber || "No available WO Number"}
          />
        )}
        <div className="flex justify-between items-center mt-5">
          <h1 className="font-semibold">Latest Action</h1>
          <h1 className="text-xs text-white bg-main px-3 py-1 rounded-md cursor-pointer hover:opacity-80 transition">
            {latestDate}
          </h1>
        </div>
        {showLoading ? (
          <Skeleton
            className="w-full h-[25px] animate-pulse bg-zinc-200 rounded-md"
            style={{ animationDelay: `0.2s` }}
          />
        ) : (
          <div className="border rounded-lg p-3 mt-2 max-h-[130px] overflow-auto">
            <p className="text-sm text-zinc-600 indent-10">
              {latestAction?.action || "No action recorded."}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ClientActionSection
