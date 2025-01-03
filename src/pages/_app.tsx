import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import Layout from '../components/Layout';
import '../i18n';
import { SpeedInsights } from "@vercel/speed-insights/next";
import { useEffect } from 'react';
import { useRouter } from 'next/router';

function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hostname = window.location.hostname; // e.g., "de.leonhoeck.ch"
      const subdomain = hostname.split('.')[0]; // Extract "de" or "en"

      // Update locale dynamically based on the subdomain
      if (subdomain === 'de' && router.locale !== 'de') {
        router.push(router.asPath, router.asPath, { locale: 'de' });
      } else if (subdomain === 'en' && router.locale !== 'en') {
        router.push(router.asPath, router.asPath, { locale: 'en' });
      }
    }
  }, [router]);

  return (
    <Layout>
      <Component {...pageProps} />
      <SpeedInsights />
    </Layout>
  );
}

export default appWithTranslation(App);
