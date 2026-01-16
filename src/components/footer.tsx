import Link from 'next/link'
import { Github, Twitter, Linkedin, Facebook } from 'lucide-react'

const socialLinks = [
  { name: 'Twitter', href: '#', icon: Twitter },
  { name: 'Github', href: '#', icon: Github },
  { name: 'Linkedin', href: '#', icon: Linkedin },
  { name: 'Facebook', href: '#', icon: Facebook },
]

const quickLinks = [
  { name: 'Templates', href: '/templates' },
  { name: 'Tentang Kami', href: '/about' },
  { name: 'Kontak', href: '/contact' },
  { name: 'FAQ', href: '/#faq' },
]

const legalLinks = [
  { name: 'Syarat & Ketentuan', href: '/terms' },
  { name: 'Kebijakan Privasi', href: '/privacy' },
  { name: 'Lisensi', href: '/terms#license' },
]

export function Footer() {
  return (
    <footer className="w-full border-t bg-muted/50 mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-lg">
                T
              </div>
              <span className="font-bold text-xl">TAMANWEB</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Platform e-commerce untuk menjual template website berkualitas tinggi.
              Bangun website impian Anda dengan template profesional kami.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Tautan Cepat</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-semibold mb-4">Ikuti Kami</h3>
            <div className="flex space-x-2">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                    aria-label={social.name}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                )
              })}
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} TAMANWEB. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
