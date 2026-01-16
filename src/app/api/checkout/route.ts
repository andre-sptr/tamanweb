import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { z } from 'zod'
import { stripe } from '@/lib/stripe'
import { db } from '@/lib/db'

const checkoutSchema = z.object({
  productId: z.string(),
})

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession()
    if (!session?.user?.id) {
      return NextResponse.json(
        { message: 'Unauthorized. Silakan login terlebih dahulu.' },
        { status: 401 }
      )
    }

    const body = await request.json()

    // Validate input
    const { productId } = checkoutSchema.parse(body)

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

    // Check if user already owns this product
    const existingTransaction = await db.transaction.findFirst({
      where: {
        userId: session.user.id,
        productId: productId,
        status: 'COMPLETED',
      },
    })

    if (existingTransaction) {
      return NextResponse.json(
        { message: 'Anda sudah memiliki produk ini' },
        { status: 400 }
      )
    }

    // Create Stripe checkout session
    const checkoutSession = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: product.currency.toLowerCase(),
            product_data: {
              name: product.title,
              description: product.shortDescription,
              images: [product.thumbnailUrl],
            },
            unit_amount: product.price,
          },
          quantity: 1,
        },
      ],
      metadata: {
        productId: product.id,
        userId: session.user.id,
      },
      success_url: `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/cancel`,
    })

    // Create pending transaction
    await db.transaction.create({
      data: {
        userId: session.user.id,
        productId: product.id,
        stripeSessionId: checkoutSession.id,
        amount: product.price,
        currency: product.currency,
        status: 'PENDING',
      },
    })

    return NextResponse.json({
      sessionId: checkoutSession.id,
      url: checkoutSession.url,
    })
  } catch (error) {
    console.error('Checkout error:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: 'Validasi gagal', errors: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { message: 'Terjadi kesalahan saat memproses checkout' },
      { status: 500 }
    )
  }
}
