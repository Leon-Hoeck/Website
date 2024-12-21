import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="min-h-screen flex flex-col justify-center items-center text-center">
          <h1 className="text-5xl font-bold mb-6">Welcome to My Digital Space</h1>
          <p className="text-xl text-gray-400 mb-12 max-w-2xl">
            A collection of my projects, thoughts, and professional journey.
          </p>
          <div className="space-x-4">
            <Link 
              href="/cv/en"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              View My CV
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 