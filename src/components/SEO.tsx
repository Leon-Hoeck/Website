import Head from 'next/head';
import { useRouter } from 'next/router';

interface SEOProps {
  title?: string;
  description?: string;
  noindex?: boolean;
  canonicalUrl?: string;
}

export default function SEO({ 
  title, 
  description,
  noindex = true,
  canonicalUrl,
}: SEOProps) {
  const router = useRouter();
  const locale = router.locale || 'en';
  
  // Construct the canonical URL
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://en.leonhoeck.ch';
  const path = router.asPath.split('?')[0];
  const defaultCanonical = `${baseUrl}${path}`;
  const canonical = canonicalUrl || defaultCanonical;

  return (
    <Head>
      {title && <title>{title}</title>}
      {description && <meta name="description" content={description} />}
      
      {/* Privacy and indexing directives */}
      <meta name="robots" content="noindex, nofollow, noarchive, nocache, nosnippet, notranslate, noimageindex" />
      <meta name="googlebot" content="noindex, nofollow, noarchive, nocache, nosnippet, notranslate, noimageindex" />
      
      {/* Swiss privacy compliance */}
      <meta name="privacy-policy" content={`${baseUrl}/privacy`} />
      <meta name="data-protection" content="DSG/FADP compliant" />
      <meta name="data-collection" content="minimal-analytics" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonical} />
      
      {/* Language alternates for multilingual SEO */}
      <link rel="alternate" hrefLang={locale} href={canonical} />
      <link rel="alternate" hrefLang="x-default" href={`https://en.leonhoeck.ch${path}`} />
      
      {/* Strict privacy-focused headers */}
      <meta name="referrer" content="strict-origin-when-cross-origin" />
      <meta name="do-not-track" content="1" />
    </Head>
  );
} 