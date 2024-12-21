import React from 'react';
import { useTranslation } from 'next-i18next';
import { motion } from 'framer-motion';

interface EducationItem {
  degree: string;
  school: string;
  period: string;
  description: string[];
}

interface EducationProps {
  education: EducationItem[];
}

export default function Education({ education }: EducationProps) {
  const { t } = useTranslation('common');

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section className="py-12" id="education">
      <motion.h2 
        className="text-3xl font-bold mb-8 text-white"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        {t('education.title')}
      </motion.h2>
      <motion.div 
        className="space-y-8"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {education.map((item, index) => (
          <motion.div 
            key={index}
            variants={item}
            className="bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <h3 className="text-xl font-semibold text-white mb-2">{item.degree}</h3>
            <p className="text-blue-400 mb-2">{item.school}</p>
            <p className="text-gray-400 text-sm mb-4">{item.period}</p>
            <ul className="list-disc list-inside space-y-2">
              {item.description.map((desc, idx) => (
                <li key={idx} className="text-gray-300">{desc}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
} 