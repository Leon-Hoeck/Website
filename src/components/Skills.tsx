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
    </section>
  );
} 