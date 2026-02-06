import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Position {
    x: number;
    y: number;
}

export function CursorGlow() {
    const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseLeave = () => {
            setIsVisible(false);
        };

        const handleMouseEnter = () => {
            setIsVisible(true);
        };

        window.addEventListener("mousemove", handleMouseMove);
        document.body.addEventListener("mouseleave", handleMouseLeave);
        document.body.addEventListener("mouseenter", handleMouseEnter);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            document.body.removeEventListener("mouseleave", handleMouseLeave);
            document.body.removeEventListener("mouseenter", handleMouseEnter);
        };
    }, [isVisible]);

    // Don't render on touch devices
    if (typeof window !== "undefined" && "ontouchstart" in window) {
        return null;
    }

    return (
        <motion.div
            className="pointer-events-none fixed inset-0 z-30 overflow-hidden hidden md:block"
            initial={{ opacity: 0 }}
            animate={{ opacity: isVisible ? 1 : 0 }}
            transition={{ duration: 0.3 }}
        >
            {/* Main glow */}
            <motion.div
                className="absolute w-[500px] h-[500px] rounded-full"
                style={{
                    background: "radial-gradient(circle, hsl(var(--primary) / 0.15) 0%, transparent 70%)",
                    transform: "translate(-50%, -50%)",
                }}
                animate={{
                    x: position.x,
                    y: position.y,
                }}
                transition={{
                    type: "spring",
                    damping: 30,
                    stiffness: 200,
                    mass: 0.5,
                }}
            />
            {/* Inner bright spot */}
            <motion.div
                className="absolute w-[200px] h-[200px] rounded-full"
                style={{
                    background: "radial-gradient(circle, hsl(var(--primary) / 0.08) 0%, transparent 70%)",
                    transform: "translate(-50%, -50%)",
                }}
                animate={{
                    x: position.x,
                    y: position.y,
                }}
                transition={{
                    type: "spring",
                    damping: 25,
                    stiffness: 250,
                    mass: 0.3,
                }}
            />
        </motion.div>
    );
}
