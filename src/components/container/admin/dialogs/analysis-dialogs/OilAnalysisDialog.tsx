import React from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { DialogContent, DialogTitle } from "@/components/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { symbols, routeComponentOilAnalysisSchema } from "@/schema";

interface OilAnalysisProps {
  defaultOilAnalysis: string;
  routeComponentId: string | undefined;
  onClose: () => void;
}

const OilAnalysis: React.FC<OilAnalysisProps> = ({
  defaultOilAnalysis,
  routeComponentId,
  onClose,
}) => {
  const [analysis, setAnalysis] = React.useState(defaultOilAnalysis);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = async () => {
    if (!routeComponentId) {
      toast.error("No component selected.");
      return;
    }

    if (analysis === "") {
      toast.error("No oil state selected.");
      return;
    }

    const payload = { routeComponentId, analysis };

    try {
      routeComponentOilAnalysisSchema.parse(payload);

      // mock API call
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsLoading(false);

      toast.success("Oil analysis added successfully.");
      setAnalysis("Normal");
      onClose();
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(error.issues.map((e) => e.message).join(", "));
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  };

  return (
    <DialogContent>
      <DialogTitle>Add Oil Analysis</DialogTitle>
      <Select onValueChange={setAnalysis} defaultValue={defaultOilAnalysis}>
        <SelectTrigger className="w-full">
          <SelectValue>{analysis || defaultOilAnalysis}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          {symbols.map(({ image, label }) => (
            <SelectItem key={image} value={label}>
              <div className="flex gap-3 items-center">
                <img
                  src={`/severity/${image}.png`}
                  width={20}
                  height={20}
                  alt={label}
                  className="w-5 object-cover"
                />
                {label}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="flex gap-3 w-full justify-end mt-4">
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

export default OilAnalysis;
