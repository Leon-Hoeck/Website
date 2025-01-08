import React, { useState, useEffect } from 'react';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { CVData } from '../../types/cv';
import Skills from '../../components/Skills';
import WorkExperience from '../../components/WorkExperience';
import Projects from '../../components/Projects';
import Contact from '../../components/Contact';
import LanguageSkills from '../../components/LanguageSkills';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';

interface HomeProps {
  cvData?: CVData;
}

export default function CV({ cvData }: HomeProps) {
  const { t } = useTranslation('common');
  const [showArrow, setShowArrow] = useState(true);

  if (!cvData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl text-white mb-4">Loading...</h1>
        </div>
      </div>
    );
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setShowArrow(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div id="about" className="min-h-[90vh] flex flex-col justify-center items-center relative">
        <div className="text-center space-y-4 -mt-32">
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]">
            {cvData.basics.name}
          </h1>
          <p className="text-2xl text-gray-400">{cvData.basics.label}</p>
        </div>
        <AnimatePresence>
          {showArrow && (
            <motion.div 
              className="absolute bottom-24 inset-x-0 mx-auto w-fit"
              animate={{ y: [0, 10, 0] }}
              exit={{ 
                opacity: 0,
                y: 10,
                transition: { duration: 0.5 }
              }}
              transition={{ 
                duration: 2,
                repeat: showArrow ? Infinity : 0,
                ease: "easeInOut",
                repeatType: "reverse"
              }}
            >
              <ChevronDownIcon className="w-12 h-12 text-blue-400" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <section id="experience">
            <WorkExperience work={cvData.work} />
          </section>

          <section id="skills" className="mt-24">
            <Skills skills={cvData.skills} />
          </section>

          <section id="projects" className="mt-24">
            <Projects projects={cvData.projects} />
          </section>

          <section id="languages" className="mt-24">
            <LanguageSkills languageSkills={cvData.languageSkills} />
          </section>

          <section id="contact" className="mt-24">
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

export const getStaticProps: GetStaticProps = async (context) => {
  const lang = context.locale || 'en';

  try {
    const cvData = await import(`../../data/cv-${lang}.json`)
      .then((m) => m.default)
      .catch(async () => {
        // Silently fall back to English
        return await import('../../data/cv-en.json').then((m) => m.default);
      });

    if (!cvData) {
      return { notFound: true };
    }

    return {
      props: {
        cvData,
        ...(await serverSideTranslations(lang, ['common'])),
      },
    };
  } catch (error) {
    return { notFound: true };
  }
};
