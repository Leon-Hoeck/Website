import React from 'react';
import { useTranslation } from 'next-i18next';
import { motion } from 'framer-motion';
import { CVData } from '../types/cv';

interface LanguageSkillsProps {
  languageSkills: CVData['languageSkills'];
}

export default function LanguageSkills({ languageSkills }: LanguageSkillsProps) {
  const { t } = useTranslation('common');

  return (
    <section className="py-8">
      <h2 className="text-3xl font-bold mb-8 text-white">{t('languages.title')}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {languageSkills.map((lang, index) => (
          <motion.div
            key={lang.language}
            className="bg-gray-800 rounded-lg p-6 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-white">{lang.language}</h3>
              <span className="text-blue-400 font-medium">{lang.level}</span>
            </div>
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