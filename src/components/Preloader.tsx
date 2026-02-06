import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Preloader() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Minimum display time for brand impression
        const minDisplayTime = 1500;
        const startTime = Date.now();

        const handleLoad = () => {
            const elapsed = Date.now() - startTime;
            const remainingTime = Math.max(0, minDisplayTime - elapsed);

            setTimeout(() => {
                setIsLoading(false);
            }, remainingTime);
        };

        if (document.readyState === "complete") {
            handleLoad();
        } else {
            window.addEventListener("load", handleLoad);
            return () => window.removeEventListener("load", handleLoad);
        }
    }, []);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
                >
                    <div className="flex flex-col items-center gap-6">
                        {/* Logo Animation */}
                        <motion.div
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{
                                duration: 0.5,
                                ease: [0.25, 0.46, 0.45, 0.94]
                            }}
                            className="relative"
                        >
                            {/* Outer glow ring */}
                            <motion.div
                                className="absolute inset-0 rounded-2xl gradient-primary blur-xl opacity-50"
                                animate={{
                                    scale: [1, 1.2, 1],
                                    opacity: [0.5, 0.3, 0.5],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                            />

                            {/* Logo container */}
                            <div className="relative w-20 h-20 rounded-2xl gradient-primary flex items-center justify-center shadow-primary">
                                <motion.span
                                    className="text-3xl font-bold text-primary-foreground"
                                    animate={{
                                        opacity: [1, 0.7, 1],
                                    }}
                                    transition={{
                                        duration: 1.5,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                    }}
                                >
                                    T
                                </motion.span>
                            </div>
                        </motion.div>

                        {/* Brand name */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.4 }}
                            className="text-2xl font-bold text-foreground"
                        >
                            Taman<span className="text-primary">WEB</span>
                        </motion.div>

                        {/* Loading bar */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="w-48 h-1 bg-muted rounded-full overflow-hidden"
                        >
                            <motion.div
                                className="h-full gradient-primary rounded-full"
                                initial={{ width: "0%" }}
                                animate={{ width: "100%" }}
                                transition={{
                                    duration: 1.2,
                                    ease: "easeInOut",
                                }}
                            />
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
