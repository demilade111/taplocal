
import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Category {
  id: string;
  name: string;
  icon: string;
}

interface CategorySelectorProps {
  categories: Category[];
  onSelect: (id: string) => void;
  selectedCategory: string | null;
}

const CategorySelector = ({ 
  categories, 
  onSelect, 
  selectedCategory 
}: CategorySelectorProps) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (!container) return;
    
    const scrollAmount = 200;
    const newPosition = direction === "left" 
      ? Math.max(0, scrollPosition - scrollAmount)
      : Math.min(
          container.scrollWidth - container.clientWidth,
          scrollPosition + scrollAmount
        );
    
    container.scrollTo({
      left: newPosition,
      behavior: "smooth"
    });
    
    setScrollPosition(newPosition);
  };

  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (container) {
      setScrollPosition(container.scrollLeft);
    }
  };

  // Calculate if we can scroll
  const canScrollLeft = scrollPosition > 0;
  const canScrollRight = scrollContainerRef.current
    ? scrollContainerRef.current.scrollWidth > scrollContainerRef.current.clientWidth &&
      scrollPosition < scrollContainerRef.current.scrollWidth - scrollContainerRef.current.clientWidth
    : false;

  return (
    <div className="relative">
      {/* Left scroll button */}
      {canScrollLeft && (
        <Button
          variant="outline"
          size="sm"
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 rounded-full h-8 w-8 p-0 bg-white shadow-md border"
          onClick={() => scroll("left")}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      )}

      {/* Categories container */}
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto scrollbar-hide py-4 px-1 scroll-smooth"
        onScroll={handleScroll}
      >
        {categories.map((category) => (
          <div key={category.id} className="flex-shrink-0 px-2">
            <button
              onClick={() => onSelect(category.id)}
              className={cn(
                "flex flex-col items-center justify-center space-y-2 p-3 min-w-[80px]",
                "transition-all duration-200",
                "border rounded-lg hover:border-taplocal-purple",
                selectedCategory === category.id
                  ? "bg-taplocal-purple bg-opacity-10 border-taplocal-purple"
                  : "bg-white border-gray-200"
              )}
            >
              <div className="w-10 h-10 flex items-center justify-center">
                <img
                  src={category.icon}
                  alt={category.name}
                  className="w-6 h-6"
                />
              </div>
              <span className="text-xs font-medium text-center">
                {category.name}
              </span>
            </button>
          </div>
        ))}
      </div>

      {/* Right scroll button */}
      {canScrollRight && (
        <Button
          variant="outline"
          size="sm"
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 rounded-full h-8 w-8 p-0 bg-white shadow-md border"
          onClick={() => scroll("right")}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};

export default CategorySelector;
