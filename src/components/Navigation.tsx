import React from 'react';
import { useTranslation } from 'next-i18next';

interface NavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export default function Navigation({ activeSection, onSectionChange }: NavigationProps) {
  const { t } = useTranslation('common');

  const sections = [
    { id: 'about', label: t('nav.about') },
    { id: 'experience', label: t('nav.experience') },
    { id: 'skills', label: t('nav.skills') },
    { id: 'projects', label: t('nav.projects') },
    { id: 'contact', label: t('nav.contact') }
  ];

  return (
    <nav className="hidden md:flex space-x-4">
      {sections.map(({ id, label }) => (
        <button
          key={id}
          onClick={() => onSectionChange(id)}
          className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
            activeSection === id
              ? 'bg-gray-700 text-white'
              : 'text-gray-300 hover:bg-gray-700 hover:text-white'
          }`}
        >
          {label}
        </button>
      ))}
    </nav>
  );
} 