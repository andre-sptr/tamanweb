import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { templates } from "@/lib/data";
import { cn } from "@/lib/utils";

interface SearchAutocompleteProps {
    className?: string;
    onClose?: () => void;
}

export function SearchAutocomplete({ className, onClose }: SearchAutocompleteProps) {
    const [query, setQuery] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [results, setResults] = useState<typeof templates>([]);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const inputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    // Search with debounce
    useEffect(() => {
        if (query.length < 2) {
            setResults([]);
            setIsOpen(false);
            return;
        }

        setIsLoading(true);
        const timer = setTimeout(() => {
            const filtered = templates.filter(
                (t) =>
                    t.title.toLowerCase().includes(query.toLowerCase()) ||
                    t.shortDescription.toLowerCase().includes(query.toLowerCase()) ||
                    t.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase()))
            );
            setResults(filtered.slice(0, 5));
            setIsOpen(true);
            setIsLoading(false);
        }, 300);

        return () => clearTimeout(timer);
    }, [query]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "ArrowDown") {
            e.preventDefault();
            setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1));
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setSelectedIndex((prev) => Math.max(prev - 1, -1));
        } else if (e.key === "Enter") {
            e.preventDefault();
            if (selectedIndex >= 0 && results[selectedIndex]) {
                navigate(`/templates/${results[selectedIndex].slug}`);
                handleClose();
            } else if (query.length > 0) {
                navigate(`/templates?search=${encodeURIComponent(query)}`);
                handleClose();
            }
        } else if (e.key === "Escape") {
            handleClose();
        }
    };

    const handleClose = () => {
        setQuery("");
        setIsOpen(false);
        setSelectedIndex(-1);
        onClose?.();
    };

    const handleSelect = (slug: string) => {
        navigate(`/templates/${slug}`);
        handleClose();
    };

    return (
        <div className={cn("relative", className)}>
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                    ref={inputRef}
                    type="text"
                    placeholder="Cari template..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onFocus={() => query.length >= 2 && setIsOpen(true)}
                    className="pl-10 pr-10 bg-muted/50"
                />
                {query && (
                    <button
                        onClick={() => setQuery("")}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                        {isLoading ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            <X className="w-4 h-4" />
                        )}
                    </button>
                )}
            </div>

            <AnimatePresence>
                {isOpen && results.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full left-0 right-0 mt-2 bg-card rounded-xl border border-border shadow-xl z-50 overflow-hidden"
                    >
                        {results.map((template, index) => (
                            <button
                                key={template.id}
                                onClick={() => handleSelect(template.slug)}
                                className={cn(
                                    "w-full flex items-center gap-3 p-3 text-left transition-colors",
                                    index === selectedIndex
                                        ? "bg-accent"
                                        : "hover:bg-accent/50"
                                )}
                            >
                                <img
                                    src={template.thumbnailUrl}
                                    alt={template.title}
                                    className="w-12 h-9 rounded object-cover"
                                />
                                <div className="flex-1 min-w-0">
                                    <div className="font-medium text-sm truncate">
                                        {template.title}
                                    </div>
                                    <div className="text-xs text-muted-foreground truncate">
                                        {template.category} • {template.tags.slice(0, 2).join(", ")}
                                    </div>
                                </div>
                            </button>
                        ))}
                        <Link
                            to={`/templates?search=${encodeURIComponent(query)}`}
                            onClick={handleClose}
                            className="block p-3 text-center text-sm text-primary hover:bg-accent/50 border-t border-border"
                        >
                            Lihat semua hasil untuk "{query}"
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Overlay to close on click outside */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </div>
    );
}

// Compact search button that opens modal
export function SearchButton({ onClick }: { onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted/50 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors text-sm"
        >
            <Search className="w-4 h-4" />
            <span className="hidden lg:inline">Cari template...</span>
            <kbd className="hidden lg:inline px-1.5 py-0.5 text-xs bg-background rounded border border-border font-mono">
                ⌘K
            </kbd>
        </button>
    );
}
