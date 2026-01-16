import { Card, CardContent } from '@/components/ui/card'

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-4xl">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Syarat & Ketentuan</h1>
        <p className="text-lg text-muted-foreground">
          Terakhir diperbarui: {new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>

      <div className="space-y-8">
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-4">1. Pendahuluan</h2>
            <p className="text-muted-foreground mb-4">
              Selamat datang di TAMANWEB. Dengan mengakses atau menggunakan layanan kami,
              Anda setuju untuk mematuhi syarat dan ketentuan ini. Harap baca dengan cermat.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-4">2. Penggunaan Layanan</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Anda setuju untuk menggunakan layanan kami hanya untuk tujuan yang sah dan
                sesuai dengan hukum yang berlaku. Anda tidak diperbolehkan:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Menggunakan template untuk tujuan ilegal atau tidak sah</li>
                <li>Mendistribusikan kembali template tanpa izin tertulis</li>
                <li>Menghapus atau mengubah hak cipta atau atribusi dari template</li>
                <li>Menggunakan template untuk membangun layanan yang bersaing dengan TAMANWEB</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-4" id="license">3. Lisensi</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Setiap template yang Anda beli dilindungi oleh lisensi. Dengan membeli template,
                Anda mendapatkan:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Hak untuk menggunakan template dalam proyek pribadi dan komersial</li>
                <li>Hak untuk mengkustomisasi template sesuai kebutuhan Anda</li>
                <li>Akses ke update gratis template</li>
                <li>Support teknis untuk masalah terkait template</li>
              </ul>
              <p className="mt-4">
                Lisensi bersifat perpetual setelah pembayaran selesai.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-4">4. Pembayaran & Refund</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Semua pembayaran dilakukan melalui Stripe dalam mata uang IDR.
                Pembayaran bersifat final dan tidak dapat dikembalikan kecuali:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Template yang Anda beli tidak dapat digunakan karena bug teknis yang parah</li>
                <li>Kesalahan dalam pemrosesan pembayaran</li>
                <li>Pembelian ganda yang tidak disengaja</li>
              </ul>
              <p className="mt-4">
                Permintaan refund harus diajukan dalam waktu 14 hari setelah pembelian.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-4">5. Kepemilikan Intelektual</h2>
            <p className="text-muted-foreground">
              Semua template, desain, dan konten yang tersedia di TAMANWEB dilindungi oleh hak cipta.
              Anda tidak mendapatkan hak kepemilikan atas template, melainkan lisensi untuk menggunakannya.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-4">6. Batasan Tanggung Jawab</h2>
            <p className="text-muted-foreground">
              TAMANWEB tidak bertanggung jawab atas kerusakan langsung, tidak langsung, insidental,
              atau konsekuensial yang timbul dari penggunaan atau ketidakmampuan untuk menggunakan layanan kami.
              Kami tidak menjamin bahwa layanan akan selalu tersedia tanpa gangguan.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-4">7. Perubahan Syarat & Ketentuan</h2>
            <p className="text-muted-foreground">
              Kami berhak untuk mengubah syarat dan ketentuan ini kapan saja dengan memberikan
              pemberitahuan kepada pengguna. Penggunaan layanan yang berkelanjutan setelah
              perubahan dianggap sebagai penerimaan terhadap syarat dan ketentuan yang baru.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-4">8. Kontak</h2>
            <p className="text-muted-foreground">
              Jika Anda memiliki pertanyaan tentang syarat dan ketentuan ini, silakan hubungi kami di:
            </p>
            <p className="text-primary font-semibold mt-2">support@tamanweb.com</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
