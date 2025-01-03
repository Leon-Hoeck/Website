import React from 'react';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { MainData } from '../types/main';

interface HomeProps {
  mainData: MainData;
}

export default function Home({ mainData }: HomeProps) {
  return (
    <div className="min-h-screen w-full bg-gray-900 flex flex-col items-center justify-center text-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header id="about" className="mb-16">
          <h1 className="text-4xl font-bold mb-4 text-white">{mainData.title}</h1>
          <p className="text-xl text-gray-400 mb-6">{mainData.text}</p>
          <Link
            href="/cv"
            className="inline-flex items-center px-6 py-3 border border-transparent text-lg font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            {mainData.cv}
          </Link>
        </header>
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  console.log('getStaticProps - Locale:', context.locale); // Debug log

  const lang = context.locale || 'en'; // Use the locale detected by middleware or fallback
  const mainData = await import(`../data/main-${lang}.json`).then((m) => m.default);

  return {
    props: {
      mainData,
      ...(await serverSideTranslations(lang, ['common'])),
    },
  };
};


