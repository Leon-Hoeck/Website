import React from 'react';
import { useTranslation } from 'next-i18next';

interface TagState {
  tag: string;
  state: 'include' | 'exclude' | null;
}

interface BlogSearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedTags: TagState[];
  onTagToggle: (tag: string) => void;
  availableTags: string[];
}

export default function BlogSearch({
  searchTerm,
  onSearchChange,
  selectedTags,
  onTagToggle,
  availableTags,
}: BlogSearchProps) {
  const { t } = useTranslation('common');

  return (
    <button
      onClick={() => {
        if (searchTerm) {
          onSearchChange('');
        } else {
          onSearchChange(' ');
        }
      }}
      className={`p-2 rounded-full transition-colors bg-gray-700/50 ${
        searchTerm
          ? 'text-white'
          : 'text-gray-400 hover:text-blue-400'
      }`}
      aria-label="Toggle search"
    >
      <svg
        className="w-4 h-4"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    </button>
  );
} 