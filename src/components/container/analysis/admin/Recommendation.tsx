import React from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { Dialog } from "@/components/ui/dialog"

// Dummy recommendations using P1–P6 scale
const dummyRecommendations = [
  {
    priority: "P1",
    createdAt: new Date().toISOString(),
    recommendation: "Immediate action is recommended.",
  },
  {
    priority: "P2",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // yesterday
    recommendation: "Action within a week is recommended.",
  },
  {
    priority: "P3",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days ago
    recommendation: "Action within a fortnight is recommended.",
  },
  {
    priority: "P4",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(), // 7 days ago
    recommendation: "Action within a month is recommended.",
  },
  {
    priority: "P5",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(), // 30 days ago
    recommendation: "Planned maintenance, approximately within 3 months is recommended.",
  },
  {
    priority: "P6",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 60).toISOString(), // 60 days ago
    recommendation: "No action is required.",
  },
]

interface SelectedComponent {
  id: string
  routeComponentID: string
}

interface RecommendationsSectionProps {
  isLoading: boolean
  selectedComponent: SelectedComponent | null
}

const RecommendationSection: React.FC<RecommendationsSectionProps> = ({
  isLoading,
  selectedComponent,
}) => {
  const [openRecommendation, setOpenRecommendation] = React.useState(false)

  const handleOpen = () => {
    if (!selectedComponent) {
      alert("Select Component First!") // replaced toast
      return
    }
    setOpenRecommendation(true)
  }

  const recommendations = selectedComponent ? dummyRecommendations : []

  const sortedRecommendations = [...recommendations].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )

  const latestRecommendation = sortedRecommendations[0] || null
  const previousRecommendation = sortedRecommendations[1] || null

  const showLoading = isLoading

  return (
    <div className="flex flex-col gap-3 mt-3 border border-main rounded-lg overflow-hidden">
      <h1 className="text-lg font-semibold bg-main text-white px-4 py-2">
        Recommendation
      </h1>
      <div className="w-full p-3 flex flex-col gap-5">
        <div className="flex flex-col md:flex-row gap-5">
          {/* Current Recommendation */}
          <div className="flex-1 flex flex-col gap-2">
            <h1 className="font-medium">Current Recommendation</h1>
            <div className="p-3 border rounded-lg">
              {showLoading ? (
                <Skeleton className="w-full h-[25px] animate-pulse bg-zinc-200 rounded-md" />
              ) : latestRecommendation ? (
                <>
                  <div className="flex justify-between items-center">
                    <h1 className="font-bold">{latestRecommendation.priority}</h1>
                    <h1 className="text-xs text-zinc-500">
                      {new Date(latestRecommendation.createdAt).toLocaleDateString()}
                    </h1>
                  </div>
                  <p className="text-sm text-zinc-700 mt-3">
                    {latestRecommendation.recommendation}
                  </p>
                </>
              ) : (
                <p className="text-sm text-zinc-400">No recommendations available.</p>
              )}
            </div>
          </div>

          {/* Previous Recommendation */}
          <div className="flex-1 flex flex-col gap-2">
            <h1 className="font-medium">Previous Recommendation</h1>
            <div className="p-3 border rounded-lg">
              {showLoading ? (
                <Skeleton className="w-full h-[25px] animate-pulse bg-zinc-200 rounded-md" />
              ) : previousRecommendation ? (
                <>
                  <div className="flex justify-between items-center">
                    <h1 className="font-bold">{previousRecommendation.priority}</h1>
                    <h1 className="text-xs text-zinc-500">
                      {new Date(previousRecommendation.createdAt).toLocaleDateString()}
                    </h1>
                  </div>
                  <p className="text-sm text-zinc-700 mt-3">
                    {previousRecommendation.recommendation}
                  </p>
                </>
              ) : (
                <p className="text-sm text-zinc-400">
                  No previous recommendation.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Button & Dialog */}
        <Dialog open={openRecommendation} onOpenChange={setOpenRecommendation}>
          <Button
            onClick={handleOpen}
            type="button"
            className="w-full font-normal text-sm justify-start cursor-text"
            variant={"outline"}
          >
            Write a recommendation...
          </Button>
          {openRecommendation && (
            <div className="p-4">
              <p className="text-sm text-zinc-600">Recommendation dialog here...</p>
            </div>
          )}
        </Dialog>
      </div>
    </div>
  )
}

export default RecommendationSection
