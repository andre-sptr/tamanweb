import { CheckCircle, ArrowRight, Download, ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'

interface SuccessPageProps {
  searchParams: {
    session_id?: string
  }
}

export default async function SuccessPage({
  searchParams,
}: SuccessPageProps) {
  const sessionId = searchParams.session_id

  // TODO: Verify session and fetch transaction details
  // For now, showing a success message

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardContent className="pt-12 pb-12 text-center space-y-8">
            {/* Success Icon */}
            <div className="mx-auto">
              <CheckCircle className="h-20 w-20 text-green-500 mx-auto" />
            </div>

            {/* Success Message */}
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Pembayaran Berhasil!
              </h1>
              <p className="text-lg text-muted-foreground">
                Terima kasih atas pembelian Anda. Akses produk Anda telah diaktifkan.
              </p>
            </div>

            {/* Order Summary */}
            <div className="bg-muted/50 rounded-lg p-6 text-left space-y-4">
              <h2 className="font-semibold text-lg">Ringkasan Pesanan</h2>
              {sessionId && (
                <div className="text-sm">
                  <span className="text-muted-foreground">Order ID:</span>{' '}
                  <span className="font-mono">{sessionId}</span>
                </div>
              )}
              <div className="text-sm">
                <span className="text-muted-foreground">Status:</span>{' '}
                <span className="text-green-600 font-medium">Pembayaran Selesai</span>
              </div>
            </div>

            {/* Email Receipt Info */}
            <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 text-sm">
              <p className="text-blue-900 dark:text-blue-100">
                <strong>Info:</strong> Email receipt telah dikirim oleh Stripe
                (jika fitur receipts diaktifkan di Stripe Dashboard).
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/purchases">
                <Button size="lg" className="w-full sm:w-auto">
                  <Download className="mr-2 h-5 w-5" />
                  Lihat Pembelian Saya
                </Button>
              </Link>
              <Link href="/templates">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  Jelajahi Template Lainnya
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>

            {/* Additional Info */}
            <div className="text-sm text-muted-foreground space-y-2 pt-4">
              <p>📧 Jika Anda tidak menerima email receipt dalam 5 menit:</p>
              <ul className="list-disc list-inside ml-4">
                <li>Cek folder spam/junk email Anda</li>
                <li>Pastikan alamat email yang digunakan benar</li>
                <li>Login ke Stripe untuk melihat riwayat pembayaran</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Help Section */}
        <div className="mt-8 text-center">
          <p className="text-muted-foreground mb-4">
            Mengalami masalah atau memiliki pertanyaan?
          </p>
          <Link href="/contact">
            <Button variant="outline">Hubungi Support</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
