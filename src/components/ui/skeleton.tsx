import { cn } from "@/lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Enable shimmer animation effect */
  shimmer?: boolean;
  /** Variant style */
  variant?: "default" | "circular" | "text" | "rectangular";
}

function Skeleton({ 
  className, 
  shimmer = true,
  variant = "default",
  ...props 
}: SkeletonProps) {
  const variantClasses = {
    default: "rounded-md",
    circular: "rounded-full",
    text: "rounded h-4",
    rectangular: "rounded-lg",
  };

  return (
    <div 
      className={cn(
        "bg-muted relative overflow-hidden",
        variantClasses[variant],
        shimmer && "skeleton-shimmer",
        !shimmer && "animate-pulse",
        className
      )} 
      {...props} 
    />
  );
}

/**
 * Skeleton Text - Multiple lines of text skeleton
 */
function SkeletonText({ 
  lines = 3, 
  className,
  ...props 
}: { lines?: number } & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("space-y-2", className)} {...props}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton 
          key={i} 
          variant="text"
          className={cn(
            "h-4",
            i === lines - 1 && "w-3/4" // Last line is shorter
          )}
          style={{ animationDelay: `${i * 100}ms` }}
        />
      ))}
    </div>
  );
}

/**
 * Skeleton Avatar - Circular skeleton for profile images
 */
function SkeletonAvatar({ 
  size = "md",
  className,
  ...props 
}: { size?: "sm" | "md" | "lg" | "xl" } & React.HTMLAttributes<HTMLDivElement>) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
    xl: "w-16 h-16",
  };

  return (
    <Skeleton 
      variant="circular" 
      className={cn(sizeClasses[size], className)}
      {...props}
    />
  );
}

/**
 * Skeleton Button - Button placeholder
 */
function SkeletonButton({ 
  size = "default",
  className,
  ...props 
}: { size?: "sm" | "default" | "lg" } & React.HTMLAttributes<HTMLDivElement>) {
  const sizeClasses = {
    sm: "h-8 w-20",
    default: "h-10 w-28",
    lg: "h-12 w-32",
  };

  return (
    <Skeleton 
      variant="default" 
      className={cn(sizeClasses[size], className)}
      {...props}
    />
  );
}

/**
 * Skeleton Image - Image placeholder with aspect ratio
 */
function SkeletonImage({ 
  aspectRatio = "video",
  className,
  ...props 
}: { aspectRatio?: "square" | "video" | "wide" | "portrait" } & React.HTMLAttributes<HTMLDivElement>) {
  const aspectClasses = {
    square: "aspect-square",
    video: "aspect-video",
    wide: "aspect-[21/9]",
    portrait: "aspect-[3/4]",
  };

  return (
    <Skeleton 
      variant="rectangular" 
      className={cn("w-full", aspectClasses[aspectRatio], className)}
      {...props}
    />
  );
}

export { 
  Skeleton, 
  SkeletonText, 
  SkeletonAvatar, 
  SkeletonButton, 
  SkeletonImage 
};
