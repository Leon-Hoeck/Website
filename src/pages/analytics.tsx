import { GetServerSideProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { getBlogPosts, BlogPost } from '@/utils/blog';
import { getPostAnalytics } from '@/utils/analytics';

interface CountryBreakdown {
  country: string;
  views: number;
}

interface Analytics {
  totalViews: number;
  uniqueCountries: number;
  avgReadingTime: number;
  avgScrollDepth: number;
  countryBreakdown: CountryBreakdown[];
}

interface PageProps {
  posts: Array<{
    post: BlogPost;
    analytics: Analytics;
  }>;
}

export default function Analytics({ posts }: PageProps) {
  const { t } = useTranslation('common');

  return (
    <div className="min-h-screen bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-white mb-8">Blog Analytics</h1>
        
        <div className="grid gap-6">
          {posts.map(({ post, analytics }) => (
            <div key={post.slug} className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-2">{post.title}</h2>
              <div className="text-sm text-gray-400 mb-4">
                {post.formattedDate} • {post.readTime}
              </div>
              
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
          ))}
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, locale = 'en' }) => {
  // Check for authentication header
  const authHeader = req.headers.authorization;
  const token = authHeader?.replace('Bearer ', '');
  
  if (!process.env.ANALYTICS_SECRET_KEY || token !== process.env.ANALYTICS_SECRET_KEY) {
    return {
      notFound: true // Returns 404 page
    };
  }

  try {
    const posts = await getBlogPosts(locale);
    const postsWithAnalytics = await Promise.all(
      posts.map(async (post) => ({
        post,
        analytics: await getPostAnalytics(post.slug)
      }))
    );

    return {
      props: {
        posts: postsWithAnalytics,
        ...(await serverSideTranslations(locale, ['common']))
      }
    };
  } catch (error) {
    return {
      notFound: true
    };
  }
}; 