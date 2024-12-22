import React, { useEffect, useState, memo } from 'react';
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

const getSubskillLevel = (keyword: string, parentSkillLevel: number): number => {
  const hash = keyword.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const variance = ((hash % 30) - 15);
  const baseLevel = Math.max(30, parentSkillLevel - 20);
  return Math.min(Math.round(baseLevel + variance), 100);
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

const SkillsChart = memo(({ skills, onSkillSelect, selectedSkill }: SkillsChartProps) => {
  const [mounted, setMounted] = useState(false);
  const [fontSize, setFontSize] = useState(14);
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [startAnimation, setStartAnimation] = useState(false);

  useEffect(() => {
    setMounted(true);
    const updateFontSize = () => {
      setFontSize(window.innerWidth < 768 ? 12 : 14);
    };
    updateFontSize();
    window.addEventListener('resize', updateFontSize);
    return () => window.removeEventListener('resize', updateFontSize);
  }, []);

  useEffect(() => {
    if (mounted) {
      setTimeout(() => setStartAnimation(true), 100);
    }
  }, [mounted]);

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
    setStartAnimation(false);
    onSkillSelect?.(skillName);
    setTimeout(() => {
      setStartAnimation(true);
      setIsTransitioning(false);
    }, 100);
  };

  const data = {
    labels: displaySkills.map(skill => skill.name),
    datasets: [
      {
        label: 'Skill Level',
        data: displaySkills.map(skill => startAnimation ? skill.level : 0),
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 2,
        pointBackgroundColor: displaySkills.map((_, index) => 
          hoveredPoint === index ? '#fff' : 'rgba(59, 130, 246, 1)'
        ),
        pointBorderColor: displaySkills.map((_, index) => 
          hoveredPoint === index ? 'rgba(59, 130, 246, 1)' : '#fff'
        ),
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(59, 130, 246, 1)',
        pointHoverRadius: 8,
        pointRadius: 4,
        tension: 0.15,
      },
    ],
  };

  const options: ChartOptions<'radar'> = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 800,
      easing: 'easeInOutQuart',
    },
    scales: {
      r: {
        min: 0,
        max: 100,
        beginAtZero: true,
        animate: true,
        animation: {
          duration: 800,
          easing: 'easeOutQuart',
        },
        angleLines: {
          color: 'rgba(255, 255, 255, 0.05)',
          lineWidth: 1,
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.05)',
          circular: true,
          lineWidth: 1,
        },
        pointLabels: {
          color: (context) => {
            const index = context.index;
            return hoveredPoint === index ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 0.7)';
          },
          font: {
            size: fontSize,
            weight: 'bold',
            family: 'system-ui',
          },
          padding: 45,
        },
        ticks: {
          display: false,
          stepSize: 20,
          backdropPadding: 15,
        },
      },
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
            if (selectedSkill) {
              return `Proficiency: ${value}% of ${selectedSkill}`;
            }
            return `Proficiency: ${value}%`;
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
        }
      } else if (selectedSkill) {
        handleSkillSelect(null);
      }
    },
  };

  if (!mounted) {
    return (
      <div className="w-full h-[400px] md:h-[600px] max-w-4xl mx-auto p-4 bg-gray-800/50 rounded-lg animate-pulse" />
    );
  }

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedSkill || 'main'}
          className="w-full h-[400px] md:h-[600px] max-w-4xl mx-auto p-8 relative"
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
});

export default SkillsChart; 