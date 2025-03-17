import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import type { AppProps } from "next/app";
import Head from "next/head";
import CustomLoader from "@/components/CustomLoader"; // Import the loader
import "@/styles/globals.css"; // Import global styles

export default function MyApp({ Component, pageProps }: AppProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (router.pathname === "/") {
      // Simulate loading screen delay only for home page
      setIsLoaded(false);
      const timeout = setTimeout(() => setIsLoaded(true), 2500);
      return () => clearTimeout(timeout);
    } else {
      setIsLoaded(true); // Immediately load other pages
    }
  }, [router.pathname]); // Dependency ensures it updates when route changes

  useEffect(() => {
    // Register Service Worker for PWA
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then(() => console.log("Service Worker registered"))
        .catch((err) => console.log("Service Worker registration failed", err));
    }
  }, []);

  return (
    <>
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="apple-touch-icon" href="/image.png" />
      </Head>

      {!isLoaded && router.pathname === "/" ? (
        <CustomLoader onFinish={() => setIsLoaded(true)} />
      ) : (
        <Component {...pageProps} />
      )}
    </>
  );
}
