const { i18n } = require('./next-i18next.config');

/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ['en', 'de', 'fr', 'it'],
    defaultLocale: 'en',
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
      }
    ]
  },
  reactStrictMode: true,
  pageExtensions: ['ts', 'tsx', 'js', 'jsx'],

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex, nofollow',
          },
          {
            key: 'Cache-Control',
            value: 'no-store',
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' vercel.com *.vercel.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https:; font-src 'self'; connect-src 'self' vercel.com *.vercel.com; frame-ancestors 'none';",
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },

  async redirects() {
    return [
      // Add additional redirects if needed
    ];
  },
};

module.exports = nextConfig;
