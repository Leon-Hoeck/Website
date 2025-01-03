import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

export default function Navbar() {
  const router = useRouter();
  const { t } = useTranslation('common');
  const currentHostname = typeof window !== 'undefined' ? window.location.hostname : '';
  const isLocalhost = currentHostname.includes('localhost');
  const baseUrl = isLocalhost ? 'localhost:3000' : currentHostname.split('.').slice(1).join('.');
  const currentLang = currentHostname.startsWith('de.') ? 'de' : 'en';

  return (
    <nav className="bg-gray-900 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Left side - Brand/Home */}
          <Link 
            href="/"
            className="text-white font-medium hover:text-gray-300 transition-colors"
            aria-label="Home"
          >
            Leon Höck
          </Link>

          {/* Right side - Navigation */}
          <div className="flex items-center space-x-4">
            <Link
              href="/cv"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
              aria-label={t('nav.viewCV')}
            >
              {t('nav.viewCV')}
            </Link>
            <Link
              href={`http://en.${baseUrl}${router.asPath}`}
              className={`text-sm ${currentLang === 'en' ? 'text-blue-400' : 'text-gray-300 hover:text-white'} transition-colors`}
              aria-label="English"
            >
              EN
            </Link>
            <Link
              href={`http://de.${baseUrl}${router.asPath}`}
              className={`text-sm ${currentLang === 'de' ? 'text-blue-400' : 'text-gray-300 hover:text-white'} transition-colors`}
              aria-label="Deutsch"
            >
              DE
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
