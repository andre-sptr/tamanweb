import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, Eye } from "lucide-react";
import { Template, formatPrice } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface TemplateCardProps {
  template: Template;
  index?: number;
}

export function TemplateCard({ template, index = 0 }: TemplateCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group"
    >
      <Link to={`/templates/${template.slug}`}>
        <div className="bg-card rounded-2xl overflow-hidden border border-border shadow-md hover:shadow-card-hover transition-all duration-300 hover:-translate-y-2">
          {/* Image */}
          <div className="relative aspect-[4/3] overflow-hidden">
            <img
              src={template.thumbnailUrl}
              alt={template.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Category Badge */}
            <Badge className="absolute top-4 left-4 bg-primary/90 text-primary-foreground backdrop-blur-sm">
              {template.category}
            </Badge>

            {/* Featured Badge */}
            {template.featured && (
              <Badge className="absolute top-4 right-4 bg-warning/90 text-warning-foreground backdrop-blur-sm">
                ⭐ Featured
              </Badge>
            )}

            {/* Preview Button */}
            <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
              <Button variant="glass" className="w-full" size="sm">
                <Eye className="w-4 h-4 mr-2" />
                Lihat Detail
              </Button>
            </div>
          </div>

          {/* Content */}
          <div className="p-5">
            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              {template.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 text-xs font-medium bg-muted text-muted-foreground rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Title */}
            <h3 className="font-bold text-lg text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-1">
              {template.title}
            </h3>

            {/* Description */}
            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
              {template.shortDescription}
            </p>

            {/* Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-border">
              {/* Rating */}
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-warning text-warning" />
                <span className="text-sm font-medium text-foreground">{template.rating}</span>
                <span className="text-xs text-muted-foreground">({template.reviews})</span>
              </div>

              {/* Price */}
              <div className="text-right">
                <span className="font-bold text-lg text-primary">
                  {formatPrice(template.price)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function TemplateCardSkeleton({ index = 0 }: { index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <div className="bg-card rounded-2xl overflow-hidden border border-border shadow-md">
        {/* Image Skeleton with shimmer */}
        <div
          className="aspect-[4/3] bg-muted relative overflow-hidden skeleton-shimmer"
          style={{ animationDelay: `${index * 100}ms` }}
        />

        <div className="p-5 space-y-4">
          {/* Tags Skeleton */}
          <div className="flex gap-2">
            <div
              className="h-5 w-16 bg-muted rounded-full skeleton-shimmer"
              style={{ animationDelay: `${index * 100 + 50}ms` }}
            />
            <div
              className="h-5 w-12 bg-muted rounded-full skeleton-shimmer"
              style={{ animationDelay: `${index * 100 + 100}ms` }}
            />
            <div
              className="h-5 w-14 bg-muted rounded-full skeleton-shimmer"
              style={{ animationDelay: `${index * 100 + 150}ms` }}
            />
          </div>

          {/* Title Skeleton */}
          <div
            className="h-6 w-3/4 bg-muted rounded skeleton-shimmer"
            style={{ animationDelay: `${index * 100 + 200}ms` }}
          />

          {/* Description Skeleton */}
          <div className="space-y-2">
            <div
              className="h-4 w-full bg-muted rounded skeleton-shimmer"
              style={{ animationDelay: `${index * 100 + 250}ms` }}
            />
            <div
              className="h-4 w-2/3 bg-muted rounded skeleton-shimmer"
              style={{ animationDelay: `${index * 100 + 300}ms` }}
            />
          </div>

          {/* Footer Skeleton */}
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div
              className="h-5 w-20 bg-muted rounded skeleton-shimmer"
              style={{ animationDelay: `${index * 100 + 350}ms` }}
            />
            <div
              className="h-6 w-24 bg-muted rounded skeleton-shimmer"
              style={{ animationDelay: `${index * 100 + 400}ms` }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
