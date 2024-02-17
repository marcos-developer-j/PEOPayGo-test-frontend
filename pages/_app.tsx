import "../styles/globals.css";
import "../styles/tailwind.css";
import type { AppProps } from "next/app";
import Layout from "../src/components/NavBar/Layout";
import "normalize.css/normalize.css";
import Head from "next/head";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Head>
        <title>PEOPayGo</title>
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
