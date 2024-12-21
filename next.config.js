/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['ts', 'tsx', 'js', 'jsx'],
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'de'],
    localeDetection: false
  },
  async redirects() {
    return [
      {
        source: '/en',
        destination: '/cv/en',
        permanent: true,
      },
      {
        source: '/de',
        destination: '/cv/de',
        permanent: true,
      },
    ]
  }
};

module.exports = nextConfig;