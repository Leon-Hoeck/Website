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
  
  // Set comprehensive security headers for all responses
  const response = NextResponse.next();
  response.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive, nocache, nosnippet, notranslate, noimageindex');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  if (locales.includes(subdomain)) {
    url.locale = subdomain;
    const localeResponse = NextResponse.rewrite(url);
    // Copy headers to locale response
    response.headers.forEach((value, key) => {
      localeResponse.headers.set(key, value);
    });
    return localeResponse;
  }
  
  // Get the base domain without any subdomain
  const baseDomain = hostname.split('.').slice(-2).join('.');
  
  const baseUrl = isDev 
    ? `http://en.localhost:3000`
    : `https://en.${baseDomain}`;
  
  return NextResponse.redirect(new URL(url.pathname, baseUrl));
} 