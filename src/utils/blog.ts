import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { format } from 'date-fns';
import { de, fr, it } from 'date-fns/locale';
import { calculateReadTime, formatReadTime } from './readTime';

const BLOG_DIR = path.join(process.cwd(), 'src', 'content', 'blog');
const isDev = process.env.NODE_ENV === 'development';

// Hidden tags (won't be displayed in UI)
const HIDDEN_TAGS = {
  DEV: 'DEV',
  PIN: '_pin', // underscore prefix indicates hidden tag
} as const;

const locales = {
  en: undefined,
  de,
  fr,
  it,
};

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  formattedDate: string;
  excerpt: string;
  tags: string[];
  content: string;
  readTime: string;
  isDev: boolean;
  isPinned: boolean;
}

export interface AdjacentPosts {
  previous: BlogPost | null;
  next: BlogPost | null;
}

interface RawBlogPost {
  slug: string;
  title: string;
  date: string;
  formattedDate: string;
  excerpt: string;
  tags: string[];
  content: string;
  readTime: string;
  isDev: boolean;
  isPinned: boolean;
}

export function getBlogPosts(locale: string = 'en'): BlogPost[] {
  const postsDirectory = path.join(BLOG_DIR, locale);
  
  // Create directory if it doesn't exist
  if (!fs.existsSync(postsDirectory)) {
    fs.mkdirSync(postsDirectory, { recursive: true });
    return [];
  }

  try {
    const fileNames = fs.readdirSync(postsDirectory);

    const posts = fileNames
      .filter((fileName) => fileName.endsWith('.mdx'))
      .map((fileName): RawBlogPost | null => {
        const slug = fileName.replace(/\.mdx$/, '');
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);

        // Check if post has DEV or Pin tag
        const isDevPost = data.tags?.includes(HIDDEN_TAGS.DEV) ?? false;
        const isPinned = data.tags?.includes(HIDDEN_TAGS.PIN) ?? false;
        
        // Skip dev posts in production
        if (isDevPost && !isDev) {
          return null;
        }

        // Filter out hidden tags from visible tags
        const visibleTags = (data.tags || []).filter((tag: string) => {
          if (tag === HIDDEN_TAGS.PIN) return false;
          if (tag === HIDDEN_TAGS.DEV && !isDev) return false;
          return true;
        });

        const date = new Date(data.date);
        const formattedDate = format(date, 'PPP', {
          locale: locales[locale as keyof typeof locales],
        });

        const readTimeMinutes = calculateReadTime(content);
        const readTime = formatReadTime(readTimeMinutes, locale);

        // Add [DEV] prefix to title if it's a dev post
        const title = isDevPost ? `[DEV] ${data.title}` : data.title;

        return {
          slug,
          title,
          date: data.date,
          formattedDate,
          excerpt: data.excerpt,
          tags: visibleTags,
          content,
          readTime,
          isDev: isDevPost,
          isPinned,
        };
      })
      .filter((post): post is RawBlogPost => post !== null)
      .sort((a, b) => {
        // First, sort by pinned status
        if (a.isPinned && !b.isPinned) return -1;
        if (!a.isPinned && b.isPinned) return 1;
        
        // If both are pinned, sort by date (newest first)
        if (a.isPinned && b.isPinned) {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        }

        // Then sort by date (newest first)
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        if (dateA !== dateB) {
          return dateB - dateA;
        }

        // If dates are equal, put DEV posts first
        if (a.isDev && !b.isDev) return -1;
        if (!a.isDev && b.isDev) return 1;

        return 0;
      });

    return posts;
  } catch (error) {
    console.error(`Error reading blog posts for locale ${locale}:`, error);
    return [];
  }
}

export function getBlogPost(slug: string, locale: string = 'en'): BlogPost | null {
  try {
    const fullPath = path.join(BLOG_DIR, locale, `${slug}.mdx`);
    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    // Check if post has DEV or Pin tag
    const isDevPost = data.tags?.includes(HIDDEN_TAGS.DEV) ?? false;
    const isPinned = data.tags?.includes(HIDDEN_TAGS.PIN) ?? false;
    
    // Don't allow access to dev posts in production
    if (isDevPost && !isDev) {
      return null;
    }

    // Filter out hidden tags from visible tags
    const visibleTags = (data.tags || []).filter((tag: string) => {
      if (tag === HIDDEN_TAGS.PIN) return false;
      if (tag === HIDDEN_TAGS.DEV && !isDev) return false;
      return true;
    });

    const date = new Date(data.date);
    const formattedDate = format(date, 'PPP', {
      locale: locales[locale as keyof typeof locales],
    });

    const readTimeMinutes = calculateReadTime(content);
    const readTime = formatReadTime(readTimeMinutes, locale);

    // Add [DEV] prefix to title if it's a dev post
    const title = isDevPost ? `[DEV] ${data.title}` : data.title;

    return {
      slug,
      title,
      date: data.date,
      formattedDate,
      excerpt: data.excerpt,
      tags: visibleTags,
      content,
      readTime,
      isDev: isDevPost,
      isPinned,
    };
  } catch (error) {
    console.error(`Error reading blog post ${slug} for locale ${locale}:`, error);
    return null;
  }
}

export const getAdjacentPosts = (slug: string, locale: string) => {
  const posts = getBlogPosts(locale);
  
  // Sort posts by pinned first, then by date
  const sortedPosts = posts.sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  const currentIndex = sortedPosts.findIndex(post => post.slug === slug);
  
  return {
    previous: currentIndex > 0 ? sortedPosts[currentIndex - 1] : null,
    next: currentIndex < sortedPosts.length - 1 ? sortedPosts[currentIndex + 1] : null,
  };
};

export function getRelatedPosts(currentPost: BlogPost, locale: string = 'en', limit: number = 2): BlogPost[] {
  const posts = getBlogPosts(locale);
  
  // Calculate tag similarity scores for each post
  const scoredPosts = posts
    .filter(post => post.slug !== currentPost.slug) // Exclude current post
    .map(post => {
      // Count matching tags
      const matchingTags = post.tags.filter(tag => currentPost.tags.includes(tag));
      const score = matchingTags.length;
      
      return { post, score };
    })
    .filter(({ score }) => score > 0) // Only include posts with at least one matching tag
    .sort((a, b) => {
      // Sort by score first
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      // If scores are equal, sort by date (newer first)
      return new Date(b.post.date).getTime() - new Date(a.post.date).getTime();
    });

  return scoredPosts.slice(0, limit).map(({ post }) => post);
} 