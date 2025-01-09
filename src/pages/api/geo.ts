import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const country = req.headers['x-vercel-ip-country'] || 'unknown';
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
  
  // If IP is a comma-separated list, take the first one (original client IP)
  const clientIp = typeof ip === 'string' ? ip.split(',')[0].trim() : 'unknown';
  
  res.status(200).json({ country, ip: clientIp });
} 