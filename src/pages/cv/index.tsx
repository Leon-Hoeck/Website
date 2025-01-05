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
  cvData: CVData;
}

export default function CV({ cvData }: HomeProps) {
  const { t } = useTranslation('common');
  const [showArrow, setShowArrow] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setShowArrow(false);
        setShowContent(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div id="about" className="text-center min-h-screen flex flex-col justify-center relative -mt-32 mb-32">
        <h1 className="inline-block text-4xl font-bold mb-2 tracking-wide bg-gradient-to-r from-teal-400 to-pink-500 bg-clip-text text-transparent hover:from-teal-500 hover:to-pink-600 drop-shadow-[0_0_8px_rgba(59,130,246,0.5)] transition-all duration-300">
          {cvData.basics.name}
        </h1>
        <p className="text-xl text-gray-400">{cvData.basics.label}</p>
        <AnimatePresence>
          {showArrow && (
            <motion.div 
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
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
              <ChevronDownIcon className="w-8 h-8 text-blue-400" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {showContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <section id="experience">
              <WorkExperience work={cvData.work} />
            </section>

            <section id="skills">
              <Skills skills={cvData.skills} />
            </section>

            <section id="projects">
              <Projects projects={cvData.projects} />
            </section>

            <section id="languages">
              <LanguageSkills languageSkills={cvData.languageSkills} />
            </section>

            <section id="contact">
              <Contact
                email={cvData.basics.email}
                location={cvData.basics.location}
              />
            </section>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  console.log('getStaticProps - Locale:', context.locale);

  const lang = context.locale || 'en';

  const cvData = await import(`../../data/cv-${lang}.json`)
    .then((m) => m.default)
    .catch((e) => {
      console.error('Error loading CV data:', e);
      return null;
    });

  if (!cvData) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      cvData,
      ...(await serverSideTranslations(lang, ['common'])),
    },
  };
};
