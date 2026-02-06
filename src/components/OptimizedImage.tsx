import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    src: string;
    alt: string;
    /** Width for srcset generation */
    width?: number;
    /** Height for srcset generation */
    height?: number;
    /** Placeholder blur color or base64 */
    placeholder?: string;
    /** Priority loading (disables lazy loading) */
    priority?: boolean;
    /** Object fit style */
    objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
    /** Aspect ratio for container */
    aspectRatio?: string;
}

export function OptimizedImage({
    src,
    alt,
    width,
    height,
    placeholder = "bg-muted",
    priority = false,
    objectFit = "cover",
    aspectRatio,
    className,
    ...props
}: OptimizedImageProps) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isInView, setIsInView] = useState(priority);
    const [hasError, setHasError] = useState(false);
    const imgRef = useRef<HTMLImageElement>(null);

    // Intersection Observer for lazy loading
    useEffect(() => {
        if (priority || isInView) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    observer.disconnect();
                }
            },
            {
                rootMargin: "200px",
                threshold: 0,
            }
        );

        if (imgRef.current) {
            observer.observe(imgRef.current);
        }

        return () => observer.disconnect();
    }, [priority, isInView]);

    // Generate srcset for Unsplash images
    const generateSrcSet = (url: string) => {
        if (!url.includes("unsplash.com")) return undefined;

        const sizes = [400, 600, 800, 1200, 1600];
        return sizes
            .map((size) => {
                const newUrl = url.replace(/w=\d+/, `w=${size}`);
                return `${newUrl} ${size}w`;
            })
            .join(", ");
    };

    const objectFitClass = {
        cover: "object-cover",
        contain: "object-contain",
        fill: "object-fill",
        none: "object-none",
        "scale-down": "object-scale-down",
    };

    return (
        <div
            ref={imgRef}
            className={cn(
                "relative overflow-hidden",
                placeholder,
                aspectRatio && `aspect-[${aspectRatio}]`,
                className
            )}
            style={aspectRatio ? { aspectRatio } : undefined}
        >
            {/* Placeholder skeleton shimmer */}
            {!isLoaded && !hasError && (
                <div className="absolute inset-0 skeleton-shimmer bg-muted" />
            )}

            {/* Error state */}
            {hasError && (
                <div className="absolute inset-0 flex items-center justify-center bg-muted text-muted-foreground">
                    <span className="text-sm">Gagal memuat gambar</span>
                </div>
            )}

            {/* Image */}
            {isInView && !hasError && (
                <img
                    src={src}
                    alt={alt}
                    width={width}
                    height={height}
                    srcSet={generateSrcSet(src)}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    loading={priority ? "eager" : "lazy"}
                    decoding="async"
                    onLoad={() => setIsLoaded(true)}
                    onError={() => setHasError(true)}
                    className={cn(
                        "w-full h-full transition-opacity duration-500",
                        objectFitClass[objectFit],
                        isLoaded ? "opacity-100" : "opacity-0"
                    )}
                    {...props}
                />
            )}
        </div>
    );
}

// Simpler version without lazy loading for above-the-fold images
export function Image({
    src,
    alt,
    className,
    ...props
}: React.ImgHTMLAttributes<HTMLImageElement>) {
    return (
        <img
            src={src}
            alt={alt}
            loading="lazy"
            decoding="async"
            className={cn("w-full h-full object-cover", className)}
            {...props}
        />
    );
}
