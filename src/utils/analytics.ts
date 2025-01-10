import { Redis } from '@upstash/redis';
import { createHash } from 'crypto';

// Initialize Redis using environment variables
const redis = Redis.fromEnv();

// Verify Redis connection
const verifyRedisConnection = async () => {
  try {
    await redis.ping();
    console.log('Successfully connected to Upstash Redis');
  } catch (error) {
    console.error('Failed to connect to Redis:', error);
    throw error;
  }
};

// Run verification in development
if (process.env.NODE_ENV === 'development') {
  verifyRedisConnection();
}

interface ViewEvent {
  postId: string;
  timestamp: number;
  country: string;
  readingTime: number;
  scrollDepth: number;
}

// TTL constants (in seconds)
const THREE_MONTHS = 90 * 24 * 60 * 60; // Swiss privacy law recommendation
const RATE_LIMIT_WINDOW = 30 * 60; // 30 minutes in seconds

// Key generators
const getPostKey = (postId: string) => `blog:views:${postId}`;
const getRateLimitKey = (postId: string, hashedIp: string) => `ratelimit:${postId}:${hashedIp}`;

// Anonymize IP immediately
const anonymizeIp = (ip: string): string => {
  if (!ip || ip === 'unknown') return 'anonymous';
  // Hash the IP with SHA-256
  return createHash('sha256')
    .update(ip + process.env.IP_SALT || 'default-salt')
    .digest('hex');
};

export const trackPageView = async (postId: string, country: string = 'unknown', ip: string = 'unknown') => {
  try {
    const timestamp = Date.now();
    const viewKey = getPostKey(postId);
    const hashedIp = anonymizeIp(ip);
    const rateLimitKey = getRateLimitKey(postId, hashedIp);

    // Check rate limit by hashed IP
    const isRateLimited = await redis.get(rateLimitKey);
    if (isRateLimited) {
      return; // Skip if rate limited
    }

    // Set rate limit for this hashed IP
    await redis.set(rateLimitKey, 1, { ex: RATE_LIMIT_WINDOW });

    // Pipeline the operations for better performance
    const pipeline = redis.pipeline();
    
    // Get existing events
    const events: ViewEvent[] = await redis.get(viewKey) || [];
    
    // Add new event (without IP)
    const newEvent = {
      postId,
      country, // Only store country code
      timestamp,
      readingTime: 0,
      scrollDepth: 0,
    };
    events.push(newEvent);
    
    // Store with reduced TTL for privacy
    pipeline.set(viewKey, events, { ex: THREE_MONTHS });
    await pipeline.exec();
  } catch (error) {
    console.warn('Failed to track page view:', error);
  }
};

export const updateViewMetrics = async (postId: string, readingTime: number, scrollDepth: number) => {
  try {
    const key = getPostKey(postId);
    
    // Pipeline the operations
    const pipeline = redis.pipeline();
    
    // Get existing events
    const events: ViewEvent[] = await redis.get(key) || [];
    const lastEvent = events[events.length - 1];
    
    if (lastEvent) {
      lastEvent.readingTime = Math.max(lastEvent.readingTime, readingTime);
      lastEvent.scrollDepth = Math.max(lastEvent.scrollDepth, scrollDepth);
      
      // Update with reduced TTL
      pipeline.set(key, events, { ex: THREE_MONTHS });
      await pipeline.exec();
    }
  } catch (error) {
    console.warn('Failed to update view metrics:', error);
  }
};

export const getPostAnalytics = async (postId: string) => {
  try {
    const key = getPostKey(postId);
    const events: ViewEvent[] = await redis.get(key) || [];
    const countries = new Set(events.map(e => e.country));
    
    // Calculate metrics
    const totalViews = events.length;
    const uniqueCountries = countries.size;
    const avgReadingTime = totalViews ? 
      events.reduce((acc, e) => acc + e.readingTime, 0) / totalViews : 
      0;
    const avgScrollDepth = totalViews ? 
      events.reduce((acc, e) => acc + e.scrollDepth, 0) / totalViews : 
      0;

    // Calculate country breakdown
    const countryBreakdown = Array.from(countries).map(country => ({
      country,
      views: events.filter(e => e.country === country).length
    }));
    
    return {
      totalViews,
      uniqueCountries,
      avgReadingTime,
      avgScrollDepth,
      countryBreakdown
    };
  } catch (error) {
    console.warn('Failed to get post analytics:', error);
    return {
      totalViews: 0,
      uniqueCountries: 0,
      avgReadingTime: 0,
      avgScrollDepth: 0,
      countryBreakdown: []
    };
  }
};