import React from 'react';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import type { GetStaticProps } from 'next';
import type { CVData } from '../../../types/cv';
import Skills from '../../../components/Skills';
import WorkExperience from '../../../components/WorkExperience';
import Projects from '../../../components/Projects';
import Contact from '../../../components/Contact';
import { cvData } from '../../../data/cv-en';

export default function CV() {
  const { t } = useTranslation('common');
  const pageTitle = `${cvData.basics.name} - ${cvData.basics.label}`;

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
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
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'en', ['common'])),
    },
  };
}; 