import { useEffect } from 'react';
import { motion, useSpring } from 'framer-motion';

export default function ReadingProgress() {
  const scaleX = useSpring(0, {
    stiffness: 30,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const updateProgress = () => {
      const article = document.querySelector('article');
      if (!article) return;

      // Get all text nodes in the article
      const walker = document.createTreeWalker(
        article,
        NodeFilter.SHOW_TEXT,
        {
          acceptNode: (node) => {
            return node.textContent && node.textContent.trim().length > 0
              ? NodeFilter.FILTER_ACCEPT
              : NodeFilter.FILTER_REJECT;
          },
        }
      );

      const textNodes = [];
      let node;
      while ((node = walker.nextNode())) {
        textNodes.push(node);
      }

      // Get the last two text nodes
      const lastNodes = textNodes.slice(-2);
      if (lastNodes.length === 0) return;

      const lastNode = lastNodes[lastNodes.length - 1];
      const lastElement = lastNode.parentElement;
      if (!lastElement) return;

      const lastNodeRect = lastElement.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const middleScreen = windowHeight / 2;
      
      // Calculate progress based on the last text node position
      const distanceToMiddle = lastNodeRect.top - middleScreen;
      const articleRect = article.getBoundingClientRect();
      const totalHeight = articleRect.height - windowHeight;
      
      // Start increasing progress in the last 20% of the article
      const startPoint = totalHeight * 0.8;
      const currentScroll = Math.max(0, -articleRect.top);
      let progress = 0;

      if (currentScroll < startPoint) {
        progress = currentScroll / startPoint * 0.8; // First 80% of progress
      } else {
        const remainingDistance = totalHeight - startPoint;
        const remainingScroll = currentScroll - startPoint;
        progress = 0.8 + (remainingScroll / remainingDistance * 0.2); // Last 20% of progress
      }

      // Apply easing to make progressfaster at start and end
      const easeProgress = (p: number) => {
        // If in first 10% or last 10%, move faster
        if (p < 0.1) {
          return p * 1.5; // 50% faster at start
        } else if (p > 0.9) {
          return 0.9 + ((p - 0.9) * 1.5); // 50% faster at end
        }
        return p;
      };

      const easedProgress = easeProgress(progress);
      scaleX.set(Math.min(1, Math.max(0, easedProgress)));
    };

    window.addEventListener('scroll', updateProgress);
    window.addEventListener('resize', updateProgress);
    
    // Initial calculation
    setTimeout(updateProgress, 100);

    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, [scaleX]);

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-50">
      <motion.div 
        className="h-full bg-blue-500 origin-left"
        style={{ scaleX }}
        initial={{ scaleX: 0 }}
      />
    </div>
  );
} 