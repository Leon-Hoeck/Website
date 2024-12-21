import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { CVData } from '../../types/cv';
import Skills from '../../components/Skills';
import WorkExperience from '../../components/WorkExperience';
import Projects from '../../components/Projects';

interface HomeProps {
  cvData: CVData;
}

export default function Home({ cvData }: HomeProps) {
  const { t } = useTranslation('common');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header id="about" className="text-center mb-16 min-h-screen flex flex-col justify-center">
        <h1 className="text-4xl font-bold mb-4">{cvData.basics.name}</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">{cvData.basics.label}</p>
      </header>

      <section id="experience">
        <WorkExperience work={cvData.work} />
      </section>

      <section id="skills">
        <Skills skills={cvData.skills} />
      </section>

      <section id="projects">
        <Projects projects={cvData.projects} />
      </section>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { lang: 'en' } },
      { params: { lang: 'de' } },
    ],
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const lang = params?.lang as string;
  const cvData = await import(`../../data/cv-${lang}.json`).then(m => m.default);

  return {
    props: {
      ...(await serverSideTranslations(lang, ['common'])),
      cvData,
    },
  };
}; 