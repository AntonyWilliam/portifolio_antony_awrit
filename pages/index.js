import { useEffect } from 'react';

// Direct redirection to the static HTML site
export default function Home() {
  useEffect(() => {
    // Only run on client-side
    if (typeof window !== 'undefined') {
      window.location.href = '/index.html';
    }
  }, []);
  
  // Return empty div during server-side rendering
  return <div></div>;
}