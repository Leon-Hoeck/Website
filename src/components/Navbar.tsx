import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Navbar() {
  // This hook gives you the current path (router.asPath) and current locale (router.locale)
  const router = useRouter();

  return (
    <nav className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Your site name or logo */}
        <Link href="/">
          <span className="text-white font-medium">Leon Höck</span>
        </Link>

        {/* Right side: language switch */}
        <div className="flex items-center space-x-4">
          {/* Switch to English, preserving the current path */}
          <Link
            href={router.asPath}
            locale="en"
            className={router.locale === 'en' ? 'text-blue-400' : 'text-gray-300 hover:text-white'}
          >
            English
          </Link>

          {/* Switch to Deutsch, preserving the current path */}
          <Link
            href={router.asPath}
            locale="de"
            className={router.locale === 'de' ? 'text-blue-400' : 'text-gray-300 hover:text-white'}
          >
            Deutsch
          </Link>

          {/* “View CV” link -> automatically adds /en/ or /de/ based on current locale */}
          <Link
            href="/cv"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            View CV
          </Link>
        </div>
      </div>
    </nav>
  );
}