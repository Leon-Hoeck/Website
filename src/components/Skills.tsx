import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'next-i18next';
import SkillsChart from './SkillsChart';

interface Skill {
  name: string;
  level: number;
  keywords: string[];
  description?: string;
  yearsOfExperience?: number;
  relatedSkills?: string[];
}

interface SkillsProps {
  skills: Skill[];
}

export default function Skills({ skills }: SkillsProps) {
  const { t } = useTranslation('common');
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  const topSkills = skills
    .sort((a, b) => b.level - a.level)
    .slice(0, 5);

  const selectedSkillData = selectedSkill ? skills.find(s => s.name === selectedSkill) : null;

  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold mb-8 text-white">{t('skills.title')}</h2>
      
      <SkillsChart 
        skills={topSkills} 
        selectedSkill={selectedSkill}
        onSkillSelect={setSelectedSkill}
      />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr,2fr] gap-2">
        {/* Skill Description Section */}
        <div className="relative h-[140px]">
          <AnimatePresence mode="wait">
            {selectedSkillData ? (
              <motion.div
                key={selectedSkillData.name}
                initial={{ opacity: 0, height: 0 }}
                animate={{ 
                  opacity: 1, 
                  height: "auto",
                  transition: {
                    height: {
                      type: "spring",
                      bounce: 0.2,
                      duration: 0.6
                    }
                  }
                }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-gray-800/90 rounded-lg border border-gray-700/30 backdrop-blur-sm shadow-lg overflow-hidden absolute w-full"
              >
                <div className="p-6">
                  <h3 className="text-2xl font-medium text-white mb-6">{selectedSkillData.name}</h3>
                  
                  <div className="space-y-6">
                    {selectedSkillData.description && (
                      <div>
                        <h4 className="text-lg font-medium text-gray-300 mb-3">{t('skills.description')}</h4>
                        <p className="text-gray-300">{selectedSkillData.description}</p>
                      </div>
                    )}
                    
                    {selectedSkillData.yearsOfExperience && (
                      <div>
                        <h4 className="text-lg font-medium text-gray-300 mb-3">{t('skills.experience')}</h4>
                        <p className="text-gray-300">
                          {selectedSkillData.yearsOfExperience} {t('skills.years')}
                        </p>
                      </div>
                    )}

                    {selectedSkillData.keywords && selectedSkillData.keywords.length > 0 && (
                      <div>
                        <h4 className="text-lg font-medium text-gray-300 mb-3">{t('skills.keywords')}</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedSkillData.keywords.map(keyword => (
                            <span
                              key={keyword}
                              className="px-3 py-1.5 text-sm bg-gray-700/50 text-gray-300 rounded-md"
                            >
                              {keyword}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {selectedSkillData.relatedSkills && selectedSkillData.relatedSkills.length > 0 && (
                      <div>
                        <h4 className="text-lg font-medium text-gray-300 mb-3">{t('skills.related')}</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedSkillData.relatedSkills.map(related => (
                            <button
                              key={related}
                              onClick={() => setSelectedSkill(related)}
                              className="px-3 py-1.5 text-sm bg-blue-500/10 text-blue-400 rounded-md hover:bg-blue-500/20 transition-colors"
                            >
                              {related}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-gray-800/50 rounded-lg border border-gray-700/30 overflow-hidden absolute w-full"
              >
                <div className="p-6">
                  <div className="flex flex-col items-center justify-center text-center py-8">
                    <svg 
                      className="w-12 h-12 text-gray-500 mb-4" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={1.5} 
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                      />
                    </svg>
                    <p className="text-gray-400 text-lg">
                      Select a skill to see more information
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {skills.map(skill => (
            <motion.button
              key={skill.name}
              onClick={() => setSelectedSkill(skill.name === selectedSkill ? null : skill.name)}
              className={`p-4 rounded-lg text-left transition-colors h-[140px] ${
                skill.name === selectedSkill
                  ? 'bg-blue-500/20 border border-blue-500/30'
                  : 'bg-gray-800/50 hover:bg-gray-800/80 border border-gray-700/30'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-lg text-white">{skill.name}</h3>
                <span className="text-sm text-gray-400">{skill.level}%</span>
              </div>

              <div className="mt-2 bg-gray-700 rounded-full">
                <motion.div
                  className="bg-blue-500 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.level}%` }}
                  transition={{ duration: 1, delay: 0.2 }}
                />
              </div>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {skill.keywords.map(keyword => (
                  <span
                    key={keyword}
                    className="px-2 py-1 text-xs bg-gray-700/50 text-gray-300 rounded"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
} 