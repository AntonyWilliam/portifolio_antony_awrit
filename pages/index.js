import { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import dynamic from 'next/dynamic';

// Dynamically import responsive components with SSR disabled to avoid hydration issues
const ResponsiveHomepage = dynamic(
  () => import('../components/HomepageComponents').then(mod => ({ default: mod.HomepageExample })),
  { ssr: false }
);

export default function Home() {
  const [useReactVersion, setUseReactVersion] = useState(false);
  
  useEffect(() => {
    // Check for a query parameter to enable the React version
    // Example: ?react=true in the URL will show the React version
    const urlParams = new URLSearchParams(window.location.search);
    const showReact = urlParams.get('react') === 'true';
    
    if (showReact) {
      setUseReactVersion(true);
    } else {
      // Otherwise redirect to the static HTML page
      window.location.href = '/index.html';
    }
  }, []);
  
  // If React version is enabled, render it
  if (useReactVersion) {
    return (
      <Layout 
        title="Home"
        description="Technical Writer & Documentation Specialist"
      >
        {/* Client-side rendered responsive components */}
        <ResponsiveHomepage />
      </Layout>
    );
  }
  
  // Otherwise show nothing during redirect
  return null;
}