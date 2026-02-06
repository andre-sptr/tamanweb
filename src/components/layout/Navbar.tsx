import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingBag, User, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { Cart } from "@/components/Cart";
import { MegaMenu } from "@/components/MegaMenu";
import { SearchAutocomplete, SearchButton } from "@/components/SearchAutocomplete";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Beranda" },
  { href: "/about", label: "Tentang" },
  { href: "/contact", label: "Kontak" },
];

const mobileCategories = [
  { href: "/templates?category=Portfolio", label: "Portfolio" },
  { href: "/templates?category=Landing%20Page", label: "Landing Page" },
  { href: "/templates?category=SaaS", label: "SaaS" },
  { href: "/templates?category=E-commerce", label: "E-commerce" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsMegaMenuOpen(false);
    setShowMobileSearch(false);
  }, [location.pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "py-3 glass shadow-md"
          : "py-5 bg-transparent"
      )}
    >
      <div className="container flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-primary group-hover:scale-105 transition-transform">
            <ShoppingBag className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-foreground">
            Taman<span className="text-primary">WEB</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.filter(l => l.href === "/").map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={cn(
                "px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200",
                location.pathname === link.href
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
              )}
            >
              {link.label}
            </Link>
          ))}

          {/* Mega Menu for Templates */}
          <MegaMenu isOpen={isMegaMenuOpen} onOpenChange={setIsMegaMenuOpen} />

          {navLinks.filter(l => l.href !== "/").map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={cn(
                "px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200",
                location.pathname === link.href
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-2">
          {/* Search Autocomplete */}
          <div className="w-64">
            <SearchAutocomplete />
          </div>

          <ThemeSwitcher />
          <Cart />
          <Button variant="ghost" size="icon" asChild>
            <Link to="/admin/login">
              <User className="w-5 h-5" />
            </Link>
          </Button>
          <Button asChild>
            <Link to="/templates">Jelajahi Template</Link>
          </Button>
        </div>

        {/* Mobile Actions */}
        <div className="flex md:hidden items-center gap-2">
          <Cart />
          <ThemeSwitcher />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden glass border-t border-border"
          >
            <nav className="container py-4 flex flex-col gap-2">
              {/* Mobile Search */}
              <div className="mb-2">
                <SearchAutocomplete onClose={() => setShowMobileSearch(false)} />
              </div>

              {/* Main Links */}
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    "px-4 py-3 rounded-lg font-medium transition-all duration-200",
                    location.pathname === link.href
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  )}
                >
                  {link.label}
                </Link>
              ))}

              {/* Template Categories */}
              <div className="py-2">
                <div className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Template Kategori
                </div>
                {mobileCategories.map((cat) => (
                  <Link
                    key={cat.href}
                    to={cat.href}
                    className="flex items-center justify-between px-4 py-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                  >
                    {cat.label}
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                ))}
              </div>

              <div className="pt-2 border-t border-border mt-2 space-y-2">
                <Button className="w-full" asChild>
                  <Link to="/templates">Jelajahi Template</Link>
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/admin/login">
                    <User className="w-4 h-4 mr-2" />
                    Admin Login
                  </Link>
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
