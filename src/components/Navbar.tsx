import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Navbar() {
  const router = useRouter();
  const [hostname, setHostname] = useState<string | null>(null);
  const [lang, setLang] = useState<string>('en');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const currentHostname = window.location.hostname;
      const cleanHostname = currentHostname.replace(/^(en|de|fr|it)\./, '');
      setHostname(cleanHostname);
      setLang(currentHostname.startsWith('en.') ? 'en' : 
              currentHostname.startsWith('de.') ? 'de' :
              currentHostname.startsWith('fr.') ? 'fr' :
              currentHostname.startsWith('it.') ? 'it' : 'en');
    }
  }, []);

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
              aria-label="View CV"
            >
              View CV
            </Link>
            {hostname && (
              <>
                <Link
                  href={`http://en.${hostname}${router.asPath}`}
                  className={`text-sm ${lang === 'en' ? 'text-blue-400' : 'text-gray-300 hover:text-white'} transition-colors`}
                  aria-label="English"
                >
                  EN
                </Link>
                <Link
                  href={`http://de.${hostname}${router.asPath}`}
                  className={`text-sm ${lang === 'de' ? 'text-blue-400' : 'text-gray-300 hover:text-white'} transition-colors`}
                  aria-label="Deutsch"
                >
                  DE
                </Link>
                <Link
                  href={`http://fr.${hostname}${router.asPath}`}
                  className={`text-sm ${lang === 'fr' ? 'text-blue-400' : 'text-gray-300 hover:text-white'} transition-colors`}
                  aria-label="Français"
                >
                  FR
                </Link>
                <Link
                  href={`http://it.${hostname}${router.asPath}`}
                  className={`text-sm ${lang === 'it' ? 'text-blue-400' : 'text-gray-300 hover:text-white'} transition-colors`}
                  aria-label="Italiano"
                >
                  IT
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
