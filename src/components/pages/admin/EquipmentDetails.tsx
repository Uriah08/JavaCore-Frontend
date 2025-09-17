// import { Plus, Edit, Trash } from "lucide-react";

import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
// import Details from "../dialogs/Details";
import { toast } from "sonner";

interface SelectedJob {
  user?: {
    id?: string;
    name?: string;
  };
}

interface SelectedComponent {
  id: string;
  routeComponentID: string;
}

interface EquipmentDetailsSectionProps {
  isLoading: boolean;
  selectedComponent: SelectedComponent | null;
  selectedJob: SelectedJob | null;
}

const EquipmentDetails: React.FC<EquipmentDetailsSectionProps> = ({
  //   isLoading,
  selectedComponent,
  //   selectedJob,
}) => {
  const [openDetails, setOpenDetails] = React.useState(false);

  const handleOpen = () => {
    if (!selectedComponent) {
      toast.error("Select Component First!", {
        description: "No component selected.",
      });
      return;
    }
    setOpenDetails(true);
  };

  return (
    <div className="flex flex-col gap-3 w-full md:w-1/2">
      <h1 className="text-sm font-medium">Equipment Mechanical Details</h1>
      <Dialog open={openDetails} onOpenChange={setOpenDetails}>
        <Button
          onClick={handleOpen}
          type="button"
          className="w-auto font-normal text-sm cursor-text bg-main text-white hover:bg-follow hover:text-white"
          variant={"outline"}
        >
          View Mechanical Details
        </Button>
        {openDetails && (
          //   <Details
          //     isLoading={isLoading}
          //     selectedComponent={selectedComponent}
          //     selectedJob={selectedJob}
          //   />
          <div className="p-4">
            <p className="text-sm text-zinc-600">Comment dialog here...</p>
          </div>
        )}
      </Dialog>
    </div>
  );
};

export default EquipmentDetails;
