import React from 'react';
import { useTranslation } from 'next-i18next';
import { CVData } from '../types/cv';
import { ArrowTopRightOnSquareIcon, CodeBracketIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

interface ProjectsProps {
  projects: CVData['projects'];
}

export default function Projects({ projects }: ProjectsProps) {
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
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <section className="py-8">
      <motion.h2 
        className="text-3xl font-bold mb-8 text-white"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        {t('projects.title')}
      </motion.h2>
      <motion.div 
        className="grid gap-6 max-w-full"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {projects.map((project) => (
          <motion.div
            key={project.name}
            variants={item}
            className="group bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all duration-300 relative overflow-hidden"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/5 transition-all duration-500"
              initial={false}
            />
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                  {project.name}
                </h3>
                {project.sourceUrl && (
                  <motion.a
                    href={project.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 -mr-2 text-gray-400 hover:text-blue-400 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <CodeBracketIcon className="w-5 h-5" />
                  </motion.a>
                )}
              </div>
              <p className="text-gray-300 mb-4 leading-relaxed">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech) => (
                  <motion.span
                    key={tech}
                    className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm relative"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
              {project.highlights && (
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  {project.highlights.map((highlight, highlightIndex) => (
                    <li key={highlightIndex}>{highlight}</li>
                  ))}
                </ul>
              )}
              {project.sourceUrl && (
                <motion.a
                  href={project.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {t('projects.source')}
                  <ArrowTopRightOnSquareIcon className="w-4 h-4 ml-1" />
                </motion.a>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
} 