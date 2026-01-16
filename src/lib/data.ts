// Mock data for TamanWEB templates

export interface Template {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  price: number;
  category: "Portfolio" | "Landing Page" | "SaaS" | "E-commerce";
  tags: string[];
  previewImages: string[];
  thumbnailUrl: string;
  techStack: string[];
  includedFiles: string[];
  featured: boolean;
  rating: number;
  reviews: number;
}

export const templates: Template[] = [
  {
    id: "1",
    slug: "developer-portfolio-pro",
    title: "Developer Portfolio Pro",
    shortDescription: "Template portfolio modern untuk developer dengan animasi halus dan tampilan profesional.",
    description: `
# Developer Portfolio Pro

Template portfolio premium yang dirancang khusus untuk developer dan programmer. Dengan desain modern dan animasi yang halus, portfolio Anda akan tampil memukau.

## Fitur Utama
- Desain responsif untuk semua perangkat
- Animasi scroll yang smooth
- Section proyek dengan filtering
- Integrasi GitHub API
- Dark/Light mode
- SEO optimized

## Cocok Untuk
- Frontend Developer
- Full-stack Developer
- UI/UX Designer
- Software Engineer
    `,
    price: 199000,
    category: "Portfolio",
    tags: ["React", "Portfolio", "Animasi", "Modern"],
    previewImages: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop"
    ],
    thumbnailUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
    techStack: ["React", "Tailwind CSS", "Framer Motion", "TypeScript"],
    includedFiles: ["Source code lengkap", "Dokumentasi", "Icon pack", "Font files", "Support 6 bulan"],
    featured: true,
    rating: 4.9,
    reviews: 128
  },
  {
    id: "2",
    slug: "creative-agency-starter",
    title: "Creative Agency Starter",
    shortDescription: "Landing page elegan untuk agency kreatif dengan gallery portofolio yang stunning.",
    description: `
# Creative Agency Starter

Landing page profesional untuk agency kreatif. Tampilkan portfolio dan layanan Anda dengan cara yang memukau.

## Fitur Utama
- Hero section dengan video background
- Gallery portfolio dengan lightbox
- Testimonial carousel
- Contact form dengan validasi
- Animasi parallax
- Multi-language ready

## Cocok Untuk
- Design Agency
- Marketing Agency
- Creative Studio
- Freelancer
    `,
    price: 249000,
    category: "Landing Page",
    tags: ["Agency", "Creative", "Parallax", "Gallery"],
    previewImages: [
      "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=800&h=600&fit=crop"
    ],
    thumbnailUrl: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&h=400&fit=crop",
    techStack: ["React", "GSAP", "Tailwind CSS", "Vite"],
    includedFiles: ["Source code", "PSD files", "Icons", "Dokumentasi lengkap"],
    featured: true,
    rating: 4.8,
    reviews: 89
  },
  {
    id: "3",
    slug: "saas-dashboard-kit",
    title: "SaaS Dashboard Kit",
    shortDescription: "Dashboard modern untuk aplikasi SaaS dengan komponen lengkap dan siap pakai.",
    description: `
# SaaS Dashboard Kit

Template dashboard lengkap untuk aplikasi SaaS Anda. Dilengkapi dengan 50+ komponen siap pakai.

## Fitur Utama
- 50+ komponen UI
- Charts dan grafik
- Table dengan sorting & filtering
- Authentication pages
- Settings pages
- Notification system

## Cocok Untuk
- SaaS Startups
- Admin Panels
- Analytics Dashboard
- CRM Systems
    `,
    price: 399000,
    category: "SaaS",
    tags: ["Dashboard", "Admin", "Charts", "Components"],
    previewImages: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop"
    ],
    thumbnailUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
    techStack: ["React", "TypeScript", "Recharts", "Tailwind CSS", "Shadcn/ui"],
    includedFiles: ["Source code", "Figma file", "50+ Components", "Dokumentasi API"],
    featured: true,
    rating: 4.9,
    reviews: 156
  },
  {
    id: "4",
    slug: "minimalist-store",
    title: "Minimalist Store",
    shortDescription: "Template e-commerce minimalis dengan checkout flow yang smooth dan user-friendly.",
    description: `
# Minimalist Store

Template e-commerce dengan desain minimalis namun powerful. Perfect untuk brand fashion atau produk premium.

## Fitur Utama
- Product catalog dengan filter
- Shopping cart
- Wishlist functionality
- Checkout flow
- Order tracking
- Customer reviews

## Cocok Untuk
- Fashion Brand
- Jewelry Store
- Premium Products
- Boutique Shop
    `,
    price: 349000,
    category: "E-commerce",
    tags: ["Store", "Minimalist", "Cart", "Checkout"],
    previewImages: [
      "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop"
    ],
    thumbnailUrl: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=600&h=400&fit=crop",
    techStack: ["React", "Redux", "Stripe", "Tailwind CSS"],
    includedFiles: ["Source code", "Payment integration guide", "SEO setup", "Analytics ready"],
    featured: false,
    rating: 4.7,
    reviews: 94
  },
  {
    id: "5",
    slug: "photographer-showcase",
    title: "Photographer Showcase",
    shortDescription: "Portfolio fotografer dengan gallery immersive dan layout yang memukau.",
    description: `
# Photographer Showcase

Template portfolio khusus untuk fotografer. Gallery immersive dengan transisi yang smooth.

## Fitur Utama
- Fullscreen gallery
- Masonry layout
- Image lazy loading
- EXIF data display
- Client proofing area
- Print shop integration

## Cocok Untuk
- Wedding Photographer
- Portrait Photographer
- Travel Photographer
- Product Photographer
    `,
    price: 179000,
    category: "Portfolio",
    tags: ["Photography", "Gallery", "Fullscreen", "Masonry"],
    previewImages: [
      "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1493863641943-9b68992a8d07?w=800&h=600&fit=crop"
    ],
    thumbnailUrl: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=600&h=400&fit=crop",
    techStack: ["React", "Lightbox", "Lazy Loading", "CSS Grid"],
    includedFiles: ["Source code", "Gallery plugins", "SEO guide", "Hosting guide"],
    featured: false,
    rating: 4.8,
    reviews: 67
  },
  {
    id: "6",
    slug: "startup-launch",
    title: "Startup Launch",
    shortDescription: "Landing page untuk startup dengan sections lengkap untuk presentasi produk.",
    description: `
# Startup Launch

Landing page yang perfect untuk launch produk startup Anda. Konversi visitor menjadi customer.

## Fitur Utama
- Hero dengan product showcase
- Feature highlights
- Pricing tables
- Team section
- Blog integration
- Newsletter signup

## Cocok Untuk
- Tech Startups
- Mobile Apps
- Web Services
- Digital Products
    `,
    price: 229000,
    category: "Landing Page",
    tags: ["Startup", "Launch", "Product", "Conversion"],
    previewImages: [
      "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&h=600&fit=crop"
    ],
    thumbnailUrl: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&h=400&fit=crop",
    techStack: ["React", "Framer Motion", "Tailwind CSS", "React Hook Form"],
    includedFiles: ["Source code", "Email templates", "Analytics setup", "A/B testing guide"],
    featured: true,
    rating: 4.9,
    reviews: 203
  },
  {
    id: "7",
    slug: "analytics-pro",
    title: "Analytics Pro Dashboard",
    shortDescription: "Dashboard analytics dengan visualisasi data yang powerful dan real-time updates.",
    description: `
# Analytics Pro Dashboard

Dashboard analytics enterprise-grade dengan visualisasi data yang comprehensive.

## Fitur Utama
- Real-time data updates
- 20+ chart types
- Custom date ranges
- Export to PDF/Excel
- Team collaboration
- API integration

## Cocok Untuk
- Data Analytics
- Business Intelligence
- Marketing Analytics
- Sales Dashboard
    `,
    price: 499000,
    category: "SaaS",
    tags: ["Analytics", "Charts", "Real-time", "Enterprise"],
    previewImages: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop"
    ],
    thumbnailUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
    techStack: ["React", "D3.js", "WebSocket", "TypeScript", "Zustand"],
    includedFiles: ["Source code", "API documentation", "Database schema", "Deployment guide"],
    featured: false,
    rating: 4.8,
    reviews: 78
  },
  {
    id: "8",
    slug: "fashion-boutique",
    title: "Fashion Boutique",
    shortDescription: "E-commerce fashion dengan lookbook feature dan product customization.",
    description: `
# Fashion Boutique

Template e-commerce premium untuk brand fashion. Dengan lookbook dan virtual try-on ready.

## Fitur Utama
- Lookbook galleries
- Size guide tool
- Color variants
- Quick view modal
- Instagram shop integration
- Loyalty program ready

## Cocok Untuk
- Fashion Brands
- Clothing Stores
- Accessories Shop
- Luxury Retail
    `,
    price: 449000,
    category: "E-commerce",
    tags: ["Fashion", "Lookbook", "Premium", "Instagram"],
    previewImages: [
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&h=600&fit=crop"
    ],
    thumbnailUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop",
    techStack: ["React", "Next.js", "Stripe", "Sanity CMS", "Tailwind CSS"],
    includedFiles: ["Source code", "CMS setup", "Payment gateway", "Marketing tools"],
    featured: true,
    rating: 4.9,
    reviews: 134
  }
];

