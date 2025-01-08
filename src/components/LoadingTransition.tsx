import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingTransition() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [currentPath, setCurrentPath] = useState(router.asPath);

  useEffect(() => {
    const handleStart = (url: string) => {
      if (url !== currentPath) {
        setIsLoading(true);
      }
    };

    const handleComplete = (url: string) => {
      setCurrentPath(url);
      setIsLoading(false);
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router, currentPath]);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
          animate={{ 
            opacity: 1, 
            backdropFilter: 'blur(8px)',
            transition: { duration: 0.3 }
          }}
          exit={{ 
            opacity: 0,
            backdropFilter: 'blur(0px)',
            transition: { duration: 0.5, ease: 'easeOut' }
          }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/70"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ 
              scale: 1, 
              opacity: 1,
              transition: { delay: 0.1, duration: 0.3 }
            }}
            exit={{ 
              scale: 0.8, 
              opacity: 0,
              transition: { duration: 0.4, ease: 'easeOut' }
            }}
            className="flex flex-col items-center space-y-4"
          >
            <div className="h-12 w-12 rounded-full border-4 border-t-blue-400 border-r-transparent border-b-blue-400 border-l-transparent animate-spin" />
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: 1,
                transition: { delay: 0.2, duration: 0.3 }
              }}
              exit={{ 
                opacity: 0,
                transition: { duration: 0.3 }
              }}
              className="text-white text-lg font-medium"
            >
              Loading...
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 