import { useState, useEffect } from "react";
import type { AppProps } from "next/app";
import Head from "next/head";
import CustomLoader from "@/components/CustomLoader"; // Import the loader
import "@/styles/globals.css"; // Import global styles

export default function MyApp({ Component, pageProps }: AppProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate loading screen delay
    const timeout = setTimeout(() => setIsLoaded(true), 2500);

    // Register Service Worker for PWA
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then(() => console.log("Service Worker registered"))
        .catch((err) => console.log("Service Worker registration failed", err));
    }

    return () => clearTimeout(timeout); // Cleanup timeout
  }, []);

  return (
    <>
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="apple-touch-icon" href="/image.png" />
      </Head>

      {!isLoaded ? (
        <CustomLoader onFinish={() => setIsLoaded(true)} />
      ) : (
        <Component {...pageProps} />
      )}
    </>
  );
}
