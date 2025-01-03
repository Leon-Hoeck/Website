import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default createMiddleware({
  // A list of all locales that are supported
  locales: ['en', 'de', 'fr', 'it'],
  
  // Used when no locale matches
  defaultLocale: 'en',
  
  // Domain specific configuration
  domains: [
    {
      domain: 'en.leonhoeck.ch',
      defaultLocale: 'en',
      locales: ['en']
    },
    {
      domain: 'de.leonhoeck.ch',
      defaultLocale: 'de',
      locales: ['de']
    },
    {
      domain: 'fr.leonhoeck.ch',
      defaultLocale: 'fr',
      locales: ['fr']
    },
    {
      domain: 'it.leonhoeck.ch',
      defaultLocale: 'it',
      locales: ['it']
    },
    // Development domains
    {
      domain: 'en.localhost:3000',
      defaultLocale: 'en',
      locales: ['en']
    },
    {
      domain: 'de.localhost:3000',
      defaultLocale: 'de',
      locales: ['de']
    },
    {
      domain: 'fr.localhost:3000',
      defaultLocale: 'fr',
      locales: ['fr']
    },
    {
      domain: 'it.localhost:3000',
      defaultLocale: 'it',
      locales: ['it']
    }
  ],

  // Disable path-based routing
  localePrefix: 'never'
});

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'
]
}; 