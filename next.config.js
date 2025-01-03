
const { i18n } = require('./next-i18next.config');
module.exports = {
  i18n: {
    locales: ['en', 'de'], // Supported languages
    defaultLocale: 'en', // Default to English
    localeDetection: false, // Disable automatic locale detection, handled by middleware
  },
};

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Pass the i18n object so Next.js knows about your locales
  i18n,
  
  reactStrictMode: true,
  pageExtensions: ['ts', 'tsx', 'js', 'jsx'],

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' vercel.com *.vercel.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https:; font-src 'self'; connect-src 'self' vercel.com *.vercel.com; frame-ancestors 'none';"
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          }
        ]
      }
    ];
  },

  async redirects() {
    return [
    ];
  }
};

module.exports = nextConfig;
