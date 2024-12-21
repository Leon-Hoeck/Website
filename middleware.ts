import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Get the pathname
  const pathname = request.nextUrl.pathname

  // Only handle specific paths
  if (pathname === '/en') {
    return NextResponse.redirect(new URL('/cv/en', request.url))
  }
  if (pathname === '/de') {
    return NextResponse.redirect(new URL('/cv/de', request.url))
  }

  // Let all other paths pass through
  return NextResponse.next()
}

// Only run middleware on language paths
export const config = {
  matcher: ['/en', '/de']
} 