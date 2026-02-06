import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { SlidersHorizontal, ArrowUpDown } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { TemplateCard, TemplateCardSkeleton } from "@/components/templates/TemplateCard";
import { CategoryFilter } from "@/components/templates/CategoryFilter";
import { SearchBar } from "@/components/templates/SearchBar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { templates, categories } from "@/lib/data";

type SortOption = "newest" | "price-asc" | "price-desc" | "rating";

const sortLabels: Record<SortOption, string> = {
  newest: "Terbaru",
  "price-asc": "Harga: Rendah ke Tinggi",
  "price-desc": "Harga: Tinggi ke Rendah",
  rating: "Rating Tertinggi",
};

export default function Templates() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    searchParams.get("category")
  );
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [isLoading] = useState(false);

  const filteredTemplates = useMemo(() => {
    let result = [...templates];

    // Filter by category
    if (selectedCategory) {
      result = result.filter((t) => t.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(query) ||
          t.shortDescription.toLowerCase().includes(query) ||
          t.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    // Sort
    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
      default:
        // Keep original order (simulating newest first)
        break;
    }

    return result;
  }, [selectedCategory, searchQuery, sortBy]);

  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
    if (category) {
      searchParams.set("category", category);
    } else {
      searchParams.delete("category");
    }
    setSearchParams(searchParams);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    if (query) {
      searchParams.set("search", query);
    } else {
      searchParams.delete("search");
    }
    setSearchParams(searchParams);
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 pb-16 gradient-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Koleksi <span className="text-gradient">Template</span>
            </h1>
            <p className="text-muted-foreground text-lg mb-8">
              Temukan template website yang sempurna untuk proyek Anda dari koleksi premium kami.
            </p>

            {/* Search Bar */}
            <SearchBar
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Cari template berdasarkan nama, kategori, atau teknologi..."
              className="max-w-xl mx-auto"
            />
          </motion.div>
        </div>
      </section>

      {/* Filters & Templates */}
      <section className="py-12 bg-background">
        <div className="container">
          {/* Filter Bar */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10">
            <CategoryFilter
              categories={categories.map(c => ({ ...c, icon: c.icon }))}
              selected={selectedCategory}
              onSelect={handleCategoryChange}
            />

            <div className="flex items-center gap-3">
              {/* Results count */}
              <span className="text-sm text-muted-foreground">
                {filteredTemplates.length} template ditemukan
              </span>

              {/* Sort Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <ArrowUpDown className="w-4 h-4" />
                    {sortLabels[sortBy]}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {Object.entries(sortLabels).map(([value, label]) => (
                    <DropdownMenuItem
                      key={value}
                      onClick={() => setSortBy(value as SortOption)}
                      className={sortBy === value ? "bg-accent" : ""}
                    >
                      {label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Templates Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <TemplateCardSkeleton key={i} index={i} />
              ))}
            </div>
          ) : filteredTemplates.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredTemplates.map((template, index) => (
                <TemplateCard key={template.id} template={template} index={index} />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <SlidersHorizontal className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Tidak ada template ditemukan
              </h3>
              <p className="text-muted-foreground mb-6">
                Coba ubah filter atau kata kunci pencarian Anda.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory(null);
                  setSearchParams({});
                }}
              >
                Reset Filter
              </Button>
            </motion.div>
          )}
        </div>
      </section>
    </Layout>
  );
}
