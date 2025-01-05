const path = require('path');

/** @type {import('next-i18next').UserConfig} */
module.exports = {
  i18n: {
    locales: ['en', 'de', 'fr', 'it'],
    defaultLocale: 'en',
    localeDetection: false,
    domains: [
      {
        domain: 'en.leonhoeck.ch',
        defaultLocale: 'en',
        locales: ['en'],
      },
      {
        domain: 'de.leonhoeck.ch',
        defaultLocale: 'de',
        locales: ['de'],
      },
      {
        domain: 'fr.leonhoeck.ch',
        defaultLocale: 'fr',
        locales: ['fr'],
      },
      {
        domain: 'it.leonhoeck.ch',
        defaultLocale: 'it',
        locales: ['it'],
      },
    ]
  },
  ns: ['common'],
  defaultNS: 'common',
  localePath: path.resolve('./public/locales'),
  reloadOnPrerender: process.env.NODE_ENV === 'development',
};
