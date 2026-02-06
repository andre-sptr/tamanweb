import { motion } from "framer-motion";

// Tech stack logos (using simple text for demo, replace with actual logos)
const partners = [
    { name: "React", logo: "⚛️" },
    { name: "Next.js", logo: "▲" },
    { name: "TypeScript", logo: "TS" },
    { name: "Tailwind CSS", logo: "🌊" },
    { name: "Vite", logo: "⚡" },
    { name: "Framer Motion", logo: "🎬" },
    { name: "Radix UI", logo: "◉" },
    { name: "Vercel", logo: "▲" },
];

// Duplicate for seamless loop
const allPartners = [...partners, ...partners];

export function PartnersMarquee() {
    return (
        <section className="py-16 overflow-hidden border-y border-border bg-muted/30">
            <div className="container mb-8">
                <div className="text-center">
                    <p className="text-sm text-muted-foreground uppercase tracking-wider font-medium">
                        Dibangun dengan teknologi terpercaya
                    </p>
                </div>
            </div>

            {/* Marquee container */}
            <div className="relative">
                {/* Fade edges */}
                <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-muted/30 to-transparent z-10" />
                <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-muted/30 to-transparent z-10" />

                {/* Scrolling content */}
                <motion.div
                    className="flex gap-12 items-center"
                    animate={{
                        x: [0, -50 * partners.length],
                    }}
                    transition={{
                        x: {
                            duration: 20,
                            repeat: Infinity,
                            ease: "linear",
                        },
                    }}
                >
                    {allPartners.map((partner, index) => (
                        <div
                            key={`${partner.name}-${index}`}
                            className="flex items-center gap-3 shrink-0 px-6 py-3 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors cursor-default"
                        >
                            <span className="text-2xl">{partner.logo}</span>
                            <span className="text-lg font-semibold text-foreground">
                                {partner.name}
                            </span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