export const categories = [
  { name: "Portfolio", count: 2, icon: "Briefcase" },
  { name: "Landing Page", count: 2, icon: "Rocket" },
  { name: "SaaS", count: 2, icon: "LayoutDashboard" },
  { name: "E-commerce", count: 2, icon: "ShoppingBag" },
] as const;

export const testimonials = [
  {
    id: 1,
    name: "Ahmad Rizki",
    role: "Freelance Developer",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    quote: "Template dari TamanWEB sangat membantu saya mempercepat development. Kode bersih dan dokumentasi lengkap!"
  },
  {
    id: 2,
    name: "Sarah Putri",
    role: "UI/UX Designer",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
    quote: "Desainnya modern dan eye-catching. Sangat mudah di-customize sesuai kebutuhan client saya."
  },
  {
    id: 3,
    name: "Budi Santoso",
    role: "Startup Founder",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    quote: "Dengan template SaaS Dashboard, saya bisa launch MVP dalam waktu 2 minggu. Highly recommended!"
  },
  {
    id: 4,
    name: "Diana Kusuma",
    role: "Agency Owner",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    quote: "Sudah beli 5 template dan semuanya berkualitas tinggi. Support team juga sangat responsif."
  }
];

export const faqs = [
  {
    question: "Apa yang termasuk dalam pembelian template?",
    answer: "Setiap pembelian template mencakup source code lengkap, dokumentasi, aset desain (jika ada), dan dukungan teknis selama 6 bulan."
  },
  {
    question: "Apakah saya bisa menggunakan template untuk project client?",
    answer: "Ya, lisensi kami memperbolehkan penggunaan untuk project client. Anda bisa menggunakan template untuk unlimited projects, baik personal maupun komersial."
  },
  {
    question: "Bagaimana cara mendapatkan update template?",
    answer: "Setelah pembelian, Anda akan mendapat akses ke semua update gratis selamanya. Notifikasi update akan dikirim melalui email."
  },
  {
    question: "Apakah ada kebijakan refund?",
    answer: "Ya, kami menyediakan refund 100% dalam 14 hari jika template tidak sesuai ekspektasi. Hubungi support kami untuk proses refund."
  },
  {
    question: "Apakah template support dark mode?",
    answer: "Sebagian besar template kami sudah dilengkapi dengan dark mode. Informasi ini tercantum di halaman detail setiap template."
  },
  {
    question: "Bagaimana jika saya butuh customization?",
    answer: "Kami menyediakan layanan customization dengan biaya tambahan. Hubungi kami melalui halaman kontak untuk diskusi kebutuhan Anda."
  }
];

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price);
}

export function getTemplateBySlug(slug: string): Template | undefined {
  return templates.find(t => t.slug === slug);
}

export function getFeaturedTemplates(): Template[] {
  return templates.filter(t => t.featured);
}

export function getTemplatesByCategory(category: string): Template[] {
  return templates.filter(t => t.category === category);
}

export function getRelatedTemplates(template: Template, limit: number = 4): Template[] {
  return templates
    .filter(t => t.category === template.category && t.id !== template.id)
    .slice(0, limit);
}
