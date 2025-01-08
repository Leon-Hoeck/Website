import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BlogPost } from '@/utils/blog';
import { useTranslation } from 'next-i18next';

interface BlogNavigationProps {
  previous: BlogPost | null;
  next: BlogPost | null;
}

export default function BlogNavigation({ previous, next }: BlogNavigationProps) {
  const { t } = useTranslation('common');

  return (
    <nav className="mt-16 border-t border-gray-700 pt-8">
      <div className="grid grid-cols-2 gap-8">
        <div>
          {previous && (
            <Link href={`/blog/${previous.slug}`} className="group block">
              <motion.div
                className="flex flex-col space-y-2"
                whileHover={{ x: -4 }}
                transition={{ duration: 0.2 }}
              >
                <span className="text-sm text-gray-400">← {t('blog.previous')}</span>
                <span className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
                  {previous.title}
                </span>
              </motion.div>
            </Link>
          )}
        </div>

        <div className="text-right">
          {next && (
            <Link href={`/blog/${next.slug}`} className="group block">
              <motion.div
                className="flex flex-col space-y-2 items-end"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                <span className="text-sm text-gray-400">{t('blog.next')} →</span>
                <span className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
                  {next.title}
                </span>
              </motion.div>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
} 