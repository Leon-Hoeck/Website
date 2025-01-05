import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  ChartEvent,
  TooltipItem,
  ChartOptions
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'next-i18next';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

interface SkillsChartProps {
  skills: {
    name: string;
    level: number;
    keywords?: string[];
  }[];
  onSkillSelect?: (skillName: string | null) => void;
  selectedSkill?: string | null;
}

const getSkillLevelText = (level: number, t: any): string => {
  // Debug logging
  console.log('Translation test:', {
    master: t('skills.levels.master'),
    expert: t('skills.levels.expert'),
    advanced: t('skills.levels.advanced'),
    intermediate: t('skills.levels.intermediate'),
    beginner: t('skills.levels.beginner')
  });
  
  if (level >= 90) return t('skills.levels.master');
  if (level >= 80) return t('skills.levels.expert');
  if (level >= 60) return t('skills.levels.advanced');
  if (level >= 40) return t('skills.levels.intermediate');
  return t('skills.levels.beginner');
};

const getSubskillLevel = (keyword: string, parentSkillLevel: number): number => {
  // Create a deterministic but varied level based on the keyword and parent skill
  const hash = keyword.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  // Base the subskill level range on the parent skill level
  const minLevel = Math.max(20, parentSkillLevel - 30);
  const maxLevel = Math.min(100, parentSkillLevel + 10);
  const range = maxLevel - minLevel;
  
  // Use the hash to generate a level within the appropriate range
  const normalizedHash = (hash % 100) / 100; // Convert hash to a value between 0 and 1
  const level = minLevel + (normalizedHash * range);
  
  return Math.round(level);
};

const transitionVariants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  },
  exit: { 
    opacity: 0, 
    scale: 0.95,
    transition: { 
      duration: 0.2,
      ease: "easeIn"
    }
  }
};

