import { Search, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function SearchBar({ 
  value, 
  onChange, 
  placeholder = "Cari template...",
  className 
}: SearchBarProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div
      className={cn(
        "relative flex items-center transition-all duration-200",
        isFocused ? "ring-2 ring-primary ring-offset-2" : "",
        className
      )}
    >
      <div className="absolute left-4 text-muted-foreground">
        <Search className="w-5 h-5" />
      </div>
      
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        className="w-full h-12 pl-12 pr-12 bg-card border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none transition-colors"
      />
      
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute right-4 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
