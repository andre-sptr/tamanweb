import { Link } from "react-router-dom";
import { ShoppingBag, Twitter, Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";

const footerLinks = {
  quickLinks: [
    { href: "/", label: "Beranda" },
    { href: "/templates", label: "Template" },
    { href: "/about", label: "Tentang Kami" },
    { href: "/contact", label: "Hubungi Kami" },
  ],
  legal: [
    { href: "/terms", label: "Syarat & Ketentuan" },
    { href: "/privacy", label: "Kebijakan Privasi" },
    { href: "/refund", label: "Kebijakan Refund" },
  ],
  categories: [
    { href: "/templates?category=Portfolio", label: "Portfolio" },
    { href: "/templates?category=Landing+Page", label: "Landing Page" },
    { href: "/templates?category=SaaS", label: "SaaS" },
    { href: "/templates?category=E-commerce", label: "E-commerce" },
  ],
};

const socialLinks = [
  { href: "https://twitter.com", icon: Twitter, label: "Twitter" },
  { href: "https://github.com", icon: Github, label: "GitHub" },
  { href: "https://linkedin.com", icon: Linkedin, label: "LinkedIn" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border">
      {/* Main Footer */}
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-primary">
                <ShoppingBag className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">
                Taman<span className="text-primary">WEB</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Koleksi template website profesional untuk membantu Anda membangun kehadiran online yang memukau.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Link Cepat</h4>
            <ul className="space-y-3">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Kategori</h4>
            <ul className="space-y-3">
              {footerLinks.categories.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Kontak</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <Mail className="w-4 h-4 mt-0.5 text-primary" />
                <span>hello@tamanweb.id</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <Phone className="w-4 h-4 mt-0.5 text-primary" />
                <span>+62 812 3456 7890</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 mt-0.5 text-primary" />
                <span>Jakarta, Indonesia</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-border">
        <div className="container py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} TamanWEB. All rights reserved.
          </p>
          <div className="flex gap-6">
            {footerLinks.legal.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-xs text-muted-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
