import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import {
    Briefcase,
    Rocket,
    Code,
    ShoppingCart,
    ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const categories = [
    {
        id: "portfolio",
        title: "Portfolio",
        description: "Template portfolio profesional untuk memamerkan karya terbaikmu",
        templateCount: 12,
        icon: Briefcase,
        href: "/templates?category=Portfolio",
        gradient: "from-blue-500 via-blue-600 to-indigo-600",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
    },
    {
        id: "landing",
        title: "Landing Page",
        description: "Landing page dengan konversi tinggi untuk produk atau layananmu",
        templateCount: 15,
        icon: Rocket,
        href: "/templates?category=Landing%20Page",
        gradient: "from-green-500 via-emerald-600 to-teal-600",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
    },
    {
        id: "saas",
        title: "SaaS",
        description: "Template modern untuk aplikasi SaaS dan startup teknologi",
        templateCount: 10,
        icon: Code,
        href: "/templates?category=SaaS",
        gradient: "from-purple-500 via-violet-600 to-purple-700",
        image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=400&h=300&fit=crop",
    },
    {
        id: "ecommerce",
        title: "E-commerce",
        description: "Template toko online yang dioptimasi untuk penjualan maksimal",
        templateCount: 13,
        icon: ShoppingCart,
        href: "/templates?category=E-commerce",
        gradient: "from-orange-500 via-red-500 to-pink-600",
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop",
    },
];

export function CategoryShowcase() {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section ref={ref} className="py-20 relative overflow-hidden">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Jelajahi <span className="text-gradient">Kategori</span>
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Temukan template yang sesuai dengan kebutuhan proyekmu
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {categories.map((category, index) => (
                        <motion.div
                            key={category.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Link
                                to={category.href}
                                className="group block relative overflow-hidden rounded-2xl h-64 md:h-72"
                            >
                                {/* Background image */}
                                <img
                                    src={category.image}
                                    alt={category.title}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />

                                {/* Gradient overlay */}
                                <div
                                    className={cn(
                                        "absolute inset-0 bg-gradient-to-br opacity-90",
                                        category.gradient
                                    )}
                                />

                                {/* Content */}
                                <div className="relative h-full p-6 flex flex-col justify-between text-white">
                                    {/* Top */}
                                    <div>
                                        <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4">
                                            <category.icon className="w-6 h-6" />
                                        </div>
                                    </div>

                                    {/* Bottom */}
                                    <div>
                                        <h3 className="text-2xl font-bold mb-2">
                                            {category.title}
                                        </h3>
                                        <p className="text-white/80 text-sm mb-4 line-clamp-2">
                                            {category.description}
                                        </p>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-white/70">
                                                {category.templateCount} template
                                            </span>
                                            <span className="flex items-center gap-1 text-sm font-medium group-hover:gap-2 transition-all">
                                                Lihat semua
                                                <ArrowRight className="w-4 h-4" />
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Hover glow */}
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white/20 rounded-full blur-3xl" />
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
