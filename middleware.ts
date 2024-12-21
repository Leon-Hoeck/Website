import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Middleware function to handle redirects
export function middleware(request: NextRequest) {
  // Only redirect for the root path
  if (request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/en', request.url))
  }
}

// Only run middleware on home page
export const config = {
  matcher: '/'
} 