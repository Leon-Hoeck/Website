import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const hostname = req.headers.get('host') || ''; // Extract the host (e.g., de.site.ch)
  console.log('Middleware - Hostname:', hostname);

  const subdomain = hostname.split('.')[0]; // Get the first part before the domain
  console.log('Middleware - Detected Subdomain:', subdomain);

  // Map subdomains to locales
  const locale = subdomain === 'de' ? 'de' : 'en'; // Default to English
  console.log('Middleware - Set Locale:', locale);

  const url = req.nextUrl.clone();
  url.locale = locale; // Apply the locale dynamically
  return NextResponse.rewrite(url);
}
