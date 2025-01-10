import { NextApiRequest, NextApiResponse } from 'next';
import { getPostAnalytics } from '../../../utils/analytics';
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
  // Return 501 if analytics are not configured
  if (!process.env.ANALYTICS_SECRET_KEY) {
    console.warn('Analytics not configured: ANALYTICS_SECRET_KEY missing');
    return res.status(501).json({ error: 'Analytics not configured' });
  }

  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Check authentication
  if (!isAuthenticated(req)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const { postId } = req.query;
    if (typeof postId !== 'string') {
      return res.status(400).json({ error: 'Invalid post ID' });
    }

    const analytics = await getPostAnalytics(postId);
    res.status(200).json(analytics);
  } catch (error) {
    console.error('Analytics error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
} 