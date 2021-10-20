import type { AppProps } from "next/app";
import "tailwindcss/tailwind.css";

import { AuthProvider } from "../context/authContext";
import { MenuProvider } from "../context/menuContext";
import { GalleryProvider } from "../context/galleryContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <MenuProvider>
        <GalleryProvider>
          <Component {...pageProps} />
        </GalleryProvider>
      </MenuProvider>
    </AuthProvider>
  );
}

export default MyApp;
