import React from 'react';
import Navbar from './Navbar';
import ScrollProgress from './ScrollProgress';
import { useTranslation } from 'next-i18next';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { t } = useTranslation('common');
  
  return (
    <div className="min-h-screen bg-gray-900">
      <ScrollProgress />
      <Navbar />
      <main>{children}</main>
      <footer className="bg-gray-900 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-gray-400 text-sm">
            <h2 className="font-medium text-white mb-4">{t('footer.impressum')}</h2>
            <div className="space-y-2">
              <p>{t('footer.responsible')}</p>
              <p>Leon Höck</p>
              <p>contact@leonhoeck.ch</p>
            </div>
            <div className="mt-6 text-xs">
              <p>© {new Date().getFullYear()} Leon Höck. {t('footer.rights')}</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
} 