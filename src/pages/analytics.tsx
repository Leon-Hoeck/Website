import { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { BlogPost } from '@/utils/blog';
import Link from 'next/link';

interface Analytics {
  totalViews: number;
  uniqueCountries: number;
  avgReadingTime: number;
  avgScrollDepth: number;
  countryBreakdown: Array<{
    country: string;
    views: number;
  }>;
}

interface AnalyticsData {
  site: Analytics;
  cv: Analytics;
  blog: Array<{
    postId: string;
    analytics: Analytics;
  }>;
}

export default function Analytics() {
  const { t } = useTranslation('common');
  const router = useRouter();
  const { locale = 'en', token } = router.query;
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const formattedToken = token?.toString().trim();
        if (!formattedToken) {
          throw new Error('No authentication token provided');
        }

        const headers: HeadersInit = {
          'Content-Type': 'application/json',
          'Authorization': formattedToken
        };

        const res = await fetch(`/api/analytics/data`, {
          headers,
          method: 'GET'
        });

        if (!res.ok) {
          throw new Error(await res.text() || 'Failed to fetch analytics data');
        }

        const data = await res.json();
        setData(data);
      } catch (err) {
        console.error('Failed to fetch analytics:', err);
        setError(err instanceof Error ? err.message : 'Failed to load analytics data');
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchData();
    } else {
      setError('Authentication token is required');
    }
  }, [token]);

  const renderAnalyticsCard = (title: string, analytics: Analytics) => (
    <div className="bg-gray-800 rounded-lg p-6">
      <h2 className="text-xl font-semibold text-white mb-4">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-700/50 rounded p-4">
          <div className="text-sm text-gray-400">Total Views</div>
          <div className="text-2xl font-bold text-white">{analytics.totalViews}</div>
        </div>
        
        <div className="bg-gray-700/50 rounded p-4">
          <div className="text-sm text-gray-400">Countries</div>
          <div className="text-2xl font-bold text-white">{analytics.uniqueCountries}</div>
        </div>
        
        <div className="bg-gray-700/50 rounded p-4">
          <div className="text-sm text-gray-400">Avg. Read Time</div>
          <div className="text-2xl font-bold text-white">
            {Math.round(analytics.avgReadingTime)}s
          </div>
        </div>
        
        <div className="bg-gray-700/50 rounded p-4">
          <div className="text-sm text-gray-400">Avg. Scroll Depth</div>
          <div className="text-2xl font-bold text-white">
            {Math.round(analytics.avgScrollDepth)}%
          </div>
        </div>
      </div>

      {analytics.countryBreakdown.length > 0 && (
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-400 mb-3">Country Breakdown</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {analytics.countryBreakdown
              .sort((a, b) => b.views - a.views)
              .map(({ country, views }) => (
                <div key={country} className="bg-gray-700/30 rounded p-2 text-sm">
                  <span className="text-gray-300">{country}</span>
                  <span className="float-right text-gray-400">{views}</span>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Site Analytics</h1>
          <div className="text-sm text-gray-400">
            Showing data for: <span className="text-blue-400">{locale}</span>
          </div>
        </div>
        
        <div className="space-y-8">
          {/* Homepage Analytics */}
          {data?.site && renderAnalyticsCard('Homepage', data.site)}

          {/* CV Analytics */}
          {data?.cv && renderAnalyticsCard('CV', data.cv)}

          {/* Blog Analytics */}
          {data?.blog && data.blog.length > 0 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-white">Blog Posts</h2>
              {data.blog.map(({ postId, analytics }) => (
                <div key={postId}>
                  {renderAnalyticsCard(postId, analytics)}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale = 'en' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}; 