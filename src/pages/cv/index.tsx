import React from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';

export default function CVPage() {
  const { t } = useTranslation('common');

  return (
    <div>
      <h1>{t('cv.title')}</h1>
      {/* CV content goes here */}
    </div>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common', 'cv'])),
    },
  };
}; 