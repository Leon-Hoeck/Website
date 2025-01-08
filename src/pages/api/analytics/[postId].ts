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
  // Return 404 if analytics are not configured
  if (!process.env.ANALYTICS_SECRET_KEY) {
    return res.status(404).end();
  }

  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(404).end();
  }

  // Return same response for unauthorized and invalid to prevent user enumeration
  if (!isAuthenticated(req)) {
    return res.status(404).end();
  }

  try {
    const { postId } = req.query;
    if (typeof postId !== 'string') {
      return res.status(404).end();
    }

    const analytics = await getPostAnalytics(postId);
    res.status(200).json(analytics);
  } catch (error) {
    // Don't expose error details in production
    return res.status(404).end();
  }
} 