import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import Layout from '../components/Layout';
import nextI18NextConfig from '../../next-i18next.config';
import { SpeedInsights } from "@vercel/speed-insights/next";
import Navbar from '../components/Navbar';

function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
      <SpeedInsights />
    </Layout>
  );
}

export default appWithTranslation(App, nextI18NextConfig); 