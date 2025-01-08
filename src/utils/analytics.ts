import { kv } from '@vercel/kv';

interface ViewEvent {
  postId: string;
  timestamp: number;
  country: string;
  readingTime: number;
  scrollDepth: number;
}

// TTL constants (in seconds)
const ONE_YEAR = 365 * 24 * 60 * 60;

// Generate a key for storing post events
const getPostKey = (postId: string) => `blog:views:${postId}`;

export const trackPageView = async (postId: string, country: string = 'unknown') => {
  try {
    const key = getPostKey(postId);
    const timestamp = Date.now();
    
    // Get existing events for this post
    const events: ViewEvent[] = await kv.get(key) || [];
    
    // Add new event
    const newEvent = {
      postId,
      country,
      timestamp,
      readingTime: 0,
      scrollDepth: 0,
    };
    events.push(newEvent);
    
    // Store with TTL
    await kv.set(key, events, { ex: ONE_YEAR });
  } catch (error) {
    console.warn('Failed to track page view:', error);
  }
};

export const updateViewMetrics = async (postId: string, readingTime: number, scrollDepth: number) => {
  try {
    const key = getPostKey(postId);
    
    // Get existing events
    const events: ViewEvent[] = await kv.get(key) || [];
    const lastEvent = events[events.length - 1];
    
    if (lastEvent) {
      lastEvent.readingTime = Math.max(lastEvent.readingTime, readingTime);
      lastEvent.scrollDepth = Math.max(lastEvent.scrollDepth, scrollDepth);
      
      // Update with TTL
      await kv.set(key, events, { ex: ONE_YEAR });
    }
  } catch (error) {
    console.warn('Failed to update view metrics:', error);
  }
};

export const getPostAnalytics = async (postId: string) => {
  try {
    const key = getPostKey(postId);
    const events: ViewEvent[] = await kv.get(key) || [];
    const countries = new Set(events.map(e => e.country));
    
    return {
      totalViews: events.length,
      uniqueCountries: countries.size,
      avgReadingTime: events.length ? 
        events.reduce((acc, e) => acc + e.readingTime, 0) / events.length : 
        0,
      avgScrollDepth: events.length ? 
        events.reduce((acc, e) => acc + e.scrollDepth, 0) / events.length : 
        0,
      countryBreakdown: Array.from(countries).map(country => ({
        country,
        views: events.filter(e => e.country === country).length
      }))
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