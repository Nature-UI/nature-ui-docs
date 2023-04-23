import { ToastProvider } from "@nature-ui/core";
import siteConfig from "configs/site-config";
import { DefaultSeo } from "next-seo";
import type { AppProps } from "next/app";
import Script from "next/script";

import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import * as gtag from "utils/gtag";
import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      {/* <!-- Google tag (gtag.js) --> */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'G-21VXFHQHH7');
            `,
        }}
      />
      <Head>
        <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/favicon/favicon.ico"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <meta name="theme-color" content="#319795" />
      </Head>
      <DefaultSeo {...siteConfig.seo} />
      <ToastProvider>
        <Component {...pageProps} />
      </ToastProvider>
    </>
  );
}
