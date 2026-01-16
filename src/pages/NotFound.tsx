import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Home, Search } from "lucide-react";
import { motion } from "framer-motion";

const NotFound = () => {
  return (
    <Layout>
      <section className="min-h-screen flex items-center justify-center gradient-hero">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md mx-auto px-4"
        >
          <div className="text-8xl font-bold text-primary mb-6">404</div>
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Halaman Tidak Ditemukan
          </h1>
          <p className="text-muted-foreground mb-8">
            Maaf, halaman yang Anda cari tidak dapat ditemukan. 
            Mungkin halaman telah dipindahkan atau dihapus.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild>
              <Link to="/">
                <Home className="w-4 h-4 mr-2" />
                Kembali ke Beranda
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/templates">
                <Search className="w-4 h-4 mr-2" />
                Cari Template
              </Link>
            </Button>
          </div>
        </motion.div>
      </section>
    </Layout>
  );
};

export default NotFound;
