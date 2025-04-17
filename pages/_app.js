import '../styles/globals.css';
import { useEffect } from 'react';
import Layout from '../components/Layout';

function MyApp({ Component, pageProps }) {
  // Add client-side only code
  useEffect(() => {
    // Handle localStorage theme support
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      document.documentElement.classList.add('light-theme');
    }
  }, []);

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;