import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface BackToTopProps {
    showAfter?: number;
    className?: string;
}

export function BackToTop({ showAfter = 300, className }: BackToTopProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

            setIsVisible(scrollTop > showAfter);
            setScrollProgress(progress);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [showAfter]);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    // Calculate the stroke dashoffset for the circular progress
    const circumference = 2 * Math.PI * 18; // radius = 18
    const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    onClick={scrollToTop}
                    className={cn(
                        "fixed bottom-6 right-6 z-50",
                        "w-12 h-12 rounded-full",
                        "bg-primary text-primary-foreground",
                        "shadow-lg hover:shadow-primary",
                        "flex items-center justify-center",
                        "transition-shadow duration-300",
                        "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                        className
                    )}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                >
                    {/* Circular progress indicator */}
                    <svg
                        className="absolute inset-0 w-full h-full -rotate-90"
                        viewBox="0 0 44 44"
                    >
                        <circle
                            cx="22"
                            cy="22"
                            r="18"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeOpacity="0.2"
                        />
                        <motion.circle
                            cx="22"
                            cy="22"
                            r="18"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeDasharray={circumference}
                            initial={{ strokeDashoffset: circumference }}
                            animate={{ strokeDashoffset }}
                            transition={{ duration: 0.1 }}
                        />
                    </svg>

                    {/* Arrow icon */}
                    <ArrowUp className="w-5 h-5 relative z-10" />
                </motion.button>
            )}
        </AnimatePresence>
    );
}
