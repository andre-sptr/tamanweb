import { ReactNode, useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlowCardProps {
    children: ReactNode;
    className?: string;
    glowColor?: string;
    enableTilt?: boolean;
}

export function GlowCard({
    children,
    className,
    glowColor = "hsl(var(--primary))",
    enableTilt = true,
}: GlowCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;

        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        setMousePosition({ x, y });
    };

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => {
        setIsHovered(false);
        setMousePosition({ x: 0, y: 0 });
    };

    // Calculate tilt based on mouse position
    const calculateTilt = () => {
        if (!cardRef.current || !enableTilt || !isHovered) return { rotateX: 0, rotateY: 0 };

        const rect = cardRef.current.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((mousePosition.y - centerY) / centerY) * -8;
        const rotateY = ((mousePosition.x - centerX) / centerX) * 8;

        return { rotateX, rotateY };
    };

    const tilt = calculateTilt();

    return (
        <motion.div
            ref={cardRef}
            className={cn(
                "relative overflow-hidden rounded-2xl bg-card border border-border",
                "transition-shadow duration-300",
                className
            )}
            style={{ transformStyle: "preserve-3d", perspective: 1000 }}
            animate={{
                rotateX: tilt.rotateX,
                rotateY: tilt.rotateY,
                boxShadow: isHovered
                    ? `0 25px 50px -12px ${glowColor.replace(")", " / 0.25)")}`
                    : "0 10px 15px -3px hsl(var(--foreground) / 0.1)",
            }}
            transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
            }}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Animated gradient border */}
            <motion.div
                className="absolute inset-0 rounded-2xl opacity-0"
                style={{
                    background: `linear-gradient(135deg, ${glowColor}, transparent, ${glowColor})`,
                    backgroundSize: "200% 200%",
                }}
                animate={{
                    opacity: isHovered ? 0.5 : 0,
                    backgroundPosition: isHovered ? ["0% 0%", "100% 100%"] : "0% 0%",
                }}
                transition={{
                    opacity: { duration: 0.3 },
                    backgroundPosition: { duration: 2, repeat: Infinity, repeatType: "reverse" },
                }}
            />

            {/* Spotlight effect following mouse */}
            <motion.div
                className="absolute pointer-events-none"
                style={{
                    width: 300,
                    height: 300,
                    borderRadius: "50%",
                    background: `radial-gradient(circle, ${glowColor.replace(")", " / 0.15)")} 0%, transparent 70%)`,
                    transform: "translate(-50%, -50%)",
                }}
                animate={{
                    x: mousePosition.x,
                    y: mousePosition.y,
                    opacity: isHovered ? 1 : 0,
                }}
                transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 25,
                    opacity: { duration: 0.2 },
                }}
            />

            {/* Content with 3D transform */}
            <motion.div
                className="relative z-10"
                style={{ transform: "translateZ(20px)" }}
            >
                {children}
            </motion.div>
        </motion.div>
    );
}
