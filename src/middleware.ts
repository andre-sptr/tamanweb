import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

const adminEmails = (process.env.ADMIN_EMAILS || '').split(',')

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const isAdmin = token?.role === 'ADMIN' || adminEmails.includes(token?.email || '')
    const isAuthPage = req.nextUrl.pathname.startsWith('/login') || req.nextUrl.pathname.startsWith('/register')

    // Redirect authenticated users away from auth pages
    if (token && isAuthPage) {
      return NextResponse.redirect(new URL('/', req.url))
    }

    // Protect admin routes
    if (req.nextUrl.pathname.startsWith('/dashboard') && !isAdmin) {
      return NextResponse.redirect(new URL('/', req.url))
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
)

export const config = {
  matcher: [
    '/account/:path*',
    '/purchases/:path*',
    '/dashboard/:path*',
  ],
}
