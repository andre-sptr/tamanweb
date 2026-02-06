import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    ChevronDown,
    Layout,
    Palette,
    ShoppingCart,
    Briefcase,
    Code,
    Rocket,
    Sparkles,
    ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface MegaMenuProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
}

const categories = [
    {
        title: "Portfolio",
        description: "Template portfolio profesional",
        icon: Briefcase,
        href: "/templates?category=Portfolio",
        color: "text-blue-500",
    },
    {
        title: "Landing Page",
        description: "Template landing page konversi tinggi",
        icon: Rocket,
        href: "/templates?category=Landing%20Page",
        color: "text-green-500",
    },
    {
        title: "SaaS",
        description: "Template untuk aplikasi SaaS",
        icon: Code,
        href: "/templates?category=SaaS",
        color: "text-purple-500",
    },
    {
        title: "E-commerce",
        description: "Template toko online premium",
        icon: ShoppingCart,
        href: "/templates?category=E-commerce",
        color: "text-orange-500",
    },
];

const featured = [
    {
        title: "Template Baru",
        description: "Lihat koleksi terbaru kami",
        href: "/templates?sort=newest",
        icon: Sparkles,
    },
    {
        title: "Paling Populer",
        description: "Template paling banyak dibeli",
        href: "/templates?sort=popular",
        icon: Layout,
    },
    {
        title: "Diskon Spesial",
        description: "Hemat hingga 50%",
        href: "/templates?sale=true",
        icon: Palette,
    },
];

export function MegaMenu({ isOpen, onOpenChange }: MegaMenuProps) {
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleMouseEnter = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        onOpenChange(true);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            onOpenChange(false);
        }, 150);
    };

    return (
        <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <button
                className={cn(
                    "flex items-center gap-1 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200",
                    isOpen
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent"
                )}
            >
                Template
                <ChevronDown
                    className={cn(
                        "w-4 h-4 transition-transform duration-200",
                        isOpen && "rotate-180"
                    )}
                />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-1/2 -translate-x-1/2 top-full pt-2 z-50"
                    >
                        <div className="w-[600px] bg-card rounded-2xl border border-border shadow-2xl overflow-hidden">
                            <div className="grid grid-cols-3 gap-0">
                                {/* Categories */}
                                <div className="col-span-2 p-4 border-r border-border">
                                    <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                                        Kategori
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                        {categories.map((category) => (
                                            <Link
                                                key={category.title}
                                                to={category.href}
                                                onClick={() => onOpenChange(false)}
                                                className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent transition-colors group"
                                            >
                                                <div className={cn("mt-0.5", category.color)}>
                                                    <category.icon className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <div className="font-medium text-sm group-hover:text-primary transition-colors">
                                                        {category.title}
                                                    </div>
                                                    <div className="text-xs text-muted-foreground">
                                                        {category.description}
                                                    </div>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>

                                {/* Featured */}
                                <div className="p-4 bg-muted/30">
                                    <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                                        Pilihan
                                    </div>
                                    <div className="space-y-2">
                                        {featured.map((item) => (
                                            <Link
                                                key={item.title}
                                                to={item.href}
                                                onClick={() => onOpenChange(false)}
                                                className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent transition-colors group"
                                            >
                                                <item.icon className="w-4 h-4 text-primary" />
                                                <div>
                                                    <div className="font-medium text-sm">
                                                        {item.title}
                                                    </div>
                                                    <div className="text-xs text-muted-foreground">
                                                        {item.description}
                                                    </div>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="px-4 py-3 bg-muted/50 border-t border-border">
                                <Link
                                    to="/templates"
                                    onClick={() => onOpenChange(false)}
                                    className="flex items-center justify-center gap-2 text-sm font-medium text-primary hover:underline"
                                >
                                    Lihat Semua Template
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
