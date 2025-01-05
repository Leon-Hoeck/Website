import React from 'react';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';

interface MainData {
  title: string;
  text: string;
  cv: string;
  contact: {
    title: string;
  };
}

interface HomeProps {
  mainData: MainData;
}

export default function Home({ mainData }: HomeProps) {
  const { t } = useTranslation('common');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="min-h-[calc(100vh-8rem)] flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl font-bold mb-4 text-white">{mainData.title}</h1>
        <p className="text-xl text-gray-400 mb-8 max-w-2xl text-center">{mainData.text}</p>
        <Link
          href="/cv"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-colors"
        >
          {mainData.cv}
        </Link>
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const lang = context.locale || 'en';

  try {
    const mainData = await import(`../data/main-${lang}.json`)
      .then((m) => m.default)
      .catch(async () => {
        // Silently fall back to English
        return await import('../data/main-en.json').then((m) => m.default);
      });

    if (!mainData) {
      return { notFound: true };
    }

    return {
      props: {
        mainData,
        ...(await serverSideTranslations(lang, ['common'])),
      },
    };
  } catch (error) {
    return { notFound: true };
  }
};


