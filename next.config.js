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
        source: '/',
        destination: '/cv/en',
        permanent: false,
        basePath: false
      },
      {
        source: '/en',
        destination: '/cv/en',
        permanent: true,
        basePath: false
      },
      {
        source: '/de',
        destination: '/cv/de',
        permanent: true,
        basePath: false
      },
    ]
  }
};

module.exports = nextConfig;