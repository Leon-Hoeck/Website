import React from 'react';
import { useTranslation } from 'next-i18next';
import { motion } from 'framer-motion';

interface WorkItem {
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  highlights: string[];
}

interface WorkExperienceProps {
  work: WorkItem[];
}

export default function WorkExperience({ work }: WorkExperienceProps) {
  const { t } = useTranslation('common');

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section className="py-12" id="experience">
      <motion.h2
        className="text-3xl font-bold mb-8 text-white"
        initial="hidden"
        animate="show"
        variants={container}
      >
        {t('work.title')}
      </motion.h2>
      <motion.div
        className="space-y-8"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {work.map((item, index) => (
          <motion.div
            key={index}
            variants={item}
            className="bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <h3 className="text-xl font-semibold text-white mb-2">{item.position}</h3>
            <p className="text-blue-400 mb-2">{item.company}</p>
            <p className="text-gray-400 text-sm mb-4">
              {item.startDate} - {item.endDate || t('work.present')}
            </p>
            <ul className="list-disc list-inside space-y-2">
              {item.highlights.map((highlight, idx) => (
                <li key={idx} className="text-gray-300">{highlight}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
} 