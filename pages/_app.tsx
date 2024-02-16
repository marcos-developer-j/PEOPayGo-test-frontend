import '../styles/globals.css';
import '../styles/tailwind.css';
import type { AppProps } from 'next/app';
import Layout from '../src/components/NavBar/layout';
import 'normalize.css/normalize.css';
import Head from 'next/head';
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Head>
        <title>Iunctus Tracking</title>
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
