import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { testimonials } from "@/lib/data";
import { cn } from "@/lib/utils";

export function TestimonialsCarousel() {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    // Auto-advance carousel
    useEffect(() => {
        const interval = setInterval(() => {
            setDirection(1);
            setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 300 : -300,
            opacity: 0,
        }),
        center: {
            x: 0,
            opacity: 1,
        },
        exit: (direction: number) => ({
            x: direction < 0 ? 300 : -300,
            opacity: 0,
        }),
    };

    const goToPrevious = () => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    const goToNext = () => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    const currentTestimonial = testimonials[currentIndex];

    return (
        <section ref={ref} className="py-20 relative overflow-hidden bg-muted/30">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-primary/5 rounded-full blur-3xl" />

            <div className="container relative">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Apa Kata <span className="text-gradient">Mereka</span>
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Testimoni dari developer dan perusahaan yang telah menggunakan template kami
                    </p>
                </motion.div>

                <div className="max-w-4xl mx-auto">
                    <div className="relative">
                        {/* Main testimonial card */}
                        <div className="relative overflow-hidden rounded-3xl bg-card border border-border shadow-xl p-8 md:p-12 min-h-[350px] flex items-center">
                            {/* Quote icon */}
                            <div className="absolute top-6 right-6 text-primary/10">
                                <Quote className="w-20 h-20" />
                            </div>

                            <AnimatePresence mode="wait" custom={direction}>
                                <motion.div
                                    key={currentIndex}
                                    custom={direction}
                                    variants={slideVariants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    transition={{ duration: 0.4, ease: "easeInOut" }}
                                    className="w-full"
                                >
                                    {/* Content */}
                                    <div className="flex flex-col md:flex-row items-center gap-8">
                                        {/* Avatar */}
                                        <div className="shrink-0">
                                            <div className="relative">
                                                <img
                                                    src={currentTestimonial.avatar}
                                                    alt={currentTestimonial.name}
                                                    className="w-24 h-24 md:w-32 md:h-32 rounded-2xl object-cover shadow-lg"
                                                />
                                                {/* Decorative ring */}
                                                <div className="absolute -inset-2 rounded-2xl border-2 border-primary/20 -z-10" />
                                            </div>
                                        </div>

                                        {/* Text content */}
                                        <div className="flex-1 text-center md:text-left">
                                            {/* Stars */}
                                            <div className="flex items-center justify-center md:justify-start gap-1 mb-4">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        className={cn(
                                                            "w-5 h-5",
                                                            i < currentTestimonial.rating
                                                                ? "text-warning fill-warning"
                                                                : "text-muted-foreground"
                                                        )}
                                                    />
                                                ))}
                                            </div>

                                            {/* Quote */}
                                            <blockquote className="text-lg md:text-xl text-foreground mb-6 italic">
                                                "{currentTestimonial.content}"
                                            </blockquote>

                                            {/* Author */}
                                            <div>
                                                <div className="font-semibold text-foreground">
                                                    {currentTestimonial.name}
                                                </div>
                                                <div className="text-sm text-muted-foreground">
                                                    {currentTestimonial.role}
                                                    {currentTestimonial.company && ` • ${currentTestimonial.company}`}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Navigation buttons */}
                        <div className="flex items-center justify-center gap-4 mt-8">
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={goToPrevious}
                                className="rounded-full"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </Button>

                            {/* Dots */}
                            <div className="flex items-center gap-2">
                                {testimonials.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => {
                                            setDirection(index > currentIndex ? 1 : -1);
                                            setCurrentIndex(index);
                                        }}
                                        className={cn(
                                            "w-2 h-2 rounded-full transition-all duration-300",
                                            index === currentIndex
                                                ? "w-8 bg-primary"
                                                : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                                        )}
                                    />
                                ))}
                            </div>

                            <Button
                                variant="outline"
                                size="icon"
                                onClick={goToNext}
                                className="rounded-full"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
