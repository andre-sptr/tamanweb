import { Card, CardContent } from '@/components/ui/card'

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-4xl">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Kebijakan Privasi</h1>
        <p className="text-lg text-muted-foreground">
          Terakhir diperbarui: {new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>

      <div className="space-y-8">
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-4">1. Pendahuluan</h2>
            <p className="text-muted-foreground">
              TAMANWEB berkomitmen untuk melindungi privasi dan keamanan data pribadi Anda.
              Kebijakan privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi Anda.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-4">2. Informasi yang Kami Kumpulkan</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>Kami mengumpulkan informasi berikut:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <strong>Informasi Akun:</strong> Nama, email, dan profil gambar (jika Anda login dengan Google)
                </li>
                <li>
                  <strong>Informasi Pembayaran:</strong> Detail pembayaran diproses oleh Stripe
                </li>
                <li>
                  <strong>Informasi Transaksi:</strong> Riwayat pembelian dan download template
                </li>
                <li>
                  <strong>Informasi Kontak:</strong> Jika Anda menghubungi kami melalui form kontak
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-4">3. Penggunaan Informasi</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>Kami menggunakan informasi Anda untuk:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Memproses pembayaran dan menyediakan akses download</li>
                <li>Mengirimkan konfirmasi pembelian dan update template</li>
                <li>Menyediakan dukungan pelanggan</li>
                <li>Meningkatkan layanan kami</li>
                <li>Mematuhi kewajiban hukum</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-4">4. Pembayaran & Keamanan</h2>
            <p className="text-muted-foreground">
              Semua pembayaran diproses oleh <strong>Stripe</strong>, platform pembayaran yang aman.
              Kami tidak menyimpan informasi kartu kredit atau detail pembayaran Anda di server kami.
            </p>
            <p className="text-muted-foreground mt-4">
              Stripe akan mengirimkan email receipt ke alamat email Anda setelah pembayaran berhasil.
              Email ini dapat dinonaktifkan melalui pengaturan Stripe Dashboard.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-4">5. Cookies</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>Kami menggunakan cookies untuk:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Mengingat preferensi tema Anda (light/dark mode)</li>
                <li>Mengelola sesi login Anda</li>
                <li>Memperbaiki pengalaman pengguna</li>
              </ul>
              <p className="mt-4">
                Anda dapat mengatur preferensi cookie melalui pengaturan browser Anda.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-4">6. Bagian Ketiga</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>Kami dapat membagikan informasi Anda dengan:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Stripe:</strong> Untuk memproses pembayaran</li>
                <li><strong>Google:</strong> Untuk autentikasi (Google OAuth)</li>
              </ul>
              <p className="mt-4">
                Kami tidak menjual informasi pribadi Anda kepada pihak ketiga.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-4">7. Hak Anda</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>Anda memiliki hak untuk:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Mengakses data pribadi Anda</li>
                <li>Memperbarui data pribadi Anda</li>
                <li>Menghapus akun Anda dan data terkait</li>
                <li>Meminta salinan data Anda</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-4">8. Keamanan Data</h2>
            <p className="text-muted-foreground">
              Kami mengambil langkah-langkah keamanan yang wajar untuk melindungi informasi Anda,
              termasuk enkripsi data, akses terbatas, dan pemantauan keamanan berkala.
              Namun, tidak ada metode transmisi melalui internet yang 100% aman.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-4">9. Perubahan Kebijakan</h2>
            <p className="text-muted-foreground">
              Kami dapat memperbarui kebijakan privasi ini kapan saja. Perubahan akan diberitahukan
              melalui email atau posting di website kami. Penggunaan layanan yang berkelanjutan
              setelah perubahan dianggap sebagai penerimaan terhadap kebijakan yang baru.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-4">10. Kontak</h2>
            <p className="text-muted-foreground">
              Jika Anda memiliki pertanyaan tentang kebijakan privasi ini, silakan hubungi kami di:
            </p>
            <p className="text-primary font-semibold mt-2">support@tamanweb.com</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
