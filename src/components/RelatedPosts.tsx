import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BlogPost } from '@/utils/blog';
import { useTranslation } from 'next-i18next';

interface RelatedPostsProps {
  currentPost: BlogPost;
  relatedPosts: BlogPost[];
}

export default function RelatedPosts({ currentPost, relatedPosts }: RelatedPostsProps) {
  const { t } = useTranslation('common');

  if (relatedPosts.length === 0) return null;

  return (
    <section className="mt-16">
      <h2 className="text-2xl font-bold text-white mb-8">{t('blog.relatedPosts')}</h2>
      <div className="grid gap-8 sm:grid-cols-2">
        {relatedPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="relative block p-6 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
          >
            {post.isPinned && (
              <div className="absolute top-4 right-4 group/pin">
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-yellow-300 text-xs rounded opacity-0 group-hover/pin:opacity-100 transition-opacity whitespace-nowrap">
                  {t('blog.pinned')}
                </div>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="currentColor" 
                  className="w-5 h-5 text-yellow-300"
                >
                  <path d="M12 2l2.4 7.2h7.6l-6 4.8 2.4 7.2-6-4.8-6 4.8 2.4-7.2-6-4.8h7.6z" />
                </svg>
              </div>
            )}
            <h3 className="text-lg font-semibold text-white mb-2 pr-8">{post.title}</h3>
            <p className="text-gray-400 text-sm mb-4">{post.excerpt}</p>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className={`px-2 py-1 rounded-full text-xs ${
                    tag === 'DEV' 
                      ? 'bg-yellow-500/20 text-yellow-300'
                      : 'bg-gray-700 text-gray-300'
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
} 