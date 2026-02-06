import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TextRevealProps {
    children: string;
    className?: string;
    delay?: number;
    staggerDelay?: number;
    variant?: "fade" | "slide" | "blur";
    by?: "word" | "character";
}

export function TextReveal({
    children,
    className,
    delay = 0,
    staggerDelay = 0.03,
    variant = "fade",
    by = "word",
}: TextRevealProps) {
    const items = by === "word" ? children.split(" ") : children.split("");

    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: staggerDelay,
                delayChildren: delay,
            },
        },
    };

    const getItemVariants = () => {
        switch (variant) {
            case "slide":
                return {
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                };
            case "blur":
                return {
                    hidden: { opacity: 0, filter: "blur(10px)" },
                    visible: { opacity: 1, filter: "blur(0px)" },
                };
            case "fade":
            default:
                return {
                    hidden: { opacity: 0 },
                    visible: { opacity: 1 },
                };
        }
    };

    return (
        <motion.span
            className={cn("inline-flex flex-wrap", className)}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
        >
            {items.map((item, index) => (
                <motion.span
                    key={index}
                    variants={getItemVariants()}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="inline-block"
                >
                    {item}
                    {by === "word" && index < items.length - 1 && "\u00A0"}
                </motion.span>
            ))}
        </motion.span>
    );
}

// Gradient text reveal with animation
interface GradientTextRevealProps {
    children: string;
    className?: string;
    delay?: number;
}

export function GradientTextReveal({
    children,
    className,
    delay = 0,
}: GradientTextRevealProps) {
    return (
        <motion.span
            className={cn("text-gradient inline-block", className)}
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
            {children}
        </motion.span>
    );
}
