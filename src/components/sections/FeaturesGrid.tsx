import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
    Zap,
    Palette,
    Code2,
    Shield,
    Rocket,
    HeartHandshake,
    Sparkles,
    Globe,
} from "lucide-react";
import { GlowCard } from "@/components/ui/glow-card";

const features = [
    {
        icon: Zap,
        title: "Performa Optimal",
        description: "Dioptimasi untuk kecepatan loading tercepat dengan score Lighthouse 95+",
        color: "hsl(48, 96%, 53%)",
    },
    {
        icon: Palette,
        title: "Desain Premium",
        description: "UI/UX modern dan profesional yang mengikuti tren desain terkini",
        color: "hsl(280, 65%, 60%)",
    },
    {
        icon: Code2,
        title: "Clean Code",
        description: "Kode bersih, terstruktur, dan mengikuti best practices development",
        color: "hsl(142, 76%, 36%)",
    },
    {
        icon: Shield,
        title: "Keamanan Terjamin",
        description: "Dibangun dengan standar keamanan tinggi dan praktik terbaik",
        color: "hsl(217, 91%, 60%)",
    },
    {
        icon: Rocket,
        title: "Siap Deploy",
        description: "Setup cepat dan mudah, siap deploy dalam hitungan menit",
        color: "hsl(0, 84%, 60%)",
    },
    {
        icon: HeartHandshake,
        title: "Support Premium",
        description: "Dukungan teknis responsif dan dokumentasi lengkap",
        color: "hsl(330, 80%, 60%)",
    },
    {
        icon: Sparkles,
        title: "Update Gratis",
        description: "Dapatkan update fitur dan perbaikan bug secara gratis selamanya",
        color: "hsl(38, 92%, 50%)",
    },
    {
        icon: Globe,
        title: "SEO Friendly",
        description: "Dioptimasi untuk mesin pencari dengan struktur dan meta yang tepat",
        color: "hsl(180, 70%, 45%)",
    },
];

export function FeaturesGrid() {
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
                        Mengapa Memilih <span className="text-gradient">TamanWEB</span>?
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Fitur-fitur unggulan yang membuat template kami berbeda dari yang lain
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <GlowCard
                                glowColor={feature.color}
                                className="h-full p-6 hover:-translate-y-1 transition-transform duration-300"
                            >
                                {/* Icon */}
                                <div
                                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                                    style={{ backgroundColor: `${feature.color}20` }}
                                >
                                    <feature.icon className="w-6 h-6" style={{ color: feature.color }} />
                                </div>

                                {/* Title */}
                                <h3 className="text-lg font-semibold text-foreground mb-2">
                                    {feature.title}
                                </h3>

                                {/* Description */}
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    {feature.description}
                                </p>
                            </GlowCard>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
