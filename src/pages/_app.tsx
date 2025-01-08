import '../styles/globals.css';
import '../styles/prism.css';
import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import Layout from '../components/Layout';
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import Head from 'next/head';
import LoadingTransition from '../components/LoadingTransition';

function App({ Component, pageProps }: AppProps) {
  const profiles = pageProps.cvData?.basics?.profiles || pageProps.mainData?.profiles || [
    {
      network: "GitHub",
      url: "https://github.com/Leon-Hoeck"
    },
    {
      network: "LinkedIn",
      url: "https://www.linkedin.com/in/leon-höck-663212343/"
    }
  ];

  const getTitle = () => {
    const name = pageProps.cvData?.basics?.name || "Leon Höck";
    return name;
  };

  return (
    <>
      <Head>
        <title>{getTitle()}</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <LoadingTransition />
      <Layout profiles={profiles}>
        <Component {...pageProps} />
        <SpeedInsights />
        <Analytics />
      </Layout>
    </>
  );
}

export default appWithTranslation(App);
