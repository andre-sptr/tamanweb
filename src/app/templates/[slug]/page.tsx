import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import ReactMarkdown from 'react-markdown'
import { ShoppingBag, Download, ExternalLink, Check, ArrowRight } from 'lucide-react'

interface ProductDetailPageProps {
  params: {
    slug: string
  }
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const product = await getProductBySlug(params.slug)

  if (!product || !product.published) {
    notFound()
  }

  const tags = JSON.parse(product.tags || '[]')
  const techStack = JSON.parse(product.techStack || '[]')
  const includedFiles = JSON.parse(product.includedFiles || '[]')
  const previewImages = JSON.parse(product.previewImages || '[]')

  const priceInIDR = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(product.price)

  // TODO: Check if user owns this product when auth is implemented

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <Breadcrumb className="mb-8">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Beranda</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/templates">Templates</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{product.title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Images */}
          <div className="space-y-4">
            <div className="aspect-[16/10] overflow-hidden rounded-lg bg-muted">
              <Image
                src={product.thumbnailUrl}
                alt={product.title}
                width={800}
                height={500}
                className="w-full h-full object-cover"
              />
            </div>
            {previewImages.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {previewImages.slice(0, 3).map((img: string, index: number) => (
                  <div key={index} className="aspect-[4/3] overflow-hidden rounded-lg bg-muted">
                    <Image
                      src={img}
                      alt={`${product.title} preview ${index + 1}`}
                      width={400}
                      height={300}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Badge variant="secondary">{product.category}</Badge>
              {product.featured && <Badge>Featured</Badge>}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {product.title}
            </h1>
            <p className="text-lg text-muted-foreground mb-6">
              {product.shortDescription}
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              {tags.map((tag: string, index: number) => (
                <Badge key={index} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <Separator />

          {/* Description */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Deskripsi</h2>
            <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none">
              <ReactMarkdown>{product.description}</ReactMarkdown>
            </div>
          </div>

          <Separator />

          {/* Tech Stack */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Tech Stack</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {techStack.map((tech: string, index: number) => (
                <Card key={index}>
                  <CardContent className="p-4 text-center">
                    <p className="font-medium text-sm">{tech}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <Separator />

          {/* Included Files */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Yang Anda Dapatkan</h2>
            <Card>
              <CardContent className="pt-6">
                <ul className="space-y-3">
                  {includedFiles.map((file: string, index: number) => (
                    <li key={index} className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-primary flex-shrink-0" />
                      <span>{file}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card className="sticky top-20">
            <CardContent className="pt-6 space-y-6">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Harga</p>
                <p className="text-4xl font-bold text-primary">{priceInIDR}</p>
              </div>

              <Separator />

              {/* TODO: Implement auth check and download button for owned products */}
              <div className="space-y-3">
                <Button size="lg" className="w-full">
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  Beli Sekarang
                </Button>
                <Button size="lg" variant="outline" className="w-full">
                  <ExternalLink className="mr-2 h-5 w-5" />
                  Live Preview
                </Button>
              </div>

              <Separator />

              <div className="space-y-4 text-sm">
                <div>
                  <p className="font-semibold mb-1">Kategori</p>
                  <p className="text-muted-foreground">{product.category}</p>
                </div>
                <div>
                  <p className="font-semibold mb-1">Lisensi</p>
                  <p className="text-muted-foreground">Personal & Commercial</p>
                </div>
                <div>
                  <p className="font-semibold mb-1">Support</p>
                  <p className="text-muted-foreground">Email Support</p>
                </div>
                <div>
                  <p className="font-semibold mb-1">Updates</p>
                  <p className="text-muted-foreground">Free Updates</p>
                </div>
              </div>

              <Separator />

              <div className="space-y-2 text-sm text-muted-foreground">
                <p className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  Full Source Code
                </p>
                <p className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  Documentation
                </p>
                <p className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  Lifetime Updates
                </p>
              </div>

              <div className="pt-4 border-t">
                <p className="text-sm text-center text-muted-foreground mb-3">
                  Butuh bantuan?
                </p>
                <Link href="/contact">
                  <Button variant="outline" size="sm" className="w-full">
                    Hubungi Support
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Related Products */}
          {product.category && (
            <div className="mt-8">
              <h3 className="font-semibold mb-4">Template Serupa</h3>
              {/* TODO: Fetch and display related products */}
              <div className="text-center py-8 text-muted-foreground text-sm">
                <p>Memuat template serupa...</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

async function getProductBySlug(slug: string) {
  const { db } = await import('@/lib/db')

  try {
    const product = await db.product.findUnique({
      where: { slug },
    })
    return product
  } catch (error) {
    console.error('Error fetching product:', error)
    return null
  }
}
