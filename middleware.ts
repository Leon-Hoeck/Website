import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const hostname = req.headers.get('host') || ''; // e.g., en.site.ch or de.site.ch
  const subdomain = hostname.split('.')[0]; // Extract the subdomain

  console.log('Middleware - Hostname:', hostname);
  console.log('Middleware - Detected Subdomain:', subdomain);

  const locale = subdomain === 'de' ? 'de' : 'en'; // Default to 'en'
  console.log('Middleware - Set Locale:', locale);

  const url = req.nextUrl.clone();
  url.locale = locale; // Apply the detected locale

  return NextResponse.rewrite(url); // Rewrite the request with the new locale
}
