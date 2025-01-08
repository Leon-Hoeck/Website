import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Get country from Vercel's geo headers
  const country = req.headers['x-vercel-ip-country'] || 'unknown';
  
  res.status(200).json({ country });
} 