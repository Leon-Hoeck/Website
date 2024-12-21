/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['ts', 'tsx', 'js', 'jsx'],
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'de'],
    localeDetection: false
  }
};

module.exports = nextConfig;