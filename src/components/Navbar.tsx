import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

export default function Navbar() {
  const router = useRouter();
  const { t } = useTranslation('common');
  const [hostname, setHostname] = useState<string | null>(null);
  const [lang, setLang] = useState<string>('en');
  const [isVisible, setIsVisible] = useState(true);

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

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-sm border-b border-gray-800 transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16">
          <div className="flex-1 flex items-center">
            <Link href="/" className="text-xl font-bold text-white hover:text-blue-400 transition-colors">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Leon Höck
              </span>
            </Link>
          </div>
          <div className="flex-1 flex items-center justify-center space-x-4">
            <Link
              href="/blog"
              className="px-4 py-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-800 transition-all"
            >
              {t('nav.blog')}
            </Link>
            <Link
              href="/cv"
              className="px-4 py-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-800 transition-all"
            >
              {t('nav.cv')}
            </Link>
          </div>
          <div className="flex-1 flex items-center justify-end">
            {hostname && (
              <>
                <div className="h-4 w-px bg-gray-700 mx-4" />
                <div className="flex items-center space-x-4">
                  <Link
                    href={`http://en.${hostname}${router.asPath}`}
                    className={`px-2 py-1 rounded-md text-sm ${lang === 'en' ? 'text-blue-400' : 'text-gray-300 hover:text-white hover:bg-gray-800'} transition-all`}
                    aria-label="English"
                  >
                    EN
                  </Link>
                  <Link
                    href={`http://de.${hostname}${router.asPath}`}
                    className={`px-2 py-1 rounded-md text-sm ${lang === 'de' ? 'text-blue-400' : 'text-gray-300 hover:text-white hover:bg-gray-800'} transition-all`}
                    aria-label="Deutsch"
                  >
                    DE
                  </Link>
                  <Link
                    href={`http://fr.${hostname}${router.asPath}`}
                    className={`px-2 py-1 rounded-md text-sm ${lang === 'fr' ? 'text-blue-400' : 'text-gray-300 hover:text-white hover:bg-gray-800'} transition-all`}
                    aria-label="Français"
                  >
                    FR
                  </Link>
                  <Link
                    href={`http://it.${hostname}${router.asPath}`}
                    className={`px-2 py-1 rounded-md text-sm ${lang === 'it' ? 'text-blue-400' : 'text-gray-300 hover:text-white hover:bg-gray-800'} transition-all`}
                    aria-label="Italiano"
                  >
                    IT
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
