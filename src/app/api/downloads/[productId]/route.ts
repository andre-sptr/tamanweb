import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { db } from '@/lib/db'

interface DownloadPageProps {
  params: {
    productId: string
  }
}

export async function GET(
  request: NextRequest,
  { params }: DownloadPageProps
) {
  try {
    // Check authentication
    const session = await getServerSession()
    if (!session?.user?.id) {
      return NextResponse.json(
        { message: 'Unauthorized. Silakan login terlebih dahulu.' },
        { status: 401 }
      )
    }

    const { productId } = params

    // Fetch product
    const product = await db.product.findUnique({
      where: { id: productId },
    })

    if (!product) {
      return NextResponse.json(
        { message: 'Produk tidak ditemukan' },
        { status: 404 }
      )
    }

    if (!product.published) {
      return NextResponse.json(
        { message: 'Produk tidak tersedia' },
        { status: 400 }
      )
    }

    // Check ownership
    const transaction = await db.transaction.findFirst({
      where: {
        userId: session.user.id,
        productId: productId,
        status: 'COMPLETED',
      },
    })

    if (!transaction) {
      return NextResponse.json(
        { message: 'Anda belum membeli produk ini' },
        { status: 403 }
      )
    }

    // Redirect to download URL
    if (product.downloadUrl) {
      return NextResponse.redirect(product.downloadUrl, 302)
    }

    return NextResponse.json(
      { message: 'URL download tidak tersedia' },
      { status: 404 }
    )
  } catch (error) {
    console.error('Download error:', error)
    return NextResponse.json(
      { message: 'Terjadi kesalahan saat memproses download' },
      { status: 500 }
    )
  }
}
