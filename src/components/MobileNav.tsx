import React, { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';

interface MobileNavProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export default function MobileNav({ activeSection, onSectionChange }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation('common');

  const sections = [
    { id: 'about', label: t('nav.about') },
    { id: 'experience', label: t('nav.experience') },
    { id: 'skills', label: t('nav.skills') },
    { id: 'projects', label: t('nav.projects') },
    { id: 'contact', label: t('nav.contact') }
  ];

  const handleClick = (id: string) => {
    onSectionChange(id);
    setIsOpen(false);
  };

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-gray-300 hover:text-white p-2"
        aria-label="Toggle menu"
      >
        {isOpen ? (
          <XMarkIcon className="h-6 w-6" />
        ) : (
          <Bars3Icon className="h-6 w-6" />
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-16 right-0 w-48 py-2 bg-gray-800 rounded-lg shadow-xl"
          >
            {sections.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => handleClick(id)}
                className={`block w-full text-left px-4 py-2 text-sm transition-colors ${
                  activeSection === id
                    ? 'bg-gray-700 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                {label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 