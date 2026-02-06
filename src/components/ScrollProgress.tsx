import { motion, useScroll, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

interface ScrollProgressProps {
    className?: string;
    height?: number;
}

export function ScrollProgress({ className, height = 3 }: ScrollProgressProps) {
    const { scrollYProgress } = useScroll();

    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    return (
        <motion.div
            className={cn(
                "fixed top-0 left-0 right-0 z-[60] origin-left gradient-primary",
                className
            )}
            style={{
                height,
                scaleX,
            }}
        />
    );
}
