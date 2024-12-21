import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import Navigation from './Navigation';
import MobileNav from './MobileNav';
import ScrollProgress from './ScrollProgress';
import Head from 'next/head';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const router = useRouter();
  const { t } = useTranslation('common');
  const [activeSection, setActiveSection] = useState('about');

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
   
  const switchLanguage = (locale: string) => {
    const { pathname, asPath, query } = router;
    router.push({ pathname, query }, asPath, { locale });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <Head>
        <title>{t('meta.title')}</title>
        <meta name="description" content={t('meta.description')} />
      </Head>
      <ScrollProgress />
      <header className="fixed top-0 w-full bg-gray-800/80 backdrop-blur-sm shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-8">
              <span className="text-xl font-bold text-white">CV</span>
              <Navigation
                activeSection={activeSection}
                onSectionChange={handleSectionChange}
              />
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden md:block h-6 w-px bg-gray-700" />
              <div className="hidden md:flex space-x-2">
                <button
                  onClick={() => switchLanguage('en')}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    router.locale === 'en' 
                      ? 'bg-gray-700 text-white' 
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => switchLanguage('de')}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    router.locale === 'de' 
                      ? 'bg-gray-700 text-white' 
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  DE
                </button>
              </div>
              <MobileNav
                activeSection={activeSection}
                onSectionChange={handleSectionChange}
              />
            </div>
          </div>
        </div>
      </header>
      <main className="pt-16">
        {children}
      </main>
    </div>
  );
} 