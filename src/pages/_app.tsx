import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import Layout from '../components/Layout';
import '../i18n';
import { SpeedInsights } from "@vercel/speed-insights/next";

function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
      <SpeedInsights />
    </Layout>
  );
}

export default appWithTranslation(App); 