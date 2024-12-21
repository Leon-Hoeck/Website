import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export const config = {
  matcher: ['/', '/en', '/de'],
  runtime: 'edge'
}

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()
  const { pathname } = url

  // Map of redirects
  const redirects = {
    '/': '/cv/en',
    '/en': '/cv/en',
    '/de': '/cv/de'
  }

  // Check if path needs redirect
  if (pathname in redirects) {
    url.pathname = redirects[pathname]
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
} 