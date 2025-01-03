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
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
      const hostname = window.location.hostname;
      const subdomain = hostname.split('.')[0];
      const validLocales = ['en', 'de', 'fr', 'it'];
      
      if (validLocales.includes(subdomain) && router.locale !== subdomain) {
        const newUrl = `https://${subdomain}.leonhoeck.ch${router.asPath}`;
        window.location.href = newUrl;
      }
    }
  }, [router]);

  return (
    <>
      <Head>
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
