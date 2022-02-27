import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import "tailwindcss/tailwind.css";
import "react-toastify/dist/ReactToastify.css";

import { AuthProvider } from "../context/authContext";
import { MenuProvider } from "../context/menuContext";
import { GalleryProvider } from "../context/galleryContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeProvider attribute="class">
        <SessionProvider session={pageProps.session}>
          <AuthProvider>
            <MenuProvider>
              <GalleryProvider>
                <Component {...pageProps} />
              </GalleryProvider>
            </MenuProvider>
          </AuthProvider>
        </SessionProvider>
      </ThemeProvider>
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
    </>
  );
}

export default MyApp;
