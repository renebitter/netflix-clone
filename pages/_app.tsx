import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>FLIXNET</title>
        <meta
          name='description'
          content='A clone from a popular video streaming service'
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
