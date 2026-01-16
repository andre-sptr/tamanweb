import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    value: "hello@tamanweb.id",
    link: "mailto:hello@tamanweb.id"
  },
  {
    icon: Phone,
    title: "Telepon",
    value: "+62 812 3456 7890",
    link: "tel:+6281234567890"
  },
  {
    icon: MapPin,
    title: "Alamat",
    value: "Jakarta, Indonesia",
    link: null
  }
];

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
    
    toast({
      title: "Pesan Terkirim!",
      description: "Terima kasih, kami akan menghubungi Anda segera.",
    });
  };

  if (isSubmitted) {
    return (
      <Layout>
        <section className="min-h-screen flex items-center justify-center gradient-hero">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center max-w-md mx-auto px-4"
          >
            <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-success" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-4">
              Terima Kasih!
            </h1>
            <p className="text-muted-foreground mb-8">
              Pesan Anda telah kami terima. Tim kami akan menghubungi Anda dalam 1-2 hari kerja.
            </p>
            <Button onClick={() => setIsSubmitted(false)}>
              Kirim Pesan Lagi
            </Button>
          </motion.div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 pb-16 gradient-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Hubungi <span className="text-gradient">Kami</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Punya pertanyaan atau butuh bantuan? Tim kami siap membantu Anda.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-background">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold text-foreground mb-6">
                Informasi Kontak
              </h2>
              
              {contactInfo.map((info) => (
                <div key={info.title} className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <info.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{info.title}</h3>
                    {info.link ? (
                      <a
                        href={info.link}
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-muted-foreground">{info.value}</p>
                    )}
                  </div>
                </div>
              ))}

              <div className="pt-6 border-t border-border">
                <h3 className="font-semibold text-foreground mb-3">Jam Operasional</h3>
                <p className="text-muted-foreground text-sm">
                  Senin - Jumat: 09:00 - 18:00 WIB<br />
                  Sabtu: 09:00 - 14:00 WIB<br />
                  Minggu: Tutup
                </p>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2"
            >
              <div className="bg-card p-8 rounded-2xl border border-border shadow-md">
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  Kirim Pesan
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nama Lengkap</Label>
                      <Input
                        id="name"
                        placeholder="Masukkan nama Anda"
                        required
                        className="h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="email@contoh.com"
                        required
                        className="h-12"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subjek</Label>
                    <Input
                      id="subject"
                      placeholder="Tentang apa pesan Anda?"
                      required
                      className="h-12"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Pesan</Label>
                    <Textarea
                      id="message"
                      placeholder="Tuliskan pesan Anda di sini..."
                      rows={6}
                      required
                      className="resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="animate-spin mr-2">⏳</span>
                        Mengirim...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Kirim Pesan
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="bg-muted/30 py-16">
        <div className="container">
          <div className="aspect-[21/9] rounded-2xl overflow-hidden bg-card border border-border shadow-md">
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              <div className="text-center">
                <MapPin className="w-12 h-12 mx-auto mb-4 text-primary" />
                <p className="font-medium">Jakarta, Indonesia</p>
                <p className="text-sm">Peta akan ditampilkan di sini</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
