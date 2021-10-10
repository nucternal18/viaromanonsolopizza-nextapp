import 'tailwindcss/tailwind.css';

import { AuthProvider } from '../context/authContext';
import { MenuProvider } from '../context/menuContext';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <MenuProvider>
        <Component {...pageProps} />
      </MenuProvider>
    </AuthProvider>
  );
}

export default MyApp;
