import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Navbar() {
  const router = useRouter();
  const isCV = router.pathname.startsWith('/cv');

  return (
    <nav className="bg-gray-900 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Left side - Brand/Home */}
          <Link 
            href="/"
            className="text-white font-medium hover:text-gray-300 transition-colors"
          >
            Leon Höck
          </Link>

          {/* Right side - Navigation */}
          <div className="flex items-center space-x-4">
            {!isCV ? (
              <Link
                href="/cv/en"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                View CV
              </Link>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  href="/cv/en"
                  className={`text-sm ${
                    router.query.lang === 'en'
                      ? 'text-blue-400'
                      : 'text-gray-300 hover:text-white'
                  } transition-colors`}
                >
                  English
                </Link>
                <Link
                  href="/cv/de"
                  className={`text-sm ${
                    router.query.lang === 'de'
                      ? 'text-blue-400'
                      : 'text-gray-300 hover:text-white'
                  } transition-colors`}
                >
                  Deutsch
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
} 