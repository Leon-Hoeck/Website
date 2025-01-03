import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default createMiddleware({
  // A list of all locales that are supported
  locales: ['en', 'de'],
  
  // Used when no locale matches
  defaultLocale: 'en',
  
  // Domain specific configuration
  domains: [
    {
      domain: 'en.localhost:3000',
      defaultLocale: 'en',
    },
    {
      domain: 'de.localhost:3000',
      defaultLocale: 'de',
    },
  ],

  // Disable path-based routing
  localePrefix: 'never'
});

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'
]
}; 