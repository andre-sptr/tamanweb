# TAMANWEB - Platform E-Commerce Template Website

Platform e-commerce modern untuk menjual template website dengan Next.js 15, TypeScript, Tailwind CSS, dan shadcn/ui.

## 🌟 Fitur

- ✅ **UI Modern & Responsif** - Desain biru + off-white dengan dark mode support
- ✅ **Autentikasi Google OAuth** - Login dengan akun Google
- ✅ **Pembayaran Stripe** - Checkout aman dengan mata uang IDR
- ✅ **Download Access Control** - Kontrol kepemilikan untuk download
- ✅ **SEO Optimized** - Metadata, sitemap, robots, structured data
- ✅ **Admin Dashboard** - CRUD produk dan statistik
- ✅ **Mobile-First Design** - Responsif di semua perangkat
- ✅ **Type-Safe** - TypeScript end-to-end

## 🚀 Tech Stack

- **Framework**: Next.js 15 dengan App Router
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4 + shadcn/ui
- **Database**: Prisma ORM (SQLite untuk development)
- **Auth**: NextAuth.js v4 + Google OAuth
- **Payment**: Stripe Checkout
- **State**: Zustand (client) + TanStack Query (server)

## 📋 Prerequisites

- Node.js 18+ atau Bun
- Git
- Akun Google Cloud (untuk Google OAuth)
- Akun Stripe (untuk pembayaran)

## 🔧 Setup Development

### 1. Clone & Install Dependencies

```bash
# Clone repository
git clone <your-repo-url>
cd tamanweb

# Install dependencies
bun install
```

### 2. Environment Variables

Copy `.env.example` ke `.env.local` dan isi dengan nilai Anda:

```bash
cp .env.example .env.local
```

Isi variabel berikut:

```env
# Database
DATABASE_URL="file:./dev.db"

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# NextAuth
NEXTAUTH_SECRET="your-nextauth-secret"
NEXTAUTH_URL="http://localhost:3000"

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Admin Emails
ADMIN_EMAILS="admin@example.com,your-email@example.com"
```

### 3. Generate NEXTAUTH_SECRET

```bash
openssl rand -base64 32
```

### 4. Setup Database

```bash
# Push schema ke database
bun run db:push

# Generate Prisma Client
bun run db:generate

# (Opsional) Seed data dummy
bunx tsx prisma/seed.ts
```

### 5. Setup Google OAuth

