import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { symbols } from "@/schema";

// Dummy comments
const dummyComments = [
  {
    severity: "Critical",
    createdAt: new Date().toISOString(),
    comment: "This is the most recent issue. Needs urgent attention.",
  },
  {
    severity: "Moderate",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // yesterday
    comment: "This was reported yesterday, moderate issue found.",
  },
];

interface SelectedComponent {
  id: string;
  routeComponentID: string;
}

interface CommentsSectionProps {
  isLoading: boolean;
  selectedComponent: SelectedComponent | null;
}

const CommentsSection: React.FC<CommentsSectionProps> = ({
  isLoading,
  selectedComponent,
}) => {
  const [openComment, setOpenComment] = React.useState(false);

  const severityMap: Record<string, string> = Object.fromEntries(
    symbols.map((s) => [s.label, `${s.image}.png`])
  );

  const comments = selectedComponent ? dummyComments : [];

  const sortedComments = [...comments].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const latestComment = sortedComments[0] || null;
  const previousComment = sortedComments[1] || null;

  const handleOpen = () => {
    if (!selectedComponent) {
      alert("Select Component First!"); // replaced toast with alert
      return;
    }
    setOpenComment(true);
  };

  return (
    <div className="flex flex-col gap-3 mt-3 border border-main rounded-lg overflow-hidden">
      <h1 className="text-lg font-semibold bg-main text-white px-4 py-2">
        Comments
      </h1>
      <div className="w-full p-3 flex flex-col gap-5">
        <div className="flex flex-col md:flex-row gap-5">
          {/* Current Comment */}
          <div className="flex-1 flex flex-col gap-2">
            <h1 className="font-medium">Current Comment</h1>
            <div className="p-3 border rounded-lg">
              {isLoading ? (
                <Skeleton className="w-full h-[25px] animate-pulse bg-zinc-200 rounded-md" />
              ) : latestComment ? (
                <>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <img
                        src={`/severity/${
                          severityMap[latestComment.severity] || "N.png"
                        }`}
                        width={20}
                        height={20}
                        alt="Symbol"
                        className="w-5 object-cover"
                      />
                      <h1 className="text-sm text-zinc-600">
                        {latestComment.severity}
                      </h1>
                    </div>
                    <h1 className="text-xs text-zinc-500">
                      {new Date(latestComment.createdAt).toLocaleDateString()}
                    </h1>
                  </div>
                  <p className="text-sm text-zinc-700 mt-3">
                    {latestComment.comment}
                  </p>
                </>
              ) : (
                <p className="text-sm text-zinc-400">No comments available.</p>
              )}
            </div>
          </div>

          {/* Previous Comment */}
          <div className="flex-1 flex flex-col gap-2">
            <h1 className="font-medium">Previous Comment</h1>
            <div className="p-3 border rounded-lg">
              {isLoading ? (
                <Skeleton className="w-full h-[25px] animate-pulse bg-zinc-200 rounded-md" />
              ) : previousComment ? (
                <>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <img
                        src={`/severity/${
                          severityMap[previousComment.severity] || "N.png"
                        }`}
                        width={20}
                        height={20}
                        alt="Symbol"
                        className="w-5 object-cover"
                      />
                      <h1 className="text-sm text-zinc-600">
                        {previousComment.severity}
                      </h1>
                    </div>
                    <h1 className="text-xs text-zinc-500">
                      {new Date(previousComment.createdAt).toLocaleDateString()}
                    </h1>
                  </div>
                  <p className="text-sm text-zinc-700 mt-3">
                    {previousComment.comment}
                  </p>
                </>
              ) : (
                <p className="text-sm text-zinc-400">
                  No previous comments available.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Comment Button & Dialog */}
        <Dialog open={openComment} onOpenChange={setOpenComment}>
          <Button
            onClick={handleOpen}
            type="button"
            className="w-full font-normal text-sm justify-start cursor-text"
            variant={"outline"}
          >
            Write a comment...
          </Button>
          {openComment && (
            <div className="p-4">
              <p className="text-sm text-zinc-600">Comment dialog here...</p>
            </div>
          )}
        </Dialog>
      </div>
    </div>
  );
};

export default CommentsSection;
