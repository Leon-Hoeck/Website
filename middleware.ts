import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Middleware function to handle redirects
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Handle root path
  if (path === '/') {
    const url = new URL('/cv/en', request.url)
    return NextResponse.redirect(url, { status: 308 }) // Permanent redirect
  }

  // Handle language paths
  if (path === '/en') {
    const url = new URL('/cv/en', request.url)
    return NextResponse.redirect(url, { status: 308 })
  }

  if (path === '/de') {
    const url = new URL('/cv/de', request.url)
    return NextResponse.redirect(url, { status: 308 })
  }
}

// Run middleware on these paths
export const config = {
  matcher: ['/', '/en', '/de']
} 