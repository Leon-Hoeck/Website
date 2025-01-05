import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'next-i18next';

interface SkillsLegendProps {
  skills: {
    name: string;
    level: number;
    keywords?: string[];
  }[];
  selectedSkill: string | null;
  onSkillSelect: (skillName: string | null) => void;
}

const getSkillLevelText = (level: number, t: any): string => {
  if (level >= 90) return t('skills.levels.master');
  if (level >= 80) return t('skills.levels.expert');
  if (level >= 60) return t('skills.levels.advanced');
  if (level >= 40) return t('skills.levels.intermediate');
  return t('skills.levels.beginner');
};

export default function SkillsLegend({ skills, selectedSkill, onSkillSelect }: SkillsLegendProps) {
  const { t } = useTranslation('common');
  const [showInitialGlow, setShowInitialGlow] = useState(false);
  const [hasBeenVisible, setHasBeenVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const selectedSkillData = selectedSkill 
    ? skills.find(skill => skill.name === selectedSkill)
    : null;

  // Calculate total animation time based on grid size
  const COLS = 4; // md:grid-cols-4
  const totalItems = skills.length;
  const ROWS = Math.ceil(totalItems / COLS);
  const TOTAL_DIAGONALS = ROWS + COLS - 1;
  const DELAY_PER_DIAGONAL = 0.4; // Increased from 0.2 to 0.4 seconds between diagonals
  const TOTAL_DURATION = TOTAL_DIAGONALS * DELAY_PER_DIAGONAL + 2; // Increased from 1.5 to 2 seconds for individual animation

  useEffect(() => {
    if (hasBeenVisible) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasBeenVisible) {
          setShowInitialGlow(true);
          setHasBeenVisible(true);
          setTimeout(() => {
            setShowInitialGlow(false);
          }, TOTAL_DURATION * 1000); // Convert to milliseconds
        }
      },
      {
        threshold: 0.2
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [hasBeenVisible, TOTAL_DURATION]);

  const getDelayForPosition = (index: number) => {
    const row = Math.floor(index / COLS);
    const col = index % COLS;
    return (row + col) * DELAY_PER_DIAGONAL; // Delay based on diagonal position
  };

  return (
    <div ref={containerRef} className="mt-6 space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {skills.map((skill, index) => (
          <motion.button
            key={skill.name}
            className={`flex items-center space-x-2 p-2 rounded-lg transition-all duration-300 relative overflow-hidden ${
              selectedSkill === skill.name 
                ? 'bg-gray-700 ring-1 ring-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                : 'hover:bg-gray-800 hover:shadow-[0_0_10px_rgba(59,130,246,0.2)]'
            }`}
            onClick={() => onSkillSelect(selectedSkill === skill.name ? null : skill.name)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              transition: { delay: index * 0.1 }
            }}
          >
            {showInitialGlow && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-transparent via-blue-400/20 to-transparent"
                initial={{ x: "-200%", y: "-200%" }}
                animate={{ x: "200%", y: "200%" }}
                transition={{
                  duration: 2, // Increased from 1.5 to 2 seconds
                  delay: getDelayForPosition(index),
                  ease: "easeOut"
                }}
              />
            )}
            <div className={`w-3 h-3 rounded-full transition-colors ${
              selectedSkill === skill.name ? 'bg-blue-500' : 'bg-blue-500/70'
            }`} />
            <span className="text-sm text-gray-300">
              {skill.name} - {(() => {
                const level = skill.level;
                let levelKey = 'skills.levels.beginner';
                if (level >= 90) levelKey = 'skills.levels.master';
                else if (level >= 80) levelKey = 'skills.levels.expert';
                else if (level >= 60) levelKey = 'skills.levels.advanced';
                else if (level >= 40) levelKey = 'skills.levels.intermediate';
                return t(levelKey);
              })()}
            </span>
          </motion.button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {selectedSkillData && selectedSkillData.keywords && (
          <motion.div
            key="subskills"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-4 bg-gray-800 rounded-lg mt-4">
              <h4 className="text-sm font-medium text-gray-400 mb-3">
                {t('skills.relatedSkills')}
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedSkillData.keywords.map((keyword) => (
                  <motion.span
                    key={keyword}
                    className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {keyword}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 