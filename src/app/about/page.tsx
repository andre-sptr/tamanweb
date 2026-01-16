import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Target, Users, Zap, Shield, Award, Heart } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero */}
      <div className="text-center mb-16">
        <Badge className="mb-4" variant="secondary">Tentang Kami</Badge>
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Membantu Developer Membangun Website Lebih Cepat
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          TAMANWEB adalah platform e-commerce yang menyediakan template website berkualitas tinggi
          untuk developer, desainer, dan pemilik bisnis di Indonesia.
        </p>
      </div>

      {/* Mission & Vision */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 max-w-6xl mx-auto">
        <Card>
          <CardContent className="pt-6">
            <Target className="h-12 w-12 text-primary mb-4" />
            <h2 className="text-2xl font-bold mb-4">Misi Kami</h2>
            <p className="text-muted-foreground">
              Menyediakan template website berkualitas tinggi dengan harga terjangkau,
              membantu developer dan bisnis membangun kehadiran online dengan cepat dan efisien.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <Award className="h-12 w-12 text-primary mb-4" />
            <h2 className="text-2xl font-bold mb-4">Visi Kami</h2>
            <p className="text-muted-foreground">
              Menjadi platform template website terpercaya di Indonesia,
              dengan koleksi template yang modern, responsif, dan mudah dikustomisasi.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Values */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-12">Nilai Kami</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card>
            <CardContent className="pt-6 text-center">
              <Zap className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Kualitas</h3>
              <p className="text-muted-foreground">
                Setiap template melalui quality control ketat untuk memastikan performa dan kode yang bersih.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <Users className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Support</h3>
              <p className="text-muted-foreground">
                Tim kami siap membantu Anda dengan pertanyaan dan masalah teknis yang mungkin terjadi.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <Heart className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Kepedulian</h3>
              <p className="text-muted-foreground">
                Kami peduli dengan kesuksesan Anda dan terus memperbarui template sesuai perkembangan teknologi.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Benefits */}
      <div className="mb-16 bg-muted/50 rounded-lg p-8 md:p-12">
        <h2 className="text-3xl font-bold text-center mb-12">Mengapa Memilih Kami?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          <div className="text-center">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Kode Berkualitas</h3>
            <p className="text-sm text-muted-foreground">
              Dibangun dengan best practices dan teknologi terbaru
            </p>
          </div>
          <div className="text-center">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Zap className="h-8 w-8 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Hemat Waktu</h3>
            <p className="text-sm text-muted-foreground">
              Mulai proyek Anda dalam hitungan menit
            </p>
          </div>
          <div className="text-center">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Full Support</h3>
            <p className="text-sm text-muted-foreground">
              Bantuan teknis untuk pertanyaan Anda
            </p>
          </div>
          <div className="text-center">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Award className="h-8 w-8 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Update Gratis</h3>
            <p className="text-sm text-muted-foreground">
              Mendapatkan update template secara gratis
            </p>
          </div>
        </div>
      </div>

      {/* Team */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-12">Tim Kami</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">AP</span>
              </div>
              <h3 className="font-semibold text-lg mb-1">Andi Pratama</h3>
              <p className="text-sm text-muted-foreground mb-2">Founder & CEO</p>
              <p className="text-sm text-muted-foreground">
                Developer berpengalaman dengan passion di UI/UX dan product development.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">SR</span>
              </div>
              <h3 className="font-semibold text-lg mb-1">Siti Rahayu</h3>
              <p className="text-sm text-muted-foreground mb-2">Lead Designer</p>
              <p className="text-sm text-muted-foreground">
                Desainer visual dengan fokus pada estetika modern dan user experience.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">BS</span>
              </div>
              <h3 className="font-semibold text-lg mb-1">Budi Santoso</h3>
              <p className="text-sm text-muted-foreground mb-2">Technical Lead</p>
              <p className="text-sm text-muted-foreground">
                Full-stack developer dengan keahlian di Next.js, React, dan modern web technologies.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center bg-gradient-to-r from-primary to-blue-600 rounded-lg p-12 text-white">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Siap Memulai Proyek Anda?</h2>
        <p className="text-lg mb-8 text-white/90 max-w-2xl mx-auto">
          Jelajahi koleksi template kami dan mulai membangun website impian Anda hari ini
        </p>
        <Link href="/templates">
          <Button size="lg" variant="secondary" className="text-lg px-8">
            Jelajahi Templates
          </Button>
        </Link>
      </div>
    </div>
  )
}
