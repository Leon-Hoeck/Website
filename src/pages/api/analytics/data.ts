import { NextApiRequest, NextApiResponse } from 'next';
import { getBlogPosts } from '@/utils/blog';
import { getPostAnalytics } from '@/utils/analytics';
import { timingSafeEqual } from 'crypto';

// Secure authentication check
const isAuthenticated = (req: NextApiRequest): boolean => {
  if (!process.env.ANALYTICS_SECRET_KEY) {
    return false;
  }
  
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) return false;
    
    // Use constant-time comparison to prevent timing attacks
    const tokenBuffer = Buffer.from(token);
    const secretBuffer = Buffer.from(process.env.ANALYTICS_SECRET_KEY);
    
    return tokenBuffer.length === secretBuffer.length && 
           timingSafeEqual(tokenBuffer, secretBuffer);
  } catch {
    return false;
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Return 404 if analytics are not configured
  if (!process.env.ANALYTICS_SECRET_KEY) {
    console.warn('Analytics not configured: ANALYTICS_SECRET_KEY missing');
    return res.status(501).json({ error: 'Analytics not configured' });
  }

  // Check authentication
  if (!isAuthenticated(req)) {
    console.warn('Authentication failed for analytics data request');
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