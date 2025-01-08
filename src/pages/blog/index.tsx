import { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useState, useMemo } from 'react';
import { getBlogPosts, BlogPost } from '@/utils/blog';
import BlogSearch from '@/components/BlogSearch';

interface BlogProps {
  posts: BlogPost[];
  isDev: boolean;
}

interface TagState {
  tag: string;
  state: 'include' | 'exclude' | null;
}

export default function Blog({ posts = [], isDev }: BlogProps) {
  const { t } = useTranslation('common');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<TagState[]>([]);

  // Get unique tags from all posts, excluding DEV tag in production
  const availableTags = useMemo(() => {
    const tags = new Set<string>();
    if (posts) {
      posts.forEach(post => post.tags.forEach(tag => {
        if (tag === 'DEV' && !isDev) return;
        tags.add(tag);
      }));
    }
    return Array.from(tags).sort();
  }, [posts, isDev]);

  // Filter posts based on search term and selected tags
  const filteredPosts = useMemo(() => {
    if (!posts) return [];
    return posts.filter(post => {
      // Search term filter
      const searchContent = `${post.title} ${post.excerpt} ${post.tags.join(' ')}`.toLowerCase();
      const searchMatch = !searchTerm || searchContent.includes(searchTerm.toLowerCase());

      // Tags filter
      const tagsMatch = selectedTags.length === 0 || 
        selectedTags.every(({ tag, state }) => {
          if (state === 'include') return post.tags.includes(tag);
          if (state === 'exclude') return !post.tags.includes(tag);
          return true;
        });

      return searchMatch && tagsMatch;
    });
  }, [posts, searchTerm, selectedTags]);

  // Handle tag toggle
  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => {
      const existingTag = prev.find(t => t.tag === tag);
      if (!existingTag) {
        return [...prev, { tag, state: 'include' }];
      }
      if (existingTag.state === 'include') {
        return prev.map(t => t.tag === tag ? { tag, state: 'exclude' } : t);
      }
      return prev.filter(t => t.tag !== tag);
    });
  };

  return (
    <div className="min-h-screen pt-24 pb-12 relative">
      {/* Main content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <div className="flex justify-between items-start">
            <motion.h1 
              className="text-4xl font-bold text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {t('blog.title')}
            </motion.h1>
            
            {isDev && (
              <div className="relative">
                <BlogSearch
                  searchTerm={searchTerm}
                  onSearchChange={setSearchTerm}
                  selectedTags={selectedTags}
                  onTagToggle={handleTagToggle}
                  availableTags={availableTags}
                />
              </div>
            )}
          </div>

          {/* Search Panel */}
          <AnimatePresence mode="sync">
            {searchTerm && (
              <motion.div 
                className="overflow-hidden"
                initial={{ height: 0, opacity: 0 }}
                animate={{ 
                  height: "auto",
                  opacity: 1,
                  transition: {
                    height: {
                      duration: 0.3,
                      ease: "easeOut"
                    },
                    opacity: {
                      duration: 0.2,
                      delay: 0.1
                    }
                  }
                }}
                exit={{ 
                  height: 0,
                  opacity: 0,
                  transition: {
                    height: {
                      duration: 0.3,
                      ease: "easeIn"
                    },
                    opacity: {
                      duration: 0.2
                    }
                  }
                }}
              >
                <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden p-3">
                  <motion.div
                    initial={{ y: -20 }}
                    animate={{ y: 0 }}
                    exit={{ y: -20 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder={t('blog.searchPlaceholder') || 'Search posts...'}
                      className="w-full px-3 py-2 bg-gray-900 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                      autoFocus
                    />
                    
                    {/* Tags */}
                    {availableTags.length > 0 && (
                      <motion.div 
                        className="mt-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                      >
                        <div className="flex flex-wrap gap-2">
                          {availableTags.map((tag) => (
                            <motion.button
                              key={tag}
                              onClick={() => handleTagToggle(tag)}
                              className={`px-3 py-1 rounded-full text-sm transition-all ${
                                selectedTags.find(t => t.tag === tag)?.state === 'include'
                                  ? 'bg-blue-500 text-white'
                                  : selectedTags.find(t => t.tag === tag)?.state === 'exclude'
                                  ? 'bg-red-500 text-white'
                                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                              }`}
                              initial={{ scale: 0.8, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0.8, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              {tag}
                              {selectedTags.find(t => t.tag === tag)?.state === 'include' && (
                                <span className="ml-1 opacity-60">+</span>
                              )}
                              {selectedTags.find(t => t.tag === tag)?.state === 'exclude' && (
                                <span className="ml-1 opacity-60">-</span>
                              )}
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Posts */}
          <AnimatePresence mode="wait">
            {filteredPosts.length > 0 ? (
              <motion.div 
                className="space-y-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.2 }}
              >
                {filteredPosts.map((post) => (
                  <Link 
                    href={`/blog/${post.slug}`} 
                    key={post.slug}
                    className="block"
                  >
                    <motion.article
                      className="bg-gray-800 rounded-lg p-6 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all duration-300 group relative overflow-hidden"
                      whileHover={{ scale: 1.02 }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/5 transition-all duration-500"
                        initial={false}
                      />
                      <div className="relative z-10">
                        {post.isPinned && (
                          <div className="absolute top-2 right-2 group/pin">
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-yellow-300 text-xs rounded opacity-0 group-hover/pin:opacity-100 transition-opacity whitespace-nowrap">
                              {t('blog.pinned')}
                            </div>
                            <svg 
                              xmlns="http://www.w3.org/2000/svg" 
                              viewBox="0 0 24 24" 
                              fill="currentColor" 
                              className="w-7 h-7 text-yellow-300"
                            >
                              <path d="M12 2l2.4 7.2h7.6l-6 4.8 2.4 7.2-6-4.8-6 4.8 2.4-7.2-6-4.8h7.6z" />
                            </svg>
                          </div>
                        )}
                        <h2 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors mb-2">
                          {post.title}
                        </h2>
                        <div className="flex items-center space-x-4 text-sm text-gray-400 mb-4">
                          <time dateTime={post.date}>
                            {t('blog.date')} {post.formattedDate}
                          </time>
                          <span className="text-gray-400">•</span>
                          <span>{post.readTime}</span>
                          <div className="flex flex-wrap gap-2">
                            {post.tags.map((tag) => (
                              <span
                                key={tag}
                                className={`px-2 py-1 rounded-full text-xs ${
                                  tag === 'DEV' && isDev
                                    ? 'bg-yellow-500/20 text-yellow-300'
                                    : selectedTags.find(t => t.tag === tag)?.state === 'include'
                                    ? 'bg-blue-500/20 text-blue-300'
                                    : selectedTags.find(t => t.tag === tag)?.state === 'exclude'
                                    ? 'bg-red-500/20 text-red-300'
                                    : 'bg-gray-700 text-gray-300'
                                }`}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-300">{post.excerpt}</p>
                        <div className="mt-4">
                          <span className="text-blue-400 hover:text-blue-300 transition-colors">
                            {t('blog.readMore')} →
                          </span>
                        </div>
                      </div>
                    </motion.article>
                  </Link>
                ))}
              </motion.div>
            ) : (
              <motion.div
                className="text-center py-12 text-gray-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <p>{t('blog.noResults')}</p>
                {(searchTerm || selectedTags.length > 0) && (
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedTags([]);
                    }}
                    className="mt-4 text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    {t('blog.clearFilters')}
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale = 'en' }) => {
  const posts = getBlogPosts(locale) || [];
  const isDev = process.env.NODE_ENV === 'development';

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      posts,
      isDev,
    },
  };
}; 