import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Star,
  Check,
  ShoppingCart,
  ExternalLink,
  Share2,
  Heart,
  ChevronLeft,
  ChevronRight,
  CheckCircle
} from "lucide-react";
import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TemplateCard } from "@/components/templates/TemplateCard";
import { useCart } from "@/contexts/CartProvider";
import {
  getTemplateBySlug,
  getRelatedTemplates,
  formatPrice
} from "@/lib/data";
import { cn } from "@/lib/utils";

// Tech stack icons (simplified - using text for now)
const techColors: Record<string, string> = {
  "React": "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  "Vue": "bg-green-500/10 text-green-600 dark:text-green-400",
  "Next.js": "bg-gray-500/10 text-gray-600 dark:text-gray-400",
  "Tailwind CSS": "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400",
  "TypeScript": "bg-blue-600/10 text-blue-700 dark:text-blue-300",
  "Framer Motion": "bg-pink-500/10 text-pink-600 dark:text-pink-400",
  "GSAP": "bg-green-600/10 text-green-700 dark:text-green-300",
  "Vite": "bg-purple-500/10 text-purple-600 dark:text-purple-400",
  "Shadcn/ui": "bg-gray-500/10 text-gray-600 dark:text-gray-400",
  "Recharts": "bg-orange-500/10 text-orange-600 dark:text-orange-400",
  "Redux": "bg-purple-600/10 text-purple-700 dark:text-purple-300",
  "Stripe": "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400",
  "D3.js": "bg-orange-600/10 text-orange-700 dark:text-orange-300",
  "WebSocket": "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400",
  "Zustand": "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  "Sanity CMS": "bg-red-500/10 text-red-600 dark:text-red-400",
  "Lightbox": "bg-slate-500/10 text-slate-600 dark:text-slate-400",
  "Lazy Loading": "bg-teal-500/10 text-teal-600 dark:text-teal-400",
  "CSS Grid": "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  "React Hook Form": "bg-rose-500/10 text-rose-600 dark:text-rose-400",
};

