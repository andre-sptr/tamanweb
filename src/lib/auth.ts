import { getServerSession as nextAuthGetServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export async function getServerSession() {
  return nextAuthGetServerSession(authOptions)
}

export async function requireAuth() {
  const session = await getServerSession()
  if (!session?.user) {
    throw new Error('Unauthorized')
  }
  return session
}

export async function requireAdmin() {
  const session = await requireAuth()
  const adminEmails = process.env.ADMIN_EMAILS?.split(',') || []

  const isAdmin =
    session.user?.role === 'ADMIN' ||
    adminEmails.includes(session.user?.email || '')

  if (!isAdmin) {
    throw new Error('Forbidden: Admin access required')
  }

  return { ...session, isAdmin: true }
}
