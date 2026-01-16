import { Link } from 'next/link'
import { ArrowRight, Check, Sparkles, Zap, Shield, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-b from-blue-50 to-background dark:from-blue-950/20 dark:to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <Badge className="mb-4" variant="secondary">
              <Sparkles className="mr-1 h-3 w-3" />
              Template Website Premium
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Bangun Website Impian dengan Template Profesional
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Koleksi template website berkualitas tinggi untuk portfolio, landing page, SaaS, dan e-commerce.
              Hemat waktu dan mulai dengan desain yang sudah teruji.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link href="/templates">
                <Button size="lg" className="text-lg px-8">
                  Jelajahi Templates
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/about">
                <Button size="lg" variant="outline" className="text-lg px-8">
                  Pelajari Lebih Lanjut
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card>
              <CardHeader>
                <Zap className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Desain Modern</CardTitle>
                <CardDescription>
                  Template dengan desain terkini mengikuti tren UI/UX terbaik
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <Clock className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Hemat Waktu</CardTitle>
                <CardDescription>
                  Mulai proyek Anda dalam hitungan menit, bukan jam
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <Shield className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Kode Berkualitas</CardTitle>
                <CardDescription>
                  Dibangun dengan teknologi terbaik dan praktik coding yang benar
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Pilih Kategori Template</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Temukan template yang sesuai dengan kebutuhan proyek Anda
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {categories.map((category) => (
              <Link key={category.name} href={`/templates?category=${category.slug}`}>
                <Card className="group hover:shadow-lg transition-all cursor-pointer border-2 hover:border-primary">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-primary/10 group-hover:bg-primary/20 flex items-center justify-center mb-4 transition-colors">
                      <category.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="group-hover:text-primary transition-colors">
                      {category.name}
                    </CardTitle>
                    <CardDescription>{category.description}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Templates Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              <Sparkles className="mr-1 h-3 w-3" />
              Pilihan Terbaik
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Template Featured</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Template paling populer yang banyak diminati oleh developer
            </p>
          </div>
          <div className="text-center">
            <Link href="/templates?featured=true">
              <Button size="lg">
                Lihat Semua Featured Templates
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Apa Kata Mereka</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Testimoni dari developer yang telah menggunakan template kami
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.name}>
                <CardHeader>
                  <CardDescription className="text-base italic">
                    "{testimonial.content}"
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="font-semibold text-primary">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Pertanyaan Umum</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Temukan jawaban untuk pertanyaan yang sering diajukan
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-background to-blue-50 dark:to-blue-950/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
              Siap Mulai Membangun Website Impian?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Dapatkan akses ke koleksi template website premium dan mulai proyek Anda hari ini
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link href="/templates">
                <Button size="lg" className="text-lg px-8">
                  Jelajahi Templates
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

const categories = [
  {
    name: 'Portfolio',
    slug: 'Portfolio',
    description: 'Tampilkan karya terbaik Anda',
    icon: Sparkles,
  },
  {
    name: 'Landing Page',
    slug: 'Landing',
    description: 'Konversi pengunjung dengan landing page',
    icon: Zap,
  },
  {
    name: 'SaaS',
    slug: 'SaaS',
    description: 'Template untuk aplikasi SaaS',
    icon: Shield,
  },
  {
    name: 'E-commerce',
    slug: 'E-commerce',
    description: 'Mulai toko online dengan mudah',
    icon: Clock,
  },
]

const testimonials = [
  {
    name: 'Andi Pratama',
    role: 'Freelance Developer',
    content: 'Template dari TAMANWEB sangat membantu saya menyelesaikan proyek lebih cepat. Kode bersih dan mudah dikustomisasi.',
  },
  {
    name: 'Siti Rahayu',
    role: 'Product Manager',
    content: 'Kualitas template di sini sangat baik. Desain modern dan responsif. Sangat recommended!',
  },
  {
    name: 'Budi Santoso',
    role: 'Startup Founder',
    content: 'Membangun landing page untuk startup saya jadi jauh lebih cepat. Support juga sangat responsif.',
  },
]

const faqs = [
  {
    question: 'Apakah template bisa dikustomisasi?',
    answer: 'Ya, semua template kami dapat dikustomisasi sepenuhnya. Anda dapat mengubah warna, layout, konten, dan fitur sesuai kebutuhan.',
  },
  {
    question: 'Bagaimana cara mendapatkan template?',
    answer: 'Anda dapat membeli template melalui halaman detail produk. Setelah pembayaran selesai, Anda akan mendapatkan akses download.',
  },
  {
    question: 'Apakah ada garansi atau refund?',
    answer: 'Kami menyediakan demo untuk setiap template sebelum pembelian. Jika ada masalah teknis, kami akan membantu memperbaikinya.',
  },
  {
    question: 'Apakah template support SEO?',
    answer: 'Ya, semua template kami sudah dioptimalkan untuk SEO dengan struktur meta tags, sitemap, dan performa yang baik.',
  },
  {
    question: 'Bagaimana dengan update template?',
    answer: 'Anda akan mendapatkan update gratis untuk template yang Anda beli. Kami akan memberitahu jika ada update tersedia.',
  },
  {
    question: 'Apakah bisa menggunakan template untuk klien?',
    answer: 'Ya, Anda dapat menggunakan template untuk proyek pribadi maupun klien Anda. Lisensi kami mengizinkan penggunaan komersial.',
  },
]
