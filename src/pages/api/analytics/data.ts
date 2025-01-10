import { NextApiRequest, NextApiResponse } from 'next';
import { getBlogPosts } from '@/utils/blog';
import { getPostAnalytics } from '@/utils/analytics';
import { timingSafeEqual } from 'crypto';

// Secure authentication check
const isAuthenticated = (req: NextApiRequest): boolean => {
  if (!process.env.ANALYTICS_SECRET_KEY) {
    console.warn('Analytics secret key is missing');
    return false;
  }
  
  try {
    const token = req.headers.authorization;
    if (!token) {
      console.warn('No token provided in Authorization header');
      return false;
    }
    
    // Debug log (will be removed in production)
    console.log('Token comparison:', {
      received: token,
      expected: process.env.ANALYTICS_SECRET_KEY,
      receivedLength: token.length,
      expectedLength: process.env.ANALYTICS_SECRET_KEY.length,
      match: token === process.env.ANALYTICS_SECRET_KEY
    });
    
    return token === process.env.ANALYTICS_SECRET_KEY;
    
  } catch (error) {
    console.error('Authentication error:', error);
    return false;
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('Incoming request:', {
    method: req.method,
    query: req.query,
    headers: req.headers
  });
  
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Return 501 if analytics are not configured
  if (!process.env.ANALYTICS_SECRET_KEY) {
    console.warn('Analytics not configured: ANALYTICS_SECRET_KEY missing');
    return res.status(501).json({ error: 'Analytics not configured' });
  }

  // Check authentication
  if (!isAuthenticated(req)) {
    console.warn('Authentication failed for analytics data request');
    return res.status(401).json({ error: 'Unauthorized - Invalid token' });
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