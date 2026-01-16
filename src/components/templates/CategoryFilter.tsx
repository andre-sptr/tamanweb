import { cn } from "@/lib/utils";
import { Briefcase, Rocket, LayoutDashboard, ShoppingBag, Grid3X3 } from "lucide-react";

interface Category {
  name: string;
  count: number;
  icon: string;
}

interface CategoryFilterProps {
  categories: Category[];
  selected: string | null;
  onSelect: (category: string | null) => void;
}

const iconMap: Record<string, React.ElementType> = {
  Briefcase: Briefcase,
  Rocket: Rocket,
  LayoutDashboard: LayoutDashboard,
  ShoppingBag: ShoppingBag,
};

export function CategoryFilter({ categories, selected, onSelect }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onSelect(null)}
        className={cn(
          "flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-200",
          selected === null
            ? "bg-primary text-primary-foreground shadow-md"
            : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary"
        )}
      >
        <Grid3X3 className="w-4 h-4" />
        Semua
      </button>
      
      {categories.map((category) => {
        const Icon = iconMap[category.icon] || Briefcase;
        return (
          <button
            key={category.name}
            onClick={() => onSelect(category.name)}
            className={cn(
              "flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-200",
              selected === category.name
                ? "bg-primary text-primary-foreground shadow-md"
                : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary"
            )}
          >
            <Icon className="w-4 h-4" />
            {category.name}
            <span className="ml-1 px-1.5 py-0.5 text-xs rounded-full bg-background/20">
              {category.count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
