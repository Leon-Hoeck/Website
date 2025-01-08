import React, { useEffect, useState } from 'react';
import { getPostAnalytics } from '@/utils/analytics';
import { useTranslation } from 'next-i18next';

interface Analytics {
  totalViews: number;
  uniqueViews: number;
  avgReadingTime: number;
  avgScrollDepth: number;
}

interface BlogAnalyticsProps {
  postId: string;
}

export default function BlogAnalytics({ postId }: BlogAnalyticsProps) {
  const { t } = useTranslation('common');
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const data = await getPostAnalytics(postId);
        setAnalytics(data);
      } catch (error) {
        console.warn('Failed to fetch analytics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [postId]);

  if (loading) {
    return (
      <div className="animate-pulse bg-gray-800/50 rounded-lg p-4">
        <div className="h-4 w-24 bg-gray-700 rounded mb-2"></div>
        <div className="space-y-2">
          <div className="h-3 w-16 bg-gray-700 rounded"></div>
          <div className="h-3 w-20 bg-gray-700 rounded"></div>
          <div className="h-3 w-24 bg-gray-700 rounded"></div>
        </div>
      </div>
    );
  }

  if (!analytics) return null;

  return (
    <div className="bg-gray-800 rounded-lg p-4 text-sm">
      <h3 className="text-white font-medium mb-2">{t('blog.analytics.title')}</h3>
      <div className="space-y-1 text-gray-300">
        <p>
          {t('blog.analytics.views')}: {analytics.totalViews} ({analytics.uniqueViews} {t('blog.analytics.unique')})
        </p>
        <p>
          {t('blog.analytics.avgReadTime')}: {Math.round(analytics.avgReadingTime)}s
        </p>
        <p>
          {t('blog.analytics.avgScrollDepth')}: {Math.round(analytics.avgScrollDepth)}%
        </p>
      </div>
    </div>
  );
} 