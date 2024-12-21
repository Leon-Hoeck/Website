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
        <form className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
              {t('contact.form.name')}
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
              {t('contact.form.email')}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
              {t('contact.form.message')}
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            {t('contact.form.submit')}
          </button>
        </form>
      </div>
    </section>
  );
} 