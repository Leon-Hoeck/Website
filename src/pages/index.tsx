import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col justify-center items-center text-center">
      <h1 className="text-5xl font-bold mb-6">What are you doing here?</h1>
      <p className="text-xl text-gray-400 mb-12">
        Go to the Main Page
      </p>
      <Link 
        href="/en" // Link to the main page
        className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
      >
        Main Page
      </Link>
    </div>
  );
} 