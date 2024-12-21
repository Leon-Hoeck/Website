import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { CVData } from '../../../types/cv';
import Skills from '../../../components/Skills';
import WorkExperience from '../../../components/WorkExperience';
import Projects from '../../../components/Projects';
import Contact from '../../../components/Contact';

interface HomeProps {
  cvData: CVData;
}

export default function Home({ cvData }: HomeProps) {
  const { t } = useTranslation('common');

  return (
    <div className="min-h-screen w-full bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header id="about" className="text-center mb-16 min-h-[calc(100vh-6rem)] flex flex-col justify-center">
          <h1 className="text-4xl font-bold mb-4 text-white">{cvData.basics.name}</h1>
          <p className="text-xl text-gray-400">{cvData.basics.label}</p>
        </header>

        <section id="experience" className="mb-16">
          <WorkExperience work={cvData.work} />
        </section>

        <section id="skills" className="mb-16">
          <Skills skills={cvData.skills} />
        </section>

        <section id="projects" className="mb-16">
          <Projects projects={cvData.projects} />
        </section>

        <section id="contact" className="mb-16">
          <Contact
            email={cvData.basics.email}
            location={cvData.basics.location}
          />
        </section>
      </div>
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
  const cvData = await import(`../../../data/cv-${lang}.json`).then(m => m.default);

  return {
    props: {
      ...(await serverSideTranslations(lang, ['common'])),
      cvData,
    },
  };
}; 