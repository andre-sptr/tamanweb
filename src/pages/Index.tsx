import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  Sparkles, 
  Zap, 
  Shield, 
  HeartHandshake,
  Briefcase,
  Rocket,
  LayoutDashboard,
  ShoppingBag,
  Star,
  ChevronDown
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { TemplateCard } from "@/components/templates/TemplateCard";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  getFeaturedTemplates, 
  categories, 
  testimonials, 
  faqs,
  formatPrice 
} from "@/lib/data";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const iconMap: Record<string, React.ElementType> = {
  Briefcase: Briefcase,
  Rocket: Rocket,
  LayoutDashboard: LayoutDashboard,
  ShoppingBag: ShoppingBag,
};

const benefits = [
  {
    icon: Sparkles,
    title: "Desain Modern",
    description: "Template dengan desain terkini mengikuti trend terbaru dalam web design."
  },
  {
    icon: Zap,
    title: "Performa Optimal",
    description: "Dioptimasi untuk loading cepat dengan skor Lighthouse tinggi."
  },
  {
    icon: Shield,
    title: "Kode Bersih",
    description: "Best practices dan dokumentasi lengkap untuk kemudahan development."
  },
  {
    icon: HeartHandshake,
    title: "Support 6 Bulan",
    description: "Dukungan teknis profesional untuk setiap pembelian template."
  }
];

export default function Index() {
  const featuredTemplates = getFeaturedTemplates();

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center gradient-hero overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />
        </div>

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
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8"
            >
              <Sparkles className="w-4 h-4" />
              Template Premium untuk Profesional
            </motion.div>

            {/* Heading */}
            <motion.h1 
              variants={fadeInUp}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground mb-6 leading-tight"
            >
              Koleksi Template Website{" "}
              <span className="text-gradient">Profesional</span>{" "}
              untuk Bisnis Anda
            </motion.h1>

            {/* Subheading */}
            <motion.p 
              variants={fadeInUp}
              className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto"
            >
              Template siap pakai, modern, responsif, dan SEO-friendly. 
              Hemat waktu development hingga 80% dengan kode berkualitas tinggi.
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
              <Button variant="hero-secondary" size="xl" asChild>
                <Link to="/about">
                  Pelajari Lebih Lanjut
                </Link>
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div 
              variants={fadeInUp}
              className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto"
            >
              {[
                { value: "50+", label: "Template" },
                { value: "2.5k+", label: "Pengguna" },
                { value: "4.9", label: "Rating" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-primary">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
          >
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
              <span className="text-xs uppercase tracking-wider">Scroll</span>
              <ChevronDown className="w-5 h-5 animate-bounce" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Templates Section */}
      <section className="py-24 bg-background">
        <div className="container">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Template <span className="text-gradient">Unggulan</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Pilihan terbaik dari koleksi kami, dipilih berdasarkan popularitas dan rating tertinggi.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredTemplates.slice(0, 6).map((template, index) => (
              <TemplateCard key={template.id} template={template} index={index} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" size="lg" asChild>
              <Link to="/templates">
                Lihat Semua Template
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-24 bg-muted/30">
        <div className="container">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Kategori <span className="text-gradient">Template</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Temukan template yang sesuai dengan kebutuhan bisnis Anda.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => {
              const Icon = iconMap[category.icon] || Briefcase;
              return (
                <motion.div
                  key={category.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link 
                    to={`/templates?category=${encodeURIComponent(category.name)}`}
                    className="group block p-8 bg-card rounded-2xl border border-border shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
                  >
                    <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-primary">
                      <Icon className="w-7 h-7 text-primary-foreground" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {category.count} template tersedia
                    </p>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-background">
        <div className="container">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Mengapa Memilih <span className="text-gradient">TamanWEB</span>?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Kami berkomitmen memberikan template berkualitas tinggi untuk kesuksesan proyek Anda.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6"
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
                  <benefit.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-muted/30">
        <div className="container">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Apa Kata <span className="text-gradient">Pelanggan Kami</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Bergabung dengan ribuan profesional yang telah menggunakan template kami.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card p-6 rounded-2xl border border-border shadow-md"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-warning text-warning" />
                  ))}
                </div>
                <p className="text-foreground mb-6 text-sm leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-foreground text-sm">
                      {testimonial.name}
                    </div>
                    <div className="text-muted-foreground text-xs">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-background">
        <div className="container max-w-3xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
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

      {/* CTA Section */}
      <section className="py-24 bg-primary">
        <div className="container">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
              Siap Memulai Proyek Anda?
            </h2>
            <p className="text-primary-foreground/80 mb-10">
              Dapatkan template profesional sekarang dan mulai bangun website impian Anda.
            </p>
            <Button 
              variant="hero-secondary" 
              size="xl" 
              className="bg-white text-primary hover:bg-white/90 border-0"
              asChild
            >
              <Link to="/templates">
                Jelajahi Template
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
