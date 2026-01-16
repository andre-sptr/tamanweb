import type { Metadata } from "next";
import { Plus_Jakarta_Sans as PlusJakartaSans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const plusJakartaSans = PlusJakartaSans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "TAMANWEB - Template Website Premium",
  description: "Platform e-commerce untuk menjual template website berkualitas tinggi. Portfolio, Landing Page, SaaS, dan E-commerce templates dengan harga terjangkau.",
  keywords: ["template website", "website templates", "Next.js template", "React template", "portfolio template", "landing page", "SaaS template", "e-commerce template"],
  authors: [{ name: "TAMANWEB" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "TAMANWEB - Template Website Premium",
    description: "Platform e-commerce untuk menjual template website berkualitas tinggi.",
    url: "https://tamanweb.com",
    siteName: "TAMANWEB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TAMANWEB - Template Website Premium",
    description: "Platform e-commerce untuk menjual template website berkualitas tinggi.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body
        className={`${plusJakartaSans.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen flex flex-col bg-background text-foreground">
            <Navbar />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
            <Toaster />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
