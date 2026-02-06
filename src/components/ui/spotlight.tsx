import { useRef, useState, ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SpotlightProps {
    children: ReactNode;
    className?: string;
    spotlightColor?: string;
}

export function Spotlight({
    children,
    className,
    spotlightColor = "hsl(var(--primary) / 0.1)",
}: SpotlightProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };

    return (
        <motion.div
            ref={containerRef}
            className={cn("relative overflow-hidden", className)}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Spotlight effect */}
            <motion.div
                className="pointer-events-none absolute"
                style={{
                    width: 500,
                    height: 500,
                    borderRadius: "50%",
                    background: `radial-gradient(circle, ${spotlightColor} 0%, transparent 70%)`,
                    transform: "translate(-50%, -50%)",
                }}
                animate={{
                    x: mousePosition.x,
                    y: mousePosition.y,
                    opacity: isHovered ? 1 : 0,
                }}
                transition={{
                    type: "spring",
                    stiffness: 150,
                    damping: 20,
                    opacity: { duration: 0.3 },
                }}
            />

            {/* Content */}
            <div className="relative z-10">{children}</div>
        </motion.div>
    );
}

// Spotlight card variant
interface SpotlightCardProps {
    children: ReactNode;
    className?: string;
}

export function SpotlightCard({ children, className }: SpotlightCardProps) {
    return (
        <Spotlight
            className={cn(
                "rounded-2xl bg-card border border-border p-6",
                "transition-shadow duration-300 hover:shadow-lg",
                className
            )}
            spotlightColor="hsl(var(--primary) / 0.08)"
        >
            {children}
        </Spotlight>
    );
}
