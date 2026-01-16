import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { db } from '@/lib/db'

const contactSchema = z.object({
  name: z.string().min(2, 'Nama minimal 2 karakter'),
  email: z.string().email('Email tidak valid'),
  subject: z.string().min(5, 'Subjek minimal 5 karakter'),
  message: z.string().min(10, 'Pesan minimal 10 karakter'),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate input
    const validatedData = contactSchema.parse(body)

    // Save to database
    await db.contactMessage.create({
      data: validatedData,
    })

    return NextResponse.json(
      { message: 'Pesan berhasil dikirim' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact form error:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: 'Validasi gagal', errors: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { message: 'Terjadi kesalahan saat mengirim pesan' },
      { status: 500 }
    )
  }
}
