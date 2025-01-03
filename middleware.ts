import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const config = {
  matcher: '/:path*',
};

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const hostname = req.headers.get('host') || '';
  const subdomain = hostname.split('.')[0];
  
  // Updated list of supported locales
  const locales = ['en', 'de', 'fr', 'it'];
  
  // Check if we're in development
  const isDev = process.env.NODE_ENV === 'development';
  
  if (isDev) {
    // Development behavior - use query parameter for locale
    const locale = url.searchParams.get('locale') || subdomain;
    if (locales.includes(locale)) {
      url.locale = locale;
    } else {
      url.locale = 'en';
    }
  } else {
    // Production behavior - use subdomains
    if (locales.includes(subdomain)) {
      url.locale = subdomain;
    } else {
      // Redirect to default locale subdomain if no locale is specified
      return NextResponse.redirect(`https://en.leonhoeck.ch${url.pathname}`);
    }
  }

  return NextResponse.rewrite(url);
}