export default function TemplateDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const { addItem, isInCart } = useCart();

  const template = slug ? getTemplateBySlug(slug) : undefined;

  if (!template) {
    return <Navigate to="/templates" replace />;
  }

  const relatedTemplates = getRelatedTemplates(template);

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === template.previewImages.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? template.previewImages.length - 1 : prev - 1
    );
  };

  return (
    <Layout>
      {/* Breadcrumb */}
      <section className="pt-28 pb-4 bg-muted/30">
        <div className="container">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-colors">
              Beranda
            </Link>
            <span>/</span>
            <Link to="/templates" className="hover:text-primary transition-colors">
              Template
            </Link>
            <span>/</span>
            <span className="text-foreground">{template.title}</span>
          </nav>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 bg-muted/30">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Image Gallery */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Main Image */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-card border border-border shadow-lg">
                <img
                  src={template.previewImages[currentImageIndex]}
                  alt={`${template.title} preview ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover"
                />

                {/* Navigation Arrows */}
                {template.previewImages.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-background transition-colors shadow-lg"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-background transition-colors shadow-lg"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}

                {/* Image Counter */}
                <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-full bg-background/80 backdrop-blur-sm text-sm font-medium text-foreground">
                  {currentImageIndex + 1} / {template.previewImages.length}
                </div>
              </div>

              {/* Thumbnail Strip */}
              {template.previewImages.length > 1 && (
                <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
                  {template.previewImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={cn(
                        "flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all",
                        currentImageIndex === index
                          ? "border-primary shadow-primary"
                          : "border-transparent opacity-70 hover:opacity-100"
                      )}
                    >
                      <img
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-6"
            >
              {/* Category & Featured */}
              <div className="flex items-center gap-3">
                <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
                  {template.category}
                </Badge>
                {template.featured && (
                  <Badge className="bg-warning/10 text-warning hover:bg-warning/20">
                    ⭐ Featured
                  </Badge>
                )}
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                {template.title}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "w-5 h-5",
                        i < Math.floor(template.rating)
                          ? "fill-warning text-warning"
                          : "fill-muted text-muted"
                      )}
                    />
                  ))}
                </div>
                <span className="font-semibold text-foreground">{template.rating}</span>
                <span className="text-muted-foreground">({template.reviews} ulasan)</span>
              </div>

              {/* Price */}
              <div className="py-4 border-y border-border">
                <div className="text-3xl font-bold text-primary">
                  {formatPrice(template.price)}
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Termasuk update gratis selamanya
                </p>
              </div>

              {/* Short Description */}
              <p className="text-muted-foreground leading-relaxed">
                {template.shortDescription}
              </p>

              {/* Tech Stack */}
              <div>
                <h3 className="font-semibold text-foreground mb-3">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {template.techStack.map((tech) => (
                    <span
                      key={tech}
                      className={cn(
                        "px-3 py-1.5 rounded-lg text-sm font-medium",
                        techColors[tech] || "bg-muted text-muted-foreground"
                      )}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Included Files */}
              <div>
                <h3 className="font-semibold text-foreground mb-3">Termasuk dalam Paket</h3>
                <ul className="space-y-2">
                  {template.includedFiles.map((file, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-success flex-shrink-0" />
                      {file}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {template.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs font-medium bg-muted text-muted-foreground rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button
                  variant={isInCart(template.id) ? "outline" : "hero"}
                  size="xl"
                  className="flex-1"
                  onClick={() => addItem(template)}
                >
                  {isInCart(template.id) ? (
                    <>
                      <CheckCircle className="w-5 h-5 mr-2 text-success" />
                      Sudah di Keranjang
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-5 h-5 mr-2" />
                      Beli Sekarang
                    </>
                  )}
                </Button>
                <Button variant="outline" size="xl">
                  <ExternalLink className="w-5 h-5 mr-2" />
                  Live Preview
                </Button>
              </div>

              {/* Secondary Actions */}
              <div className="flex items-center gap-4 pt-2">
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className={cn(
                    "flex items-center gap-2 text-sm transition-colors",
                    isLiked ? "text-destructive" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Heart className={cn("w-5 h-5", isLiked && "fill-current")} />
                  Simpan
                </button>
                <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                  <Share2 className="w-5 h-5" />
                  Bagikan
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Description */}
      <section className="py-12 bg-background">
        <div className="container">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-bold text-foreground mb-6">Deskripsi</h2>
            <div className="prose prose-lg prose-gray dark:prose-invert max-w-none">
              {template.description.split('\n').map((line, index) => {
                if (line.startsWith('# ')) {
                  return <h2 key={index} className="text-2xl font-bold mt-8 mb-4">{line.slice(2)}</h2>;
                }
                if (line.startsWith('## ')) {
                  return <h3 key={index} className="text-xl font-semibold mt-6 mb-3">{line.slice(3)}</h3>;
                }
                if (line.startsWith('- ')) {
                  return (
                    <li key={index} className="flex items-start gap-2 text-muted-foreground ml-4">
                      <Check className="w-4 h-4 text-success mt-1 flex-shrink-0" />
                      {line.slice(2)}
                    </li>
                  );
                }
                if (line.trim()) {
                  return <p key={index} className="text-muted-foreground mb-4">{line}</p>;
                }
                return null;
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Related Templates */}
      {relatedTemplates.length > 0 && (
        <section className="py-16 bg-muted/30">
          <div className="container">
            <h2 className="text-2xl font-bold text-foreground mb-8">
              Template Serupa
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedTemplates.map((t, index) => (
                <TemplateCard key={t.id} template={t} index={index} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Back Link */}
      <section className="py-8 bg-background border-t border-border">
        <div className="container">
          <Button variant="ghost" asChild>
            <Link to="/templates">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali ke Koleksi
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
}
