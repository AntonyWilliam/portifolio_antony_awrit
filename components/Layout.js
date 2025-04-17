import Head from 'next/head';
import Navbar from './Navbar';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Layout({ children, title, description }) {
  const router = useRouter();
  
  // Add smooth page transitions
  useEffect(() => {
    const handleStart = () => {
      // Add fade-out effect when navigation starts
      document.body.classList.add('page-transition-out');
    };
    
    const handleComplete = () => {
      // Add fade-in effect when navigation completes
      document.body.classList.remove('page-transition-out');
      document.body.classList.add('page-transition-in');
      
      // Remove the classes after animation completes
      setTimeout(() => {
        document.body.classList.remove('page-transition-in');
      }, 300);
    };
    
    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    
    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
    };
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>{title ? `${title} | Antony William` : `Antony William | Technical Writer & Documentation Specialist`}</title>
        <meta name="description" content={description || 'Technical Writer & Documentation Specialist'} />
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet" />
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet" />
      </Head>

      <Navbar />
      
      <main className="flex-grow pt-20 transition-opacity duration-300">
        <div className="w-[80%] md:w-[75%] lg:w-[70%] xl:w-[65%] mx-auto">
          {children}
        </div>
      </main>
      
      <style jsx global>{`
        body {
          font-family: 'Roboto', sans-serif;
          transition: background-color 0.3s ease;
        }
        
        .page-transition-out {
          opacity: 0.5;
          transition: opacity 0.2s ease-out;
        }
        
        .page-transition-in {
          opacity: 1;
          transition: opacity 0.2s ease-in;
        }
        
        /* Root variables for theming */
        :root {
          --bg-color: #0A0A0A;
          --bg-color-rgb: 10, 10, 10;
          --card-bg: #1A1A1A;
          --text-color: #FFFFFF;
          --secondary-text: #AAAAAA;
          --gold: #0033CC;
          --gold-rgb: 0, 51, 204;
          --spacing: 6rem;
          --transition: all 0.3s ease;
          --section-bg: #FFFFFF;
        }
        
        /* Light theme */
        :root.light-theme {
          --bg-color: #f5f5f5;
          --bg-color-rgb: 245, 245, 245;
          --card-bg: #ffffff;
          --text-color: #333333;
          --secondary-text: #555555;
        }
      `}</style>
    </div>
  );
}