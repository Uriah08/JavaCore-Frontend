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
import { toast } from "sonner";
import { symbols, routeComponentCommentSchema } from "@/schema";
import { ZodError } from "zod";

interface CommentsProps {
  routeComponentId: string | undefined;
  onClose: () => void;
}

// 🔹 Mock API for now (simulate async call)
const mockCreateComment = async (payload: {
  routeComponentId: string;
  severity: string;
  comment: string;
}) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(payload), 800);
  });
};

const Comments: React.FC<CommentsProps> = ({ routeComponentId, onClose }) => {
  const [comment, setComment] = useState<string>("");
  const [severity, setSeverity] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    if (!routeComponentId) {
      toast.error("No component selected.");
      return;
    }

    const payload = {
      routeComponentId,
      severity,
      comment,
    };

    try {
      // ✅ Validate payload
      routeComponentCommentSchema.parse(payload);

      setIsLoading(true);
      await mockCreateComment(payload);

      toast.success("Comment added successfully.");
      setComment("");
      setSeverity("");
      onClose();
    } catch (error) {
      if (error instanceof ZodError) {
        toast.error(error.issues.map((issue) => issue.message).join(", "));
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DialogContent>
      <DialogTitle>Add Comment</DialogTitle>

      <Textarea
        placeholder="Enter your comment..."
        className="resize-none text-sm"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      <Select value={severity} onValueChange={setSeverity}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select severity" />
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

export default Comments;
