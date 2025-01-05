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
          <div className="flex items-center space-x-8">
            <Link 
              href="/"
              className="no-underline text-xl font-bold tracking-wide bg-gradient-to-r from-teal-400 to-pink-500 bg-clip-text text-transparent hover:from-teal-500 hover:to-pink-600 drop-shadow-[0_0_8px_rgba(59,130,246,0.5)] transition-all duration-300"
              aria-label="Home"
            >
              Leon Höck
            </Link>
            <Link
              href="/cv"
              className="text-gray-300 hover:text-white transition-colors text-sm font-medium"
              aria-label="View CV"
            >
              View CV
            </Link>
          </div>

          {/* Right side - Language Selection */}
          <div className="flex items-center space-x-4">
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
