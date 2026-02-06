import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Play } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { TemplateCard } from "@/components/templates/TemplateCard";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { TextReveal, GradientTextReveal } from "@/components/ui/text-reveal";
import { StatsSection } from "@/components/sections/StatsSection";
import { TestimonialsCarousel } from "@/components/sections/TestimonialsCarousel";
import { FeaturesGrid } from "@/components/sections/FeaturesGrid";
import { CategoryShowcase } from "@/components/sections/CategoryShowcase";
import { PartnersMarquee } from "@/components/sections/PartnersMarquee";
import { getFeaturedTemplates, faqs } from "@/lib/data";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function Index() {
  const featuredTemplates = getFeaturedTemplates();

  return (
    <Layout>
      {/* Hero Section - Enhanced */}
      <section className="relative min-h-screen flex items-center gradient-hero overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-float" />
          <div
            className="absolute bottom-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float"
            style={{ animationDelay: "1s" }}
          />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl"
          />
        </div>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:64px_64px]" />

        <div className="container relative z-10 pt-32 pb-20">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial="initial"
            animate="animate"
            variants={staggerChildren}
          >
            {/* Badge */}
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8 border border-primary/20"
            >
              <Sparkles className="w-4 h-4" />
              <span>50+ Template Premium Tersedia</span>
            </motion.div>

            {/* Title with Text Reveal */}
            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight"
            >
              <TextReveal variant="slide" by="word" delay={0.2}>
                Template Website
              </TextReveal>
              <br />
              <GradientTextReveal delay={0.4}>
                Profesional & Modern
              </GradientTextReveal>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={fadeInUp}
              className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed"
            >
              Koleksi template website siap pakai dengan desain premium,
              performa optimal, dan harga terjangkau untuk developer Indonesia.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Button variant="hero" size="xl" asChild>
                <Link to="/templates">
                  Jelajahi Template
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="xl"
                className="group"
                onClick={() => window.open("https://demo.tamanweb.com", "_blank")}
              >
                <Play className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                Lihat Demo
              </Button>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              variants={fadeInUp}
              className="mt-12 flex items-center justify-center gap-8 text-sm text-muted-foreground"
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-success rounded-full" />
                Free Updates
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-success rounded-full" />
                Support 6 Bulan
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-success rounded-full" />
                Dokumentasi Lengkap
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
            <motion.div
              className="w-1 h-2 bg-primary rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* Partners/Tech Marquee */}
      <PartnersMarquee />

      {/* Stats Section */}
      <StatsSection />

      {/* Featured Templates Section */}
      <section className="py-24 bg-muted/30">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-between mb-12"
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                Template <span className="text-gradient">Unggulan</span>
              </h2>
              <p className="text-muted-foreground">
                Pilihan terbaik dari koleksi template premium kami.
              </p>
            </div>
            <Button variant="outline" asChild className="hidden md:flex">
              <Link to="/templates">
                Lihat Semua
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featuredTemplates.slice(0, 8).map((template, index) => (
              <TemplateCard key={template.id} template={template} index={index} />
            ))}
          </div>

          <div className="text-center mt-10 md:hidden">
            <Button variant="outline" asChild>
              <Link to="/templates">
                Lihat Semua Template
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Category Showcase */}
      <CategoryShowcase />

      {/* Features Grid */}
      <FeaturesGrid />

      {/* Testimonials Carousel */}
      <TestimonialsCarousel />

      {/* FAQ Section */}
      <section className="py-24 bg-background">
        <div className="container max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Pertanyaan <span className="text-gradient">Umum</span>
            </h2>
            <p className="text-muted-foreground">
              Temukan jawaban untuk pertanyaan yang sering diajukan.
            </p>
          </motion.div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <AccordionItem
                  value={`item-${index}`}
                  className="bg-card border border-border rounded-xl px-6 shadow-sm"
                >
                  <AccordionTrigger className="text-left font-semibold hover:no-underline py-5">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-5">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA Section - Enhanced */}
      <section className="py-24 relative overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 gradient-primary" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[size:32px_32px]" />

        <div className="container relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
              Siap Memulai Proyek Anda?
            </h2>
            <p className="text-primary-foreground/80 mb-10 text-lg">
              Dapatkan template profesional sekarang dan mulai bangun website
              impian Anda dalam hitungan menit.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="xl"
                className="bg-white text-primary hover:bg-white/90 border-0 shadow-lg"
                asChild
              >
                <Link to="/templates">
                  Jelajahi Template
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="xl"
                className="border-white/30 text-white hover:bg-white/10"
                asChild
              >
                <Link to="/contact">Hubungi Kami</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