export default function SkillsChart({ skills, onSkillSelect, selectedSkill }: SkillsChartProps) {
  const { t } = useTranslation('common');
  const [mounted, setMounted] = useState(false);
  const [fontSize, setFontSize] = useState(14);
  const [padding, setPadding] = useState(25);
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Debug logging for translation initialization
    console.log('Translation function test:', {
      isFunction: typeof t === 'function',
      sample: t('skills.levels.expert')
    });
    
    const updateResponsiveValues = () => {
      // Adjust font size and padding based on screen width
      if (window.innerWidth < 380) {
        setFontSize(10);
        setPadding(12);
      } else if (window.innerWidth < 640) {
        setFontSize(11);
        setPadding(15);
      } else if (window.innerWidth < 768) {
        setFontSize(12);
        setPadding(20);
      } else {
        setFontSize(14);
        setPadding(25);
      }
    };
    updateResponsiveValues();
    window.addEventListener('resize', updateResponsiveValues);
    return () => window.removeEventListener('resize', updateResponsiveValues);
  }, [t]);

  const selectedSkillData = selectedSkill ? skills.find(s => s.name === selectedSkill) : null;
  const displaySkills = selectedSkillData?.keywords 
    ? selectedSkillData.keywords.map(keyword => ({
        name: keyword,
        level: getSubskillLevel(keyword, selectedSkillData.level),
        isSubskill: true
      }))
    : skills.map(skill => ({ ...skill, isSubskill: false }));

  const handleSkillSelect = (skillName: string | null) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    onSkillSelect?.(skillName);
    setTimeout(() => setIsTransitioning(false), 1000);
  };

  const data = {
    labels: displaySkills.map(skill => skill.name),
    datasets: [
      {
        label: 'Skill Level',
        data: displaySkills.map(skill => skill.level),
        backgroundColor: 'rgba(59, 130, 246, 0.15)',
        borderColor: 'rgba(59, 130, 246, 0.8)',
        borderWidth: 1.5,
        pointBackgroundColor: 'rgba(59, 130, 246, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(59, 130, 246, 1)',
        pointHoverRadius: 8,
        pointRadius: 4,
        pointBorderWidth: 1.5,
        tension: 0,
        fill: true,
      },
    ],
  };

  const options: ChartOptions<'radar'> = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 800,
      easing: 'easeOutQuart'
    },
    scales: {
      r: {
        min: 0,
        max: 100,
        beginAtZero: true,
        angleLines: {
          color: 'rgba(255, 255, 255, 0.1)',
          lineWidth: 1,
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
          circular: true,
          lineWidth: 1,
        },
        pointLabels: {
          color: (context) => {
            return hoveredPoint === context.index ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 0.7)';
          },
          font: {
            size: fontSize,
            weight: '500',
            family: 'system-ui',
          },
          padding: padding + 5,
        },
        ticks: {
          display: true,
          color: 'rgba(255, 255, 255, 0.4)',
          backdropColor: 'transparent',
          font: {
            size: 10,
          },
          count: 5,
          stepSize: 20,
        },
      },
    },
    elements: {
      line: {
        tension: 0,
        borderWidth: 1.5,
      },
      point: {
        hitRadius: 8,
        hoverRadius: 8,
        radius: 4,
        borderWidth: 1.5,
      }
    },
    plugins: {
      tooltip: {
        enabled: true,
        backgroundColor: 'rgba(17, 24, 39, 0.95)',
        titleColor: '#fff',
        bodyColor: '#fff',
        padding: 12,
        displayColors: false,
        callbacks: {
          title: (context: TooltipItem<'radar'>[]) => context[0].label,
          label: (context: TooltipItem<'radar'>) => {
            const value = Math.round(context.raw as number);
            let levelKey = 'skills.levels.beginner';
            if (value >= 90) levelKey = 'skills.levels.master';
            else if (value >= 80) levelKey = 'skills.levels.expert';
            else if (value >= 60) levelKey = 'skills.levels.advanced';
            else if (value >= 40) levelKey = 'skills.levels.intermediate';
            
            const levelText = t(levelKey);
            if (selectedSkill) {
              return `${levelText} (${value}% of ${selectedSkill})`;
            }
            return `${levelText} (${value}%)`;
          },
        },
      },
      legend: {
        display: false,
      },
    },
    onHover: (event: ChartEvent, elements: any[]) => {
      if (isTransitioning) return;
      setHoveredPoint(elements.length > 0 ? elements[0].index : null);
    },
    onClick: (event: ChartEvent, elements: any[]) => {
      if (isTransitioning) return;
      
      if (elements && elements.length > 0) {
        const clickedSkill = displaySkills[elements[0].index].name;
        if (!selectedSkill) {
          const mainSkill = skills.find(s => s.name === clickedSkill);
          if (mainSkill?.keywords) {
            handleSkillSelect(clickedSkill);
          }
        } else if (selectedSkill) {
          handleSkillSelect(null);
        }
      }
    },
  };

  if (!mounted) {
    return (
      <div className="w-full h-[300px] sm:h-[400px] md:h-[600px] max-w-4xl mx-auto p-4 bg-gray-800/50 rounded-lg animate-pulse" />
    );
  }

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {selectedSkill && (
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            onClick={() => !isTransitioning && handleSkillSelect(null)}
            className="absolute top-2 sm:top-4 left-2 sm:left-6 z-10 px-3 sm:px-6 py-2 sm:py-3 text-sm sm:text-base text-gray-300 bg-gray-800/90 rounded-lg 
              hover:bg-gray-700 transition-colors flex items-center space-x-2 sm:space-x-3 backdrop-blur-sm shadow-lg"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="font-medium">Back to Overview</span>
          </motion.button>
        )}
      </AnimatePresence>
      
      <AnimatePresence mode="wait">
        <motion.div 
          key={selectedSkill || 'main'}
          className="w-full h-[300px] sm:h-[400px] md:h-[600px] max-w-4xl mx-auto p-2 sm:p-4 relative"
          variants={transitionVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <div className="relative h-full">
            <div className="absolute inset-0 bg-gradient-radial from-blue-500/5 via-transparent to-transparent opacity-50" />
            <Radar data={data} options={options} />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}