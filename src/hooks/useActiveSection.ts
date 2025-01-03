import { useState, useEffect } from 'react';

export function useActiveSection(sections: string[], threshold = 0.5) {
  const [activeSection, setActiveSection] = useState(sections[0]);

  useEffect(() => {
    const observers = sections.map(section => {
      const element = document.getElementById(section);
      if (!element) return null;

      const observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              setActiveSection(section);
            }
          });
        },
        { threshold }
      );

      observer.observe(element);
      return observer;
    });

    return () => {
      observers.forEach(observer => observer?.disconnect());
    };
  }, [sections, threshold]);

  return activeSection;
} 