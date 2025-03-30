
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const CategoryFilter = ({ 
  categories, 
  selectedCategory, 
  onSelectCategory 
}: CategoryFilterProps) => {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <Button
        variant={selectedCategory === "All" ? "default" : "outline"}
        onClick={() => onSelectCategory("All")}
        className={cn(
          "bg-visa-soft-gray hover:bg-visa-light-purple text-visa-navy",
          selectedCategory === "All" && "bg-visa-purple text-white hover:bg-visa-purple/90"
        )}
      >
        All
      </Button>
      
      {categories.map((category) => (
        <Button
          key={category}
          variant={selectedCategory === category ? "default" : "outline"}
          onClick={() => onSelectCategory(category)}
          className={cn(
            "bg-visa-soft-gray hover:bg-visa-light-purple text-visa-navy",
            selectedCategory === category && "bg-visa-purple text-white hover:bg-visa-purple/90"
          )}
        >
          {category}
        </Button>
      ))}
    </div>
  );
};

export default CategoryFilter;
