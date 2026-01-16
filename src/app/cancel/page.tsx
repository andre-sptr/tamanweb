import { XCircle, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'

export default function CancelPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardContent className="pt-12 pb-12 text-center space-y-8">
            {/* Cancel Icon */}
            <div className="mx-auto">
              <XCircle className="h-20 w-20 text-red-500 mx-auto" />
            </div>

            {/* Cancel Message */}
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Pembayaran Dibatalkan
              </h1>
              <p className="text-lg text-muted-foreground">
                Pembayaran Anda telah dibatalkan. Jangan khawatir, tidak ada
                tagihan yang diproses.
              </p>
            </div>

            {/* Info Box */}
            <div className="bg-muted/50 rounded-lg p-6 text-left space-y-4">
              <h2 className="font-semibold text-lg">Yang Terjadi?</h2>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Pembayaran tidak selesai atau dibatalkan oleh Anda</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Tidak ada tagihan yang dibebankan ke kartu Anda</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Anda dapat membatalkan pembayaran kapan saja</span>
                </li>
              </ul>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/templates">
                <Button size="lg" className="w-full sm:w-auto">
                  Kembali ke Templates
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>

            {/* Help Section */}
            <div className="text-sm text-muted-foreground space-y-2 pt-4">
              <p>Mengalami kesulitan atau memiliki pertanyaan?</p>
              <p>Tim support kami siap membantu Anda.</p>
            </div>
          </CardContent>
        </Card>

        {/* Help CTA */}
        <div className="mt-8 text-center">
          <p className="text-muted-foreground mb-4">
            Butuh bantuan?
          </p>
          <Link href="/contact">
            <Button variant="outline">Hubungi Support</Button>
          </Link>
        </div>

        {/* FAQ Hint */}
        <div className="mt-8 bg-muted/50 rounded-lg p-6 text-center">
          <h3 className="font-semibold mb-2">Pertanyaan Umum</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Pelajari lebih lanjut tentang pembayaran dan keamanan transaksi.
          </p>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/#faq">Lihat FAQ</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
