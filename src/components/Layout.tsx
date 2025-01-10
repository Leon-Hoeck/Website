import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { CVData } from '../types/cv';
import { AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import PageTransition from './PageTransition';

interface LayoutProps {
  children: React.ReactNode;
  profiles?: CVData['basics']['profiles'];
}

export default function Layout({ children, profiles = [] }: LayoutProps) {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col overflow-y-scroll">
      <Navbar />
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <PageTransition key={router.asPath}>
            {children}
          </PageTransition>
        </AnimatePresence>
      </main>
      <Footer profiles={profiles} />
    </div>
  );
} 