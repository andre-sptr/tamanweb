import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'
import Stripe from 'stripe'
import { stripe } from '@/lib/stripe'
import { db } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = headers().get('stripe-signature')

    if (!signature) {
      return NextResponse.json(
        { message: 'Missing signature' },
        { status: 400 }
      )
    }

    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

    if (!webhookSecret) {
      return NextResponse.json(
        { message: 'Webhook secret not configured' },
        { status: 500 }
      )
    }

    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    } catch (err) {
      console.error('Webhook signature verification failed:', err)
      return NextResponse.json(
        { message: 'Invalid signature' },
        { status: 400 }
      )
    }

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session

        if (session.payment_status === 'paid') {
          const productId = session.metadata?.productId
          const userId = session.metadata?.userId
          const stripeSessionId = session.id

          if (!productId || !userId) {
            console.error('Missing metadata in session:', session.id)
            return NextResponse.json(
              { message: 'Invalid metadata' },
              { status: 400 }
            )
          }

          // Update or create transaction
          try {
            await db.transaction.upsert({
              where: {
                stripeSessionId: stripeSessionId,
              },
              update: {
                status: 'COMPLETED',
              },
              create: {
                userId: userId,
                productId: productId,
                stripeSessionId: stripeSessionId,
                amount: session.amount_total || 0,
                currency: session.currency?.toUpperCase() || 'IDR',
                status: 'COMPLETED',
              },
            })

            console.log(`Payment completed for session: ${stripeSessionId}`)
          } catch (error) {
            console.error('Error updating transaction:', error)
          }
        }
        break
      }

      case 'checkout.session.expired': {
        const session = event.data.object as Stripe.Checkout.Session
        console.log(`Checkout session expired: ${session.id}`)

        // Update transaction status to FAILED
        try {
          await db.transaction.updateMany({
            where: {
              stripeSessionId: session.id,
              status: 'PENDING',
            },
            data: {
              status: 'FAILED',
            },
          })
        } catch (error) {
          console.error('Error updating transaction:', error)
        }
        break
      }

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { message: 'Webhook handler failed' },
      { status: 500 }
    )
  }
}
