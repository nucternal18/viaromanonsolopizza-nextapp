import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import CookieConsent from "react-cookie-consent";
import Link from "next/link";

import "tailwindcss/tailwind.css";
import "react-toastify/dist/ReactToastify.css";

import { store } from "@app/store";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Provider store={store}>
        <ThemeProvider attribute="class">
          <SessionProvider
            session={pageProps.session}
            refetchInterval={5 * 60}
            // Re-fetches session when window is focused
            refetchOnWindowFocus={true}
          >
            <Component {...pageProps} />
          </SessionProvider>
        </ThemeProvider>
      </Provider>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <CookieConsent
        disableStyles={true}
        location="bottom"
        buttonText="Accetto"
        buttonClasses="bg-red-500 hover:bg-red-600 text-white text-xs sm:text-md px-4 py-2 opacity-100 rounded-full"
        containerClasses="bg-white flex flex-col sm:flex-row items-center justify-center p-4 opacity-75 fixed bottom-0 left-0  w-full  "
        contentClasses="capitalize text-gray-900 font-serif text-center sm:text-left sm:mr-2"
        expires={150}
      >
        Questo sito utilizza i cookie. Vedi il nostro{" "}
        <Link href={"/privacy-policy"}>
          <a className="text-red-400 underline">Privacy Policy</a>
        </Link>{" "}
        per maggiori informazioni.
      </CookieConsent>
    </>
  );
}

export default MyApp;
