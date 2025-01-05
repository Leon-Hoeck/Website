import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'next-i18next';

interface SkillsLegendProps {
  skills: {
    name: string;
    level: number;
    keywords: Array<{
      name: string;
      level: number;
    }>;
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
  const DELAY_PER_ITEM = 0.15; // Reduced from 0.4 to create more overlap
  const ANIMATION_DURATION = 1.5; // Duration for each individual animation
  const TOTAL_DURATION = TOTAL_DIAGONALS * DELAY_PER_ITEM + ANIMATION_DURATION;

  useEffect(() => {
    if (hasBeenVisible) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasBeenVisible) {
          setShowInitialGlow(true);
          setHasBeenVisible(true);
          setTimeout(() => {
            const glowElements = document.querySelectorAll('.skill-glow');
            glowElements.forEach(el => {
              (el as HTMLElement).style.opacity = '0';
            });
          }, TOTAL_DURATION * 1000);
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
    return (row + col) * DELAY_PER_ITEM; // Diagonal position delay
  };

  return (
    <div ref={containerRef} className="mt-6 space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {skills.map((skill, index) => (
          <motion.button
            key={skill.name}
            className={`flex flex-col items-start p-3 rounded-lg transition-all duration-300 relative overflow-hidden w-full ${
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
                className="absolute inset-0 bg-gradient-to-br from-transparent via-blue-400/20 to-transparent skill-glow"
                initial={{ x: "-200%", y: "-200%", opacity: 1 }}
                animate={{ x: "200%", y: "200%", opacity: 1 }}
                transition={{
                  duration: ANIMATION_DURATION,
                  delay: getDelayForPosition(index),
                  ease: "easeOut"
                }}
                style={{ pointerEvents: 'none' }}
              />
            )}
            <div className="flex items-center space-x-2 mb-1">
              <div className={`w-2.5 h-2.5 rounded-full transition-colors ${
                selectedSkill === skill.name ? 'bg-blue-500' : 'bg-blue-500/70'
              }`} />
              <span className="text-sm font-medium text-gray-200">
                {skill.name}
              </span>
            </div>
            <span className="text-xs text-gray-400 ml-4">
              {(() => {
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
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: "auto", marginTop: 16 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            transition={{ 
              duration: 0.3,
              ease: [0.4, 0, 0.2, 1],
              opacity: { duration: 0.2 }
            }}
            className="overflow-hidden"
          >
            <motion.div
              className="group bg-gray-800 rounded-lg relative overflow-hidden shadow-lg transition-all duration-300"
              initial={false}
              layout
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/5 transition-all duration-500"
                initial={false}
              />
              <div className="absolute inset-0 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] rounded-lg transition-all duration-300" />
              <div className="relative z-10 p-4">
                <h4 className="text-sm font-medium text-gray-400 mb-3">
                  {t('skills.relatedSkills')}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedSkillData.keywords.map((keyword) => (
                    <motion.span
                      key={keyword.name}
                      className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm relative"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {keyword.name}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 