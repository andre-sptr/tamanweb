'use client'

import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Check, ShoppingCart } from 'lucide-react'

interface ProductCardProps {
  product: {
    id: string
    slug: string
    title: string
    shortDescription: string
    price: number
    category: string
    thumbnailUrl: string
    tags: string
    featured: boolean
  }
  isOwned?: boolean
}

export function ProductCard({ product, isOwned = false }: ProductCardProps) {
  const tags = JSON.parse(product.tags || '[]')
  const priceInIDR = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(product.price)

  return (
    <Card className="group overflow-hidden transition-all hover:shadow-lg">
      <CardHeader className="p-0">
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          <Image
            src={product.thumbnailUrl}
            alt={product.title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {product.featured && (
            <Badge className="absolute top-3 right-3">Featured</Badge>
          )}
          <Badge variant="secondary" className="absolute top-3 left-3">
            {product.category}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="p-4 space-y-3">
        <div className="space-y-2">
          <h3 className="font-semibold line-clamp-1 group-hover:text-primary transition-colors">
            {product.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {product.shortDescription}
          </p>
        </div>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {tags.slice(0, 3).map((tag: string, index: number) => (
              <Badge key={index} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            {tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{tags.length - 3}
              </Badge>
            )}
          </div>
        )}

        <div className="flex items-center justify-between">
          <p className="text-2xl font-bold text-primary">{priceInIDR}</p>
          {isOwned && (
            <Badge variant="default" className="gap-1">
              <Check className="h-3 w-3" />
              Owned
            </Badge>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Link href={`/templates/${product.slug}`} className="w-full">
          <Button className="w-full" variant={isOwned ? 'outline' : 'default'}>
            {isOwned ? (
              'Lihat Detail'
            ) : (
              <>
                <ShoppingCart className="mr-2 h-4 w-4" />
                Beli Sekarang
              </>
            )}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
