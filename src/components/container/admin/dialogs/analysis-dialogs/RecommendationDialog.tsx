import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { DialogContent, DialogTitle } from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CircleAlert } from "lucide-react";
import { toast } from "sonner";
import { routeComponentRecommendationSchema } from "@/schema";
import { z } from "zod";

interface RecommendationDialogProps {
  routeComponentId: string | undefined;
  onClose: () => void;
}

const RecommendationDialog: React.FC<RecommendationDialogProps> = ({
  routeComponentId,
  onClose,
}) => {
  const [recommendation, setRecommendation] = useState<string>("");
  const [priority, setPriority] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!routeComponentId) {
      toast.error("No component selected.");
      return;
    }

    const payload = {
      routeComponentId,
      priority,
      recommendation,
    };

    try {
      routeComponentRecommendationSchema.parse(payload);

      // mock async request
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success("Recommendation added successfully.");
      setRecommendation("");
      setPriority("");
      onClose();
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(
          error.issues.map((e) => e.message).join(", ") ||
            "Validation error occurred."
        );
      } else {
        toast.error("An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DialogContent>
      <DialogTitle>Add Recommendation</DialogTitle>

      <Textarea
        placeholder="Enter your recommendation..."
        className="resize-none text-sm"
        value={recommendation}
        onChange={(e) => setRecommendation(e.target.value)}
      />

      <Select onValueChange={setPriority} value={priority}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select priority" />
        </SelectTrigger>
        <SelectContent>
          {[...Array(6)].map((_, index) => (
            <SelectItem key={index} value={`P${index + 1}`}>
              P{index + 1}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="flex flex-col gap-3 border p-3 rounded-lg">
        <div className="flex gap-3 items-center justify-center">
          <CircleAlert className="text-zinc-500" size={20} />
          <h1 className="text-sm font-semibold text-center">
            Maintenance Priority Description
          </h1>
        </div>
        <div className="flex flex-col gap-1 text-sm">
          <p>
            <span className="font-bold">P1</span> - Immediate action is
            recommended.
          </p>
          <p>
            <span className="font-bold">P2</span> - Action within a week is
            recommended.
          </p>
          <p>
            <span className="font-bold">P3</span> - Action within a fortnight is
            recommended.
          </p>
          <p>
            <span className="font-bold">P4</span> - Action within a month is
            recommended.
          </p>
          <p>
            <span className="font-bold">P5</span> - Planned maintenance, approx.
            within 3 months is recommended.
          </p>
          <p>
            <span className="font-bold">P6</span> - No action is required.
          </p>
        </div>
      </div>

      <div className="flex gap-3 w-full justify-end">
        <Button variant="outline" onClick={onClose} disabled={isLoading}>
          Cancel
        </Button>
        <Button
          className="bg-main text-white hover:bg-follow"
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? "Adding..." : "Add"}
        </Button>
      </div>
    </DialogContent>
  );
};

export default RecommendationDialog;
