import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function KnowledgeBase() {
  const [useReactVersion, setUseReactVersion] = useState(false);
  const router = useRouter();
  
  useEffect(() => {
    // Check for a query parameter to enable the React version
    const urlParams = new URLSearchParams(window.location.search);
    const showReact = urlParams.get('react') === 'true';
    
    if (showReact) {
      setUseReactVersion(true);
    } else {
      // Otherwise redirect to the static HTML page
      window.location.href = '/kb/index.html';
    }
  }, []);
  
  // If React version is enabled, render it
  if (useReactVersion) {
    return (
      <Layout 
        title="Knowledge Base"
        description="Technical Documentation Knowledge Base"
      >
        <div className="kb-page">
          <h1>Knowledge Base React Version</h1>
          <p>This is the React-rendered version of the Knowledge Base page.</p>
        </div>
      </Layout>
    );
  }
  
  // Otherwise show nothing during redirect
  return null;
}