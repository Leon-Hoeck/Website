import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)', '/'],
};

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const hostname = req.headers.get('host') || '';
  const subdomain = hostname.split('.')[0];
  const locales = ['en', 'de', 'fr', 'it'];
  const isDev = process.env.NODE_ENV === 'development';
  
  if (locales.includes(subdomain)) {
    url.locale = subdomain;
    const response = NextResponse.rewrite(url);
    response.headers.set('X-Robots-Tag', 'noindex, nofollow');
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    return response;
  }
  
  // Get the base domain without any subdomain
  const baseDomain = hostname.split('.').slice(-2).join('.');
  
  const baseUrl = isDev 
    ? `http://en.localhost:3000`
    : `https://en.${baseDomain}`;
  
  return NextResponse.redirect(new URL(url.pathname, baseUrl));
} 