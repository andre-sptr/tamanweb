import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Users, FileText, Download, Star } from "lucide-react";
import { AnimatedCounter } from "@/components/AnimatedCounter";

const stats = [
    {
        value: "2.5K+",
        label: "Pengguna Aktif",
        icon: Users,
        color: "from-blue-500 to-cyan-500",
    },
    {
        value: "50+",
        label: "Template Premium",
        icon: FileText,
        color: "from-purple-500 to-pink-500",
    },
    {
        value: "10K+",
        label: "Total Unduhan",
        icon: Download,
        color: "from-orange-500 to-red-500",
    },
    {
        value: "4.9",
        label: "Rating Rata-rata",
        icon: Star,
        color: "from-yellow-500 to-orange-500",
    },
];

export function StatsSection() {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section ref={ref} className="py-20 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />

            <div className="container relative">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Dipercaya Ribuan{" "}
                        <span className="text-gradient">Developer</span>
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Bergabung dengan komunitas developer yang telah menggunakan TamanWEB untuk mempercepat development mereka
                    </p>
                </motion.div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group"
                        >
                            <div className="relative p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                                {/* Icon */}
                                <div
                                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                                >
                                    <stat.icon className="w-6 h-6 text-white" />
                                </div>

                                {/* Value */}
                                <div className="text-3xl md:text-4xl font-bold text-foreground mb-1">
                                    <AnimatedCounter value={stat.value} />
                                </div>

                                {/* Label */}
                                <div className="text-sm text-muted-foreground">
                                    {stat.label}
                                </div>

                                {/* Hover glow */}
                                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
