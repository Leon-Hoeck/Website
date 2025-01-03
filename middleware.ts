import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const config = {
  matcher: '/:path*',
};

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();

  // Extract the hostname and determine subdomain
  const hostname = req.headers.get('host') || '';
  const subdomain = hostname.split('.')[0]; // Extract the subdomain (e.g., 'en' or 'de')

  // List of supported locales
  const locales = ['en', 'de'];

  // If subdomain matches a locale, set it
  if (locales.includes(subdomain)) {
    url.locale = subdomain;
    return NextResponse.rewrite(url);
  }

  // Default to 'en' if no locale-specific subdomain is found
  url.locale = 'en';
  return NextResponse.rewrite(url);
}
