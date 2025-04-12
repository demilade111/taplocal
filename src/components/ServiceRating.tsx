
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Rating } from "@/components/ui/rating";
import { Avatar } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ServiceRatingProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  serviceId: string;
  serviceName: string;
  providerName: string;
  providerImage: string;
}

export function ServiceRating({
  open,
  onOpenChange,
  serviceId,
  serviceName,
  providerName,
  providerImage,
}: ServiceRatingProps) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    if (rating === 0) {
      toast.error("Please provide a rating before submitting");
      return;
    }

    setIsSubmitting(true);

    // This would normally be an API call to save the rating
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Thank you for your feedback!");
      
      // Reset and close
      setRating(0);
      setComment("");
      onOpenChange(false);
    }, 1000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Rate your experience</DialogTitle>
          <DialogDescription>
            How would you rate your experience with {serviceName}?
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex items-center space-x-4 py-4">
          <Avatar className="h-14 w-14">
            <img 
              src={providerImage} 
              alt={providerName} 
            />
          </Avatar>
          <div>
            <h4 className="font-medium text-foreground">{providerName}</h4>
            <p className="text-sm text-muted-foreground">{serviceName}</p>
          </div>
        </div>
        
        <div className="space-y-4 py-2">
          <div className="flex flex-col items-center space-y-2">
            <p className="text-sm font-medium">Your rating</p>
            <Rating 
              size="lg" 
              defaultValue={rating} 
              onChange={setRating} 
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="comment" className="text-sm font-medium">
              Comments (optional)
            </label>
            <Textarea
              id="comment"
              placeholder="Share your experience..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
              className="resize-none"
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit} 
            disabled={isSubmitting}
            className="bg-taplocal-purple hover:bg-taplocal-purple/90"
          >
            {isSubmitting ? "Submitting..." : "Submit Review"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ServiceRating;
