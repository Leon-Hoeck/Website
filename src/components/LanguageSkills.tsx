import React from 'react';
import { useTranslation } from 'next-i18next';
import { motion } from 'framer-motion';
import { CVData } from '../types/cv';
import SkillsChart from './SkillsChart';

interface LanguageSkillsProps {
  languageSkills: CVData['languageSkills'];
}

export default function LanguageSkills({ languageSkills }: LanguageSkillsProps) {
  const { t } = useTranslation('common');

  // Convert language skills to a format compatible with SkillsChart
  const skillsForChart = languageSkills.map(lang => ({
    name: lang.language,
    level: lang.level === 'Native' || lang.level === 'Muttersprache' || lang.level === 'Langue Maternelle' || lang.level === 'Madrelingua' ? 100 :
           lang.level === 'Fluent' || lang.level === 'Fliessend' || lang.level === 'Courant' || lang.level === 'Fluente' ? 90 :
           lang.level === 'Professional' || lang.level === 'Verhandlungssicher' || lang.level === 'Professionnel' || lang.level === 'Professionale' ? 80 :
           lang.level === 'Intermediate' || lang.level === 'Fortgeschritten' || lang.level === 'Intermédiaire' || lang.level === 'Intermedio' ? 60 :
           40, // Basic/Grundkenntnisse/Basique/Base
    keywords: Object.entries(lang.skills).map(([skill, level]) => `${skill}: ${level}`),
    category: 'Languages',
    description: `${lang.language} - ${lang.level}`,
    yearsOfExperience: 0,
    relatedSkills: []
  }));

  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold mb-8 text-white">{t('languages.title')}</h2>
      
      <div className="mb-12">
        <SkillsChart 
          skills={skillsForChart}
          selectedSkill={null}
          onSkillSelect={() => {}}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {languageSkills.map((lang, index) => (
          <motion.div
            key={lang.language}
            className="bg-gray-800 rounded-lg p-6 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <h3 className="text-xl font-bold text-white mb-4">{lang.language}</h3>
            <div className="space-y-2">
              {Object.entries(lang.skills).map(([skill, level]) => (
                <div key={skill} className="flex justify-between items-center">
                  <span className="text-gray-300 capitalize">{skill}</span>
                  <span className="text-blue-400">{level}</span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
} 