import { GetStaticProps, GetStaticPaths } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { getBlogPost, getBlogPosts, getAdjacentPosts, getRelatedPosts, BlogPost } from '@/utils/blog';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import Image from 'next/image';
import remarkGfm from 'remark-gfm';
import rehypePrism from '@mapbox/rehype-prism';
import { useEffect, useRef } from 'react';
import BlogImage from '@/components/BlogImage';
import CodeBlock from '@/components/CodeBlock';
import Blockquote from '@/components/Blockquote';
import BlogNavigation from '@/components/BlogNavigation';
import RelatedPosts from '@/components/RelatedPosts';
import ReadingProgress from '@/components/ReadingProgress';
import MathDisplay from '@/components/Math';
import { trackPageView, updateViewMetrics } from '@/utils/analytics';
import 'katex/dist/katex.min.css';
import { useRouter } from 'next/router';

interface BlogPostPageProps {
  post: BlogPost;
  mdxSource: any;
  previousPost: BlogPost | null;
  nextPost: BlogPost | null;
  relatedPosts: BlogPost[];
  isTranslated: boolean;
}

const components = {
  Image,
  BlogImage,
  pre: CodeBlock,
  blockquote: Blockquote,
  Math: MathDisplay,
  h1: (props: any) => {
    const id = props.children.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    return <h1 id={id} {...props} />;
  },
  h2: (props: any) => {
    const id = props.children.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    return <h2 id={id} {...props} />;
  },
  h3: (props: any) => {
    const id = props.children.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    return <h3 id={id} {...props} />;
  },
  h4: (props: any) => {
    const id = props.children.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    return <h4 id={id} {...props} />;
  },
  h5: (props: any) => {
    const id = props.children.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    return <h5 id={id} {...props} />;
  },
  h6: (props: any) => {
    const id = props.children.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    return <h6 id={id} {...props} />;
  },
};

export default function BlogPostPage({ post, mdxSource, previousPost, nextPost, relatedPosts, isTranslated }: BlogPostPageProps) {
  const { t } = useTranslation('common');
  const { locale } = useRouter();
  const startTime = useRef(Date.now());
  const maxScrollDepth = useRef(0);

  useEffect(() => {
    if (!post) return;

    // Track page view with country information only
    const trackWithCountry = async () => {
      try {
        const res = await fetch('/api/geo');
        const data = await res.json();
        await trackPageView(post.slug, data.country || 'unknown', 'anonymous');
      } catch (error) {
        await trackPageView(post.slug, 'unknown', 'anonymous');
      }
    };
    
    trackWithCountry();

    // Track scroll depth
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollDepth = (window.scrollY / scrollHeight) * 100;
      maxScrollDepth.current = Math.max(maxScrollDepth.current, scrollDepth);
    };

    // Update metrics on unmount
    const updateMetrics = () => {
      const readingTime = (Date.now() - startTime.current) / 1000; // in seconds
      updateViewMetrics(post.slug, readingTime, maxScrollDepth.current);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('beforeunload', updateMetrics);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('beforeunload', updateMetrics);
      updateMetrics();
    };
  }, [post]);

  if (!post) {
    return (
      <div className="min-h-screen pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white mb-8">
            Post not found
          </h1>
        </div>
      </div>
    );
  }

  return (
    <>
      <ReadingProgress />
      <div className="min-h-screen pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Link
              href="/blog"
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              ← Back to Blog
            </Link>
          </div>

          {!isTranslated && locale !== 'en' && (
            <div className="mb-8 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
              <p className="text-yellow-300 text-sm">
                {t('blog.translationNotice')}
              </p>
            </div>
          )}

          <motion.article
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative prose prose-invert prose-blue prose-lg max-w-none prose-headings:font-bold prose-h1:mt-16 prose-h2:mt-16 prose-p:my-6 prose-ul:my-6 min-w-0 overflow-hidden"
          >
            {post.isPinned && (
              <div className="absolute top-0 right-0 group/pin">
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
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-white mb-4">
                {post.title}
              </h1>
              <div className="flex items-center space-x-4 text-sm text-gray-400 mb-4">
                <time dateTime={post.date}>{post.formattedDate}</time>
                <span className="text-gray-400">•</span>
                <span>{post.readTime}</span>
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
              </div>
            </div>

            <MDXRemote {...mdxSource} components={components} />
            <hr className="my-8 border-t border-gray-700" />
          </motion.article>

          <RelatedPosts currentPost={post} relatedPosts={relatedPosts} />
          <BlogNavigation previous={previousPost} next={nextPost} />
        </div>
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async ({ locales = ['en'] }) => {
  // Only generate paths from English posts since URLs will be language-agnostic
  const posts = getBlogPosts('en');
  const paths = posts.flatMap((post) => 
    locales.map((locale) => ({
      params: { slug: post.slug },
      locale,
    }))
  );

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params, locale = 'en' }) => {
  const slug = params?.slug as string;
  
  // First try to get the post in the current locale
  let post = getBlogPost(slug, locale);
  
  // If post doesn't exist in current locale, fall back to English version
  if (!post && locale !== 'en') {
    post = getBlogPost(slug, 'en');
  }

  if (!post) {
    return {
      notFound: true,
    };
  }

  const { previous, next } = getAdjacentPosts(slug, locale);
  const relatedPosts = getRelatedPosts(post, locale);

  const mdxSource = await serialize(post.content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypePrism],
    },
  });

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      post,
      mdxSource,
      previousPost: previous,
      nextPost: next,
      relatedPosts,
      isTranslated: !!getBlogPost(slug, locale), // Add flag to indicate if post is translated
    },
  };
};