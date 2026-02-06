import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedCounterProps {
    value: number | string;
    suffix?: string;
    prefix?: string;
    duration?: number;
    className?: string;
    formatNumber?: boolean;
}

export function AnimatedCounter({
    value,
    suffix = "",
    prefix = "",
    duration = 2,
    className,
    formatNumber = true,
}: AnimatedCounterProps) {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    const [displayValue, setDisplayValue] = useState(0);

    // Parse the value to get the numeric part and any suffix in the value itself
    const parseValue = (val: number | string): { number: number; valueSuffix: string } => {
        if (typeof val === "number") {
            return { number: val, valueSuffix: "" };
        }

        // Extract number and suffix from string like "2.5k" or "50+"
        const match = val.match(/^([\d.]+)(.*)$/);
        if (match) {
            return { number: parseFloat(match[1]), valueSuffix: match[2] };
        }
        return { number: 0, valueSuffix: val };
    };

    const { number: targetNumber, valueSuffix } = parseValue(value);

    useEffect(() => {
        if (!isInView) return;

        const startTime = Date.now();
        const startValue = 0;

        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / (duration * 1000), 1);

            // Easing function (ease-out cubic)
            const easeOut = 1 - Math.pow(1 - progress, 3);

            const currentValue = startValue + (targetNumber - startValue) * easeOut;
            setDisplayValue(currentValue);

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                setDisplayValue(targetNumber);
            }
        };

        requestAnimationFrame(animate);
    }, [isInView, targetNumber, duration]);

    const formatDisplayValue = (val: number): string => {
        if (!formatNumber) return val.toFixed(0);

        // If the target has decimals, show decimals
        if (targetNumber % 1 !== 0) {
            return val.toFixed(1);
        }
        return Math.floor(val).toLocaleString();
    };

    return (
        <motion.span
            ref={ref}
            className={cn("tabular-nums", className)}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
            {prefix}
            {formatDisplayValue(displayValue)}
            {valueSuffix}
            {suffix}
        </motion.span>
    );
}

// Preset for stats display
interface StatCounterProps {
    value: string | number;
    label: string;
    icon?: React.ReactNode;
}

export function StatCounter({ value, label, icon }: StatCounterProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    return (
        <motion.div
            ref={ref}
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
            {icon && (
                <motion.div
                    className="mb-3 flex justify-center"
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : { scale: 0 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                >
                    {icon}
                </motion.div>
            )}
            <div className="text-3xl md:text-4xl font-bold text-primary">
                <AnimatedCounter value={value} />
            </div>
            <div className="text-sm text-muted-foreground mt-1">{label}</div>
        </motion.div>
    );
}
