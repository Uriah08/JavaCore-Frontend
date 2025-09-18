import React from "react";
import { Button } from "@/components/ui/button";
import { DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { routeComponentTemperatureSchema } from "@/schema";
import { z } from "zod";
import { toast } from "sonner";

interface TemperatureDialogProps {
  routeComponentId?: string;
  onClose: () => void;
}

const Temperature: React.FC<TemperatureDialogProps> = ({
  routeComponentId,
  onClose,
}) => {
  const [temperature, setTemperature] = React.useState<string>("");

  const handleSubmit = () => {
    if (!routeComponentId) {
      toast.error("No component selected.");
      return;
    }

    const tempValue = parseFloat(temperature);

    const payload = {
      routeComponentId,
      temperature: Number(tempValue),
    };

    try {
      routeComponentTemperatureSchema.parse(payload);

      setTimeout(() => {
        toast.success(
          `Temperature ${payload.temperature}°C added for ${payload.routeComponentId}`
        );
        setTemperature("");
        onClose();
      }, 500);
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
      <DialogTitle>Add Temperature</DialogTitle>
      <Input
        type="number"
        placeholder="Enter temperature..."
        value={temperature}
        onChange={(e) => setTemperature(e.target.value)}
      />
      <div className="flex gap-3 w-full justify-end mt-4">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button
          className="bg-main text-white hover:bg-follow"
          onClick={handleSubmit}
        >
          Add
        </Button>
      </div>
    </DialogContent>
  );
};

export default Temperature;
