const path = require('path');

/** @type {import('next-i18next').UserConfig} */
module.exports = {
  i18n: {
    locales: ['en', 'de'],
    defaultLocale: 'en', // Set 'de' as the default locale
    localeDetection: false, // Prevent automatic detection
  },
  localePath: path.resolve('./public/locales'),
  reloadOnPrerender: process.env.NODE_ENV === 'development',
};