1. Buka [Google Cloud Console](https://console.cloud.google.com/)
2. Buat project baru atau pilih project yang sudah ada
3. Enable Google+ API
4. Buat OAuth 2.0 credentials:
   - Application type: Web application
   - Authorized redirect URIs:
     - Development: `http://localhost:3000/api/auth/callback/google`
     - Production: `https://yourdomain.com/api/auth/callback/google`
5. Copy Client ID dan Client Secret ke `.env.local`

### 6. Setup Stripe

1. Buka [Stripe Dashboard](https://dashboard.stripe.com/)
2. Buat akun atau login
3. Get API Keys dari Developers > API keys:
   - Copy Publishable key ke `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - Copy Secret key ke `STRIPE_SECRET_KEY`
4. Setup Webhook:
   - Development: Gunakan Stripe CLI
   - Production: Tambahkan endpoint `https://yourdomain.com/api/webhooks/stripe`
   - Events: `checkout.session.completed`, `checkout.session.expired`
   - Copy signing secret ke `STRIPE_WEBHOOK_SECRET`
5. **Aktifkan Email Receipts** (Penting):
   - Buka Settings > Customer emails
   - Enable "Payments > Successful payments"
   - Customer akan menerima email receipt dari Stripe setelah pembayaran sukses

### 7. Run Development Server

```bash
bun run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

## 📦 Deployment (Vercel)

### 1. Deploy ke Vercel

```bash
# Install Vercel CLI
bun add -g vercel

# Deploy
vercel
```

### 2. Environment Variables di Vercel

Set semua environment variables dari `.env.local` di Vercel:

1. Buka project di [Vercel Dashboard](https://vercel.com/dashboard)
2. Masuk ke Settings > Environment Variables
3. Tambahkan semua variabel dari `.env.local`

### 3. Update Google OAuth Callback

Update Authorized redirect URIs di Google Cloud Console:

```
https://your-vercel-domain.com/api/auth/callback/google
```

### 4. Update Stripe Webhook

Update Stripe webhook endpoint:

```
https://your-vercel-domain.com/api/webhooks/stripe
```

### 5. Update NEXTAUTH_URL di Vercel

Set `NEXTAUTH_URL` ke production URL:

```env
NEXTAUTH_URL="https://your-vercel-domain.com"
```

## 🗄️ Database

### Schema

- **User**: Informasi pengguna dan role (USER/ADMIN)
- **Product**: Template dengan metadata lengkap
- **Transaction**: Riwayat pembelian dan pembayaran
- **ContactMessage**: Pesan dari form kontak

### Migrations

```bash
# Buat migration baru
bun run db:migrate

# Reset database (hapus semua data)
bun run db:reset
```

## 📁 Struktur Project

```
tamanweb/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API routes
│   │   ├── templates/          # Template pages
│   │   ├── dashboard/         # Admin dashboard
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Homepage
│   ├── components/            # React components
│   │   ├── ui/               # shadcn/ui components
│   │   ├── navbar.tsx
│   │   ├── footer.tsx
│   │   └── product-card.tsx
│   ├── lib/                  # Utilities
│   │   ├── db.ts             # Prisma client
│   │   ├── auth.ts           # Auth utilities
│   │   ├── stripe.ts         # Stripe client
│   │   └── utils.ts          # Helper functions
│   └── hooks/                # Custom hooks
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── seed.ts              # Seed script
├── public/                   # Static assets
└── .env.example             # Environment variables template
```

## 🔐 Security

- Route protection dengan NextAuth middleware
- Stripe webhook signature verification
- Zod validation pada semua API routes
- Download access control berdasarkan kepemilikan
- SQL injection prevention dengan Prisma ORM

## 🎨 Theming

### Colors

- **Primary**: Blue (#2563EB / #60A5FA)
- **Background**: Off-white (#F7FAFC) / Slate-900 (#0F172A)
- **Foreground**: Slate-800 (#1F2937) / Slate-100 (#F1F5F9)

### Customization

Ubah warna di `src/app/globals.css`:

```css
:root {
  --primary: 37 99 235; /* Blue-600 */
  --background: 247 250 252; /* Off-white */
  /* ... */
}
```

## 📝 API Endpoints

### Auth
- `POST /api/auth/[...nextauth]` - NextAuth handler
- `GET /api/auth/session` - Get current session

### Checkout
- `POST /api/checkout` - Create checkout session

### Webhooks
- `POST /api/webhooks/stripe` - Stripe webhook handler

### Downloads
- `GET /api/downloads/[productId]` - Download product (requires ownership)

### Contact
- `POST /api/contact` - Submit contact form

## 🧪 Testing

### Manual Testing Checklist

- [ ] Google OAuth login/logout
- [ ] Navigate ke semua halaman
- [ ] Filter dan search di templates
- [ ] Checkout flow
- [ ] Stripe webhook (gunakan Stripe CLI)
- [ ] Download owned products
- [ ] Access denied untuk non-owned products
- [ ] Admin dashboard (jika admin)
- [ ] Theme toggle (light/dark)
- [ ] Responsive di mobile dan desktop
- [ ] Contact form submission

### Stripe CLI untuk Webhook Testing

```bash
# Install Stripe CLI
brew install stripe/stripe-cli/stripe

# Login
stripe login

# Forward webhooks ke localhost
stripe listen --forward-to localhost:3000/api/webhooks/stripe

# Test webhook
stripe trigger checkout.session.completed
```

## 🐛 Troubleshooting

### Build Errors

**Error**: `Module not found`
```bash
rm -rf node_modules .next
bun install
```

**Error**: `Prisma Client not generated`
```bash
bun run db:generate
```

### Database Issues

**Error**: `Foreign key constraint failed`
```bash
bun run db:reset
```

### Auth Issues

**Error**: `NEXTAUTH_URL not set`
Pastikan `NEXTAUTH_URL` di-set di `.env.local` untuk development dan Vercel untuk production.

### Stripe Issues

**Error**: `Webhook signature verification failed`
- Pastikan `STRIPE_WEBHOOK_SECRET` benar
- Gunakan Stripe CLI untuk testing webhooks di development

## 📄 License

MIT License - Lihat file LICENSE untuk detail.

## 🤝 Contributing

1. Fork repository
2. Buat feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push ke branch (`git push origin feature/amazing-feature`)
5. Buka Pull Request

## 📧 Support

- Email: support@tamanweb.com
- Issues: [GitHub Issues](https://github.com/yourusername/tamanweb/issues)

---

Dibuat dengan ❤️ oleh [TAMANWEB Team](https://tamanweb.com)
