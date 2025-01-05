import React from 'react';
import { useTranslation } from 'next-i18next';
import { motion } from 'framer-motion';
import { CVData } from '../types/cv';

interface WorkExperienceProps {
  work: CVData['work'];
}

export default function WorkExperience({ work }: WorkExperienceProps) {
  const { t } = useTranslation('common');

  return (
    <section className="py-8">
      <h2 className="text-3xl font-bold mb-8 text-white">{t('work.title')}</h2>
      <div className="space-y-8">
        {work.map((job, index) => (
          <motion.div
            key={job.company}
            className="group bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all duration-300 relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/5 transition-all duration-500"
              initial={false}
            />
            <div className="relative z-10">
              <h3 className="text-xl font-bold text-white mb-2">{job.position}</h3>
              <div className="text-gray-300 mb-4">
                <span className="font-medium">{job.company}</span>
                <span className="mx-2">•</span>
                <span>
                  {job.startDate} - {job.endDate || t('work.present')}
                </span>
              </div>
              <ul className="space-y-2">
                {job.highlights.map((highlight, i) => (
                  <li key={i} className="text-gray-300 flex items-start">
                    <span className="mr-2">•</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
} 