import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const products = [
  {
    slug: 'portfolio-pro-landing',
    title: 'Portfolio Pro Landing Page',
    shortDescription: 'Modern portfolio landing page with animations and responsive design.',
    description: `# Portfolio Pro Landing Page

A stunning portfolio landing page template designed for creative professionals.

## Features
- Smooth scroll animations
- Responsive design (mobile-first)
- Dark/Light mode support
- Gallery showcase
- Contact form with validation

## Tech Stack
- Next.js 15
- React 19
- Tailwind CSS 4
- Framer Motion
- shadcn/ui components

## What's Included
- Complete source code
- Documentation
- Figma design files
- 6 months of updates
- Priority support`,
    price: 99000, // IDR 99,000
    currency: 'IDR',
    category: 'Portfolio',
    tags: JSON.stringify(['portfolio', 'landing-page', 'personal', 'creative']),
    previewImages: JSON.stringify([
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop'
    ]),
    thumbnailUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
    techStack: JSON.stringify(['Next.js', 'React', 'Tailwind CSS', 'Framer Motion']),
    includedFiles: JSON.stringify([
      'Source Code (Next.js)',
      'Documentation (PDF)',
      'Figma Design Files',
      'Setup Guide'
    ]),
    downloadUrl: 'https://example.com/download/portfolio-pro',
    featured: true,
    published: true
  },
  {
    slug: 'saas-dashboard-pro',
    title: 'SaaS Dashboard Pro',
    shortDescription: 'Complete dashboard template for SaaS applications with charts and analytics.',
    description: `# SaaS Dashboard Pro

A comprehensive dashboard template for modern SaaS applications.

## Features
- Interactive charts and analytics
- User management system
- Subscription management UI
- Real-time notifications
- Data tables with sorting/filtering

## Tech Stack
- Next.js 15
- React 19
- Tailwind CSS 4
- Recharts
- TanStack Query
- shadcn/ui components

## What's Included
- Complete source code
- API integration examples
- Admin panel
- User dashboard
- Documentation`,
    price: 249000, // IDR 249,000
    currency: 'IDR',
    category: 'SaaS',
    tags: JSON.stringify(['dashboard', 'saas', 'analytics', 'admin']),
    previewImages: JSON.stringify([
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop'
    ]),
    thumbnailUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
    techStack: JSON.stringify(['Next.js', 'React', 'Tailwind CSS', 'Recharts', 'TanStack Query']),
    includedFiles: JSON.stringify([
      'Dashboard Source Code',
      'Admin Panel',
      'API Integration Examples',
      'Documentation'
    ]),
    downloadUrl: 'https://example.com/download/saas-dashboard',
    featured: true,
    published: true
  },
  {
    slug: 'ecommerce-store-template',
    title: 'E-Commerce Store Template',
    shortDescription: 'Full-featured e-commerce template with cart, checkout, and payment integration.',
    description: `# E-Commerce Store Template

A complete e-commerce solution ready for production.

## Features
- Product catalog with categories
- Shopping cart
- Checkout flow
- Stripe payment integration
- Order tracking
- User authentication

## Tech Stack
- Next.js 15
- React 19
- Tailwind CSS 4
- Stripe
- Prisma ORM
- NextAuth.js

## What's Included
- Complete storefront
- Admin dashboard
- Payment integration
- Order management
- Documentation`,
    price: 349000, // IDR 349,000
    currency: 'IDR',
    category: 'E-commerce',
    tags: JSON.stringify(['ecommerce', 'store', 'shop', 'payment']),
    previewImages: JSON.stringify([
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop'
    ]),
    thumbnailUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop',
    techStack: JSON.stringify(['Next.js', 'React', 'Tailwind CSS', 'Stripe', 'Prisma', 'NextAuth']),
    includedFiles: JSON.stringify([
      'Storefront Code',
      'Admin Dashboard',
      'Stripe Integration',
      'Setup Documentation'
    ]),
    downloadUrl: 'https://example.com/download/ecommerce-store',
    featured: true,
    published: true
  },
  {
    slug: 'startup-landing-page',
    title: 'Startup Landing Page',
    shortDescription: 'High-converting landing page for startups with pricing and testimonials.',
    description: `# Startup Landing Page

A high-converting landing page designed for modern startups.

## Features
- Hero section with CTA
- Features showcase
- Pricing tables
- Testimonials carousel
- FAQ accordion
- Contact section

## Tech Stack
- Next.js 15
- React 19
- Tailwind CSS 4
- Framer Motion
- shadcn/ui components

## What's Included
- Landing page source code
- Custom animations
- Mobile responsive
- Documentation`,
    price: 149000, // IDR 149,000
    currency: 'IDR',
    category: 'Landing',
    tags: JSON.stringify(['startup', 'landing-page', 'pricing', 'saas']),
    previewImages: JSON.stringify([
      'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1522542550221-31fd8575f6b5?w=800&h=600&fit=crop'
    ]),
    thumbnailUrl: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=300&fit=crop',
    techStack: JSON.stringify(['Next.js', 'React', 'Tailwind CSS', 'Framer Motion']),
    includedFiles: JSON.stringify([
      'Landing Page Code',
      'Animation Components',
      'Documentation',
      'Figma Files'
    ]),
    downloadUrl: 'https://example.com/download/startup-landing',
    featured: false,
    published: true
  },
  {
    slug: 'blog-template-pro',
    title: 'Blog Template Pro',
    shortDescription: 'Professional blog template with markdown support and SEO optimization.',
    description: `# Blog Template Pro

A professional blog template with modern features.

## Features
- Markdown content support
- SEO optimized
- Dark/Light mode
- Author profiles
- Categories and tags
- Search functionality

## Tech Stack
- Next.js 15
- React 19
- Tailwind CSS 4
- react-markdown
- next-seo

## What's Included
- Blog source code
- Admin panel
- SEO setup
- Documentation`,
    price: 199000, // IDR 199,000
    currency: 'IDR',
    category: 'Portfolio',
    tags: JSON.stringify(['blog', 'markdown', 'seo', 'content']),
    previewImages: JSON.stringify([
      'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1432821596592-e2c18b78144f?w=800&h=600&fit=crop'
    ]),
    thumbnailUrl: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=400&h=300&fit=crop',
    techStack: JSON.stringify(['Next.js', 'React', 'Tailwind CSS', 'react-markdown', 'next-seo']),
    includedFiles: JSON.stringify([
      'Blog Source Code',
      'Admin Panel',
      'SEO Configuration',
      'Documentation'
    ]),
    downloadUrl: 'https://example.com/download/blog-template',
    featured: false,
    published: true
  },
  {
    slug: 'agency-website-template',
    title: 'Agency Website Template',
    shortDescription: 'Complete agency website with portfolio, services, and team sections.',
    description: `# Agency Website Template

A full-featured website template for creative agencies.

## Features
- Services showcase
- Portfolio gallery
- Team section
- Case studies
- Client testimonials
- Contact form

## Tech Stack
- Next.js 15
- React 19
- Tailwind CSS 4
- Framer Motion
- shadcn/ui components

## What's Included
- Complete website code
- Portfolio components
- Contact form
- Documentation`,
    price: 299000, // IDR 299,000
    currency: 'IDR',
    category: 'Portfolio',
    tags: JSON.stringify(['agency', 'portfolio', 'services', 'team']),
    previewImages: JSON.stringify([
      'https://images.unsplash.com/photo-1481487484168-9b930d5b7d9f?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop'
    ]),
    thumbnailUrl: 'https://images.unsplash.com/photo-1481487484168-9b930d5b7d9f?w=400&h=300&fit=crop',
    techStack: JSON.stringify(['Next.js', 'React', 'Tailwind CSS', 'Framer Motion']),
    includedFiles: JSON.stringify([
      'Website Source Code',
      'Portfolio Components',
      'Contact Form',
      'Documentation'
    ]),
    downloadUrl: 'https://example.com/download/agency-website',
    featured: true,
    published: true
  },
  {
    slug: 'app-landing-template',
    title: 'App Landing Template',
    shortDescription: 'Mobile app landing page with feature highlights and download CTAs.',
    description: `# App Landing Template

A modern landing page for mobile applications.

## Features
- Hero with app screenshots
- Feature highlights
- App store badges
- Reviews and ratings
- Download CTAs
- Responsive design

## Tech Stack
- Next.js 15
- React 19
- Tailwind CSS 4
- Framer Motion
- shadcn/ui components

## What's Included
- Landing page code
- App mockup components
- Store badge components
- Documentation`,
    price: 149000, // IDR 149,000
    currency: 'IDR',
    category: 'Landing',
    tags: JSON.stringify(['mobile', 'app', 'landing-page', 'ios', 'android']),
    previewImages: JSON.stringify([
      'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1555421689-491a97ff2040?w=800&h=600&fit=crop'
    ]),
    thumbnailUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop',
    techStack: JSON.stringify(['Next.js', 'React', 'Tailwind CSS', 'Framer Motion']),
    includedFiles: JSON.stringify([
      'Landing Page Code',
      'App Mockup Components',
      'Store Badges',
      'Documentation'
    ]),
    downloadUrl: 'https://example.com/download/app-landing',
    featured: false,
    published: true
  },
  {
    slug: 'saas-pricing-page',
    title: 'SaaS Pricing Page',
    shortDescription: 'Beautiful pricing page template with toggle and feature comparison.',
    description: `# SaaS Pricing Page

A professionally designed pricing page for SaaS products.

## Features
- Pricing tiers
- Monthly/Yearly toggle
- Feature comparison table
- FAQ section
- CTA sections
- Dark mode support

## Tech Stack
- Next.js 15
- React 19
- Tailwind CSS 4
- Framer Motion
- shadcn/ui components

## What's Included
- Pricing page code
- Toggle components
- Comparison table
- Documentation`,
    price: 99000, // IDR 99,000
    currency: 'IDR',
    category: 'Landing',
    tags: JSON.stringify(['pricing', 'saas', 'comparison', 'toggle']),
    previewImages: JSON.stringify([
      'https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607686527-6fb886090705?w=800&h=600&fit=crop'
    ]),
    thumbnailUrl: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=400&h=300&fit=crop',
    techStack: JSON.stringify(['Next.js', 'React', 'Tailwind CSS', 'Framer Motion']),
    includedFiles: JSON.stringify([
      'Pricing Page Code',
      'Toggle Components',
      'Comparison Table',
      'Documentation'
    ]),
    downloadUrl: 'https://example.com/download/saas-pricing',
    featured: false,
    published: true
  }
]

async function main() {
  console.log('🌱 Starting seed...')

  for (const product of products) {
    await prisma.product.create({
      data: product
    })
    console.log(`✅ Created product: ${product.title}`)
  }

  console.log('🎉 Seed completed successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Error during seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
