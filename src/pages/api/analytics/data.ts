import { NextApiRequest, NextApiResponse } from 'next';
import { getBlogPosts } from '@/utils/blog';
import { getPostAnalytics } from '@/utils/analytics';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Check authentication
  const authHeader = req.headers.authorization;
  const token = authHeader?.replace('Bearer ', '');

  if (!process.env.ANALYTICS_SECRET_KEY || token !== process.env.ANALYTICS_SECRET_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const { locale = 'en' } = req.query;
    
    // Get posts for the current locale
    const posts = await getBlogPosts(locale as string);
    const postsWithAnalytics = await Promise.all(
      posts.map(async (post) => ({
        post,
        analytics: await getPostAnalytics(post.slug)
      }))
    );

    res.status(200).json({ posts: postsWithAnalytics });
  } catch (error) {
    console.error('Analytics error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
} 