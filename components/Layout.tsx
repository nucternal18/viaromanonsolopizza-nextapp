import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { ToastContainer } from "react-toastify";

import MainNavbar from "./Nav/MainNavBar";
import Footer from "./Footer";

interface ILayout {
  title?: string;
  description?: string;
  children: React.ReactNode;
}

function Layout({ title, description, children }: ILayout): JSX.Element {
  const router = useRouter();
  return (
    <div className="flex flex-col justify-between h-screen">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <title>{title} - Via Roma Non Solo Pizza</title>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="application-name" content="Via Roma Non Solo Pizza" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta
          name="apple-mobile-web-app-title"
          content="Via Roma Non Solo Pizza"
        />
        <meta name="description" content={description} />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content={`${title} | Via Roma Non Solo Pizza`}
        />
        <meta property="og:description" content={description} />
        <meta property="og:site_name" content="Via Roma Non Solo Pizza" />
        <meta property="og:url" content="https://viaromanonsolopizza.com" />
        <meta name="theme-color" content="#000000" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <MainNavbar />
      <main
        className={`relative bg-gray-100 ${
          router.asPath === "/" ? "mt-0" : "mt-20"
        }`}
      >
        {children}
      </main>
      <ToastContainer autoClose={4000} />
      <Footer />
    </div>
  );
}

Layout.defaultProps = {
  title: "Benvenuti da Via ",
  description:
    " ViaRomaNonSoloPizza nasce dalla passione per la pizza coltivata da un sogno alla realizzazione",
  keywords: "pizza",
};

export default Layout;
