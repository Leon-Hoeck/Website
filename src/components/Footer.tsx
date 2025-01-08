import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface FooterProps {
  profiles?: {
    network: string;
    url: string;
  }[];
}

export default function Footer({ profiles = [] }: FooterProps) {
  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-400">
            © {new Date().getFullYear()} Leon Höck
          </div>
          <div className="flex space-x-4">
            {profiles.map((profile) => (
              <motion.a
                key={profile.network}
                href={profile.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {profile.network}
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
} 