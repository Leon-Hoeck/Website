import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { CVData } from '../types/cv';

interface LayoutProps {
  children: React.ReactNode;
  profiles?: CVData['basics']['profiles'];
}

export default function Layout({ children, profiles = [] }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
      <Footer profiles={profiles} />
    </div>
  );
} 