import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const config = {
  matcher: '/:path*',
};

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const hostname = req.headers.get('host') || '';
  const subdomain = hostname.split('.')[0];
  
  // List of supported locales
  const locales = ['en', 'de', 'fr', 'it'];
  
  // Check if we're in development
  const isDev = process.env.NODE_ENV === 'development';
  
  if (isDev) {
    // Development behavior - use query parameter or subdomain for locale
    const locale = url.searchParams.get('locale') || subdomain;
    if (locales.includes(locale)) {
      url.locale = locale;
    } else {
      url.locale = 'en';
    }

    // For localhost, ensure proper URL format with port
    if (hostname.includes('localhost')) {
      const [, port] = hostname.split(':');
      if (url.locale !== 'en' && !hostname.startsWith(`${url.locale}.`)) {
        const redirectUrl = new URL(`http://${url.locale}.localhost${port ? `:${port}` : ':3000'}${url.pathname}`);
        return NextResponse.redirect(redirectUrl);
      }
    }
  } else {
    // Production behavior - use subdomains
    if (locales.includes(subdomain)) {
      url.locale = subdomain;
    } else {
      // Redirect to default locale subdomain
      const baseUrl = hostname.replace(`${subdomain}.`, '');
      return NextResponse.redirect(`https://en.${baseUrl}${url.pathname}`);
    }
  }

  // Add security headers
  const response = NextResponse.rewrite(url);
  response.headers.set('X-Robots-Tag', 'noindex, nofollow');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  return response;
}
