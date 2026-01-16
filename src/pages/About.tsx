import { motion } from "framer-motion";
import { 
  Users, 
  Target, 
  Lightbulb, 
  Award,
  CheckCircle,
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";

const team = [
  {
    name: "Andi Wijaya",
    role: "Founder & Lead Developer",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
    bio: "10+ tahun pengalaman dalam web development"
  },
  {
    name: "Sari Dewi",
    role: "UI/UX Designer",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face",
    bio: "Spesialis desain modern dan user-centric"
  },
  {
    name: "Budi Hartono",
    role: "Full-stack Developer",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
    bio: "Expert React, Node.js, dan cloud infrastructure"
  },
  {
    name: "Maya Putri",
    role: "Customer Success",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face",
    bio: "Dedikasi tinggi untuk kepuasan pelanggan"
  }
];

const values = [
  {
    icon: Target,
    title: "Kualitas Utama",
    description: "Setiap template melalui proses review ketat untuk memastikan kualitas kode dan desain terbaik."
  },
  {
    icon: Lightbulb,
    title: "Inovasi Berkelanjutan",
    description: "Kami terus mengikuti trend terbaru dalam web development dan design untuk memberikan yang terkini."
  },
  {
    icon: Users,
    title: "Fokus Pengguna",
    description: "Kebutuhan dan feedback pelanggan selalu menjadi prioritas dalam setiap pengembangan produk."
  },
  {
    icon: Award,
    title: "Profesionalisme",
    description: "Komitmen pada standar tinggi dalam setiap aspek bisnis dan layanan pelanggan."
  }
];

const milestones = [
  { year: "2020", title: "Didirikan", description: "TamanWEB lahir dengan visi menyediakan template berkualitas" },
  { year: "2021", title: "100 Template", description: "Mencapai milestone 100 template dalam katalog" },
  { year: "2022", title: "1000 Pelanggan", description: "Dipercaya oleh lebih dari 1000 profesional dan bisnis" },
  { year: "2023", title: "Ekspansi Asia", description: "Memperluas layanan ke seluruh Asia Tenggara" },
  { year: "2024", title: "Premium Support", description: "Meluncurkan layanan support premium 24/7" }
];

export default function About() {
  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 pb-20 gradient-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Tentang <span className="text-gradient">TamanWEB</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Kami adalah tim passionate yang berkomitmen menyediakan template website 
              berkualitas tinggi untuk membantu bisnis dan profesional membangun kehadiran online yang memukau.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-card p-8 rounded-2xl border border-border shadow-md"
            >
              <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center mb-6 shadow-primary">
                <Target className="w-7 h-7 text-primary-foreground" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Misi Kami</h2>
              <p className="text-muted-foreground leading-relaxed">
                Menyediakan template website profesional yang memungkinkan setiap bisnis dan 
                individu membangun kehadiran online berkualitas tinggi tanpa perlu keahlian 
                teknis mendalam atau anggaran besar.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-card p-8 rounded-2xl border border-border shadow-md"
            >
              <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center mb-6 shadow-primary">
                <Lightbulb className="w-7 h-7 text-primary-foreground" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Visi Kami</h2>
              <p className="text-muted-foreground leading-relaxed">
                Menjadi platform template website terdepan di Indonesia dan Asia Tenggara, 
                dikenal atas kualitas, inovasi, dan pelayanan pelanggan yang luar biasa.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Nilai-Nilai <span className="text-gradient">Kami</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Prinsip yang memandu setiap keputusan dan tindakan kami.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
                  <value.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {value.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-background">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Tim <span className="text-gradient">Kami</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Orang-orang berbakat di balik setiap template berkualitas tinggi.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card p-6 rounded-2xl border border-border shadow-md text-center group hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
              >
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-background shadow-lg group-hover:border-primary transition-colors"
                />
                <h3 className="font-bold text-foreground mb-1">{member.name}</h3>
                <p className="text-primary text-sm font-medium mb-2">{member.role}</p>
                <p className="text-muted-foreground text-sm">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-muted/30">
        <div className="container max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Perjalanan <span className="text-gradient">Kami</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Milestone penting dalam perjalanan TamanWEB.
            </p>
          </motion.div>

          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-6"
              >
                <div className="flex-shrink-0 w-20 h-20 rounded-xl gradient-primary flex items-center justify-center text-primary-foreground font-bold text-lg shadow-primary">
                  {milestone.year}
                </div>
                <div className="flex-1 bg-card p-6 rounded-xl border border-border shadow-sm">
                  <h3 className="font-bold text-foreground mb-2">{milestone.title}</h3>
                  <p className="text-muted-foreground text-sm">{milestone.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
              Bergabung dengan Ribuan Profesional
            </h2>
            <p className="text-primary-foreground/80 mb-10">
              Mulai bangun website impian Anda dengan template berkualitas tinggi dari TamanWEB.
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
