import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import Layout from '../components/Layout';
import '../i18n';
import { SpeedInsights } from "@vercel/speed-insights/next";
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hostname = window.location.hostname; // e.g., 'de.example.com'
      const subdomain = hostname.split('.')[0]; // Extract 'de' or 'en'

      // Update locale dynamically based on the subdomain
      if (['de', 'en'].includes(subdomain) && router.locale !== subdomain) {
        router.replace(router.asPath, router.asPath, { locale: subdomain });
      }
    }
  }, [router]);

  return (
    <>
      <Head>
        {/* Block indexing and following */}
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <Layout>
        <Component {...pageProps} />
        <SpeedInsights />
      </Layout>
    </>
  );
}

export default appWithTranslation(App);
