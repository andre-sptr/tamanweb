import { useRef, useState, ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
    children: ReactNode;
    className?: string;
    onClick?: () => void;
    strength?: number;
    disabled?: boolean;
}

export function MagneticButton({
    children,
    className,
    onClick,
    strength = 0.3,
    disabled = false,
}: MagneticButtonProps) {
    const ref = useRef<HTMLButtonElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!ref.current || disabled) return;

        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const distanceX = (e.clientX - centerX) * strength;
        const distanceY = (e.clientY - centerY) * strength;

        setPosition({ x: distanceX, y: distanceY });
    };

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 });
    };

    return (
        <motion.button
            ref={ref}
            className={cn(
                "relative inline-flex items-center justify-center",
                "px-8 py-4 rounded-xl font-semibold text-base",
                "bg-primary text-primary-foreground",
                "shadow-primary hover:shadow-xl",
                "transition-shadow duration-300",
                "disabled:opacity-50 disabled:cursor-not-allowed",
                className
            )}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
            disabled={disabled}
        >
            {/* Glow effect on hover */}
            <motion.div
                className="absolute inset-0 rounded-xl gradient-primary opacity-0 blur-xl"
                animate={{ opacity: position.x !== 0 || position.y !== 0 ? 0.5 : 0 }}
                transition={{ duration: 0.3 }}
            />

            {/* Content */}
            <span className="relative z-10 flex items-center gap-2">
                {children}
            </span>

            {/* Shine effect */}
            <motion.div
                className="absolute inset-0 rounded-xl overflow-hidden"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
            >
                <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                />
            </motion.div>
        </motion.button>
    );
}
