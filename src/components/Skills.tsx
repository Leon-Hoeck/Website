import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'next-i18next';
import { CVData } from '../types/cv';
import SkillsChart from './SkillsChart';
import SkillsLegend from './SkillsLegend';

interface SkillsProps {
  skills: CVData['skills'];
}

export default function Skills({ skills }: SkillsProps) {
  const { t } = useTranslation('common');
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  const categories = [...new Set(skills.map(skill => skill.category))];

  // Get top skills for the radar chart
  const topSkills = skills
    .sort((a, b) => b.level - a.level)
    .slice(0, 8);

  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold mb-8 text-white">{t('skills.title')}</h2>
      
      <div className="mb-12">
        <SkillsChart 
          skills={topSkills} 
          selectedSkill={selectedSkill}
          onSkillSelect={setSelectedSkill}
        />
        <SkillsLegend 
          skills={topSkills} 
          selectedSkill={selectedSkill}
          onSkillSelect={setSelectedSkill}
        />
      </div>

      <div className="space-y-8">
        {categories.map(category => (
          <div key={category}>
            <h3 className="text-xl font-semibold mb-4 text-white">
              {t(`skills.categories.${category}`)}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {skills
                .filter(skill => skill.category === category)
                .map(skill => (
                  <motion.div
                    key={skill.name}
                    className="p-4 bg-gray-800 rounded-lg shadow-sm"
                    whileHover={{ scale: 1.02 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <h4 className="font-medium text-white">{skill.name}</h4>
                    <div className="mt-2 bg-gray-700 rounded-full">
                      <motion.div
                        className="bg-blue-500 h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: 0.2 }}
                      />
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {skill.keywords.map(keyword => (
                        <span
                          key={keyword}
                          className="px-2 py-1 text-sm bg-gray-700 text-gray-300 rounded"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
} 