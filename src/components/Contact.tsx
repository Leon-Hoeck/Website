import React from 'react';
import { useTranslation } from 'next-i18next';
import { EnvelopeIcon, MapPinIcon } from '@heroicons/react/24/outline';

interface ContactProps {
  email: string;
  location: {
    city: string;
    country: string;
  };
}

export default function Contact({ email, location }: ContactProps) {
  const { t } = useTranslation('common');

  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold mb-8 text-white">{t('contact.title')}</h2>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <a
            href={`mailto:${email}`}
            className="flex items-center space-x-3 text-gray-300 hover:text-blue-400 transition-colors"
          >
            <EnvelopeIcon className="w-6 h-6" />
            <span>{email}</span>
          </a>
          <div className="flex items-center space-x-3 text-gray-300">
            <MapPinIcon className="w-6 h-6" />
            <span>{`${location.city}, ${location.country}`}</span>
          </div>
        </div>
      </div>
    </section>
  );
} 