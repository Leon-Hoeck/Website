import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface PageTransitionProps {
  children: ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: 1, 
        y: 0,
        transition: { 
          duration: 0.4,
          ease: [0.25, 0.1, 0.25, 1.0], // cubic-bezier easing
        }
      }}
      exit={{ 
        opacity: 0,
        y: 10,
        transition: {
          duration: 0.2,
        }
      }}
    >
      {children}
    </motion.div>
  );
} 