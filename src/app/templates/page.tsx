import { Suspense } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ProductCardSkeleton } from '@/components/product-card-skeleton'
import { Search, SlidersHorizontal } from 'lucide-react'
import Link from 'next/link'

interface TemplatesPageProps {
  searchParams: {
    category?: string
    search?: string
    featured?: string
    sort?: string
    page?: string
  }
}

export default async function TemplatesPage({
  searchParams,
}: TemplatesPageProps) {
  const category = searchParams.category || 'all'
  const searchQuery = searchParams.search || ''
  const featured = searchParams.featured === 'true'
  const sort = searchParams.sort || 'newest'
  const page = parseInt(searchParams.page || '1')
  const limit = 12
  const skip = (page - 1) * limit

  // Fetch products from database
  const products = await fetchProducts({
    category,
    search: searchQuery,
    featured,
    sort,
    skip,
    limit,
  })

  const categories = [
    { value: 'all', label: 'Semua Kategori' },
    { value: 'Portfolio', label: 'Portfolio' },
    { value: 'Landing', label: 'Landing Page' },
    { value: 'SaaS', label: 'SaaS' },
    { value: 'E-commerce', label: 'E-commerce' },
  ]

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Templates</h1>
        <p className="text-muted-foreground text-lg">
          Jelajahi koleksi template website premium kami
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <form className="flex-1 relative" action="/templates">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              name="search"
              type="search"
              placeholder="Cari template..."
              defaultValue={searchQuery}
              className="pl-10"
            />
          </form>

          {/* Category Filter */}
          <form action="/templates">
            <Select name="category" defaultValue={category}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Kategori" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <input type="hidden" name="search" value={searchQuery} />
            <input type="hidden" name="sort" value={sort} />
            <Button type="submit" className="sr-only">Filter</Button>
          </form>

          {/* Sort */}
          <form action="/templates">
            <Select name="sort" defaultValue={sort}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Urutkan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Terbaru</SelectItem>
                <SelectItem value="price-asc">Harga Terendah</SelectItem>
                <SelectItem value="price-desc">Harga Tertinggi</SelectItem>
              </SelectContent>
            </Select>
            <input type="hidden" name="category" value={category} />
            <input type="hidden" name="search" value={searchQuery} />
            <Button type="submit" className="sr-only">Sort</Button>
          </form>
        </div>

        {/* Active Filters */}
        {(category !== 'all' || searchQuery || featured) && (
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-sm text-muted-foreground">Filter Aktif:</span>
            {category !== 'all' && (
              <Badge variant="secondary">
                {categories.find((c) => c.value === category)?.label}
              </Badge>
            )}
            {searchQuery && (
              <Badge variant="secondary">
                "{searchQuery}"
              </Badge>
            )}
            {featured && (
              <Badge variant="secondary">Featured</Badge>
            )}
            <Link href="/templates">
              <Button variant="ghost" size="sm" className="h-6 text-xs">
                Clear All
              </Button>
            </Link>
          </div>
        )}
      </div>

      {/* Products Grid */}
      {products.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Suspense key={product.id} fallback={<ProductCardSkeleton />}>
                {/* ProductCard will be imported here */}
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">{product.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    {product.shortDescription}
                  </p>
                  <p className="font-bold text-primary">
                    {new Intl.NumberFormat('id-ID', {
                      style: 'currency',
                      currency: 'IDR',
                      minimumFractionDigits: 0,
                    }).format(product.price)}
                  </p>
                </div>
              </Suspense>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-8 flex justify-center">
            {/* Pagination component will be added here */}
            <div className="flex gap-2">
              {page > 1 && (
                <Link href={`/templates?page=${page - 1}`}>
                  <Button variant="outline">Previous</Button>
                </Link>
              )}
              <Button variant="outline" disabled>Page {page}</Button>
              <Link href={`/templates?page=${page + 1}`}>
                <Button variant="outline">Next</Button>
              </Link>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center py-20">
          <SlidersHorizontal className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Tidak ada template ditemukan</h3>
          <p className="text-muted-foreground mb-6">
            Coba ubah filter atau kata kunci pencarian
          </p>
          <Link href="/templates">
            <Button>Reset Filter</Button>
          </Link>
        </div>
      )}
    </div>
  )
}

async function fetchProducts(params: {
  category: string
  search: string
  featured: boolean
  sort: string
  skip: number
  limit: number
}) {
  const { db } = await import('@/lib/db')

  const where: any = {
    published: true,
  }

  if (params.category !== 'all') {
    where.category = params.category
  }

  if (params.search) {
    where.OR = [
      { title: { contains: params.search } },
      { shortDescription: { contains: params.search } },
    ]
  }

  if (params.featured) {
    where.featured = true
  }

  const orderBy: any = {}
  switch (params.sort) {
    case 'price-asc':
      orderBy.price = 'asc'
      break
    case 'price-desc':
      orderBy.price = 'desc'
      break
    default:
      orderBy.createdAt = 'desc'
  }

  try {
    const products = await db.product.findMany({
      where,
      orderBy,
      skip: params.skip,
      take: params.limit,
      select: {
        id: true,
        slug: true,
        title: true,
        shortDescription: true,
        price: true,
        category: true,
        thumbnailUrl: true,
        tags: true,
        featured: true,
      },
    })
    return products
  } catch (error) {
    console.error('Error fetching products:', error)
    return []
  }
}
