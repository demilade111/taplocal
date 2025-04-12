
import React, { useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingProps {
  defaultValue?: number;
  max?: number;
  onChange?: (value: number) => void;
  readOnly?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function Rating({
  defaultValue = 0,
  max = 5,
  onChange,
  readOnly = false,
  size = "md",
  className,
}: RatingProps) {
  const [value, setValue] = useState(defaultValue);
  const [hoverValue, setHoverValue] = useState<number | null>(null);

  const handleClick = (index: number) => {
    if (readOnly) return;
    
    const newValue = index + 1;
    setValue(newValue);
    if (onChange) onChange(newValue);
  };

  const handleMouseEnter = (index: number) => {
    if (readOnly) return;
    setHoverValue(index + 1);
  };

  const handleMouseLeave = () => {
    if (readOnly) return;
    setHoverValue(null);
  };

  const sizeClassMap = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-6 w-6"
  };

  return (
    <div className={cn("flex items-center", className)}>
      {[...Array(max)].map((_, i) => {
        const filled = (hoverValue !== null ? i < hoverValue : i < value);
        
        return (
          <span
            key={i}
            onClick={() => handleClick(i)}
            onMouseEnter={() => handleMouseEnter(i)}
            onMouseLeave={handleMouseLeave}
            className={cn(
              "cursor-pointer transition-transform",
              readOnly ? "cursor-default" : "hover:scale-110",
              !readOnly && "transition-colors"
            )}
          >
            <Star
              className={cn(
                sizeClassMap[size],
                filled
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-gray-300 dark:text-gray-600",
                "transition-colors mx-0.5"
              )}
            />
          </span>
        );
      })}
    </div>
  );
}

export default Rating;
