import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState('dark');
  
  useEffect(() => {
    // Check if window is defined (client-side)
    if (typeof window !== 'undefined') {
      // Get saved theme from localStorage if available
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'light') {
        setTheme('light');
        document.documentElement.classList.add('light-theme');
      }
    }
  }, []);
  
  const toggleTheme = () => {
    if (typeof window !== 'undefined') {
      if (theme === 'dark') {
        setTheme('light');
        document.documentElement.classList.add('light-theme');
        localStorage.setItem('theme', 'light');
      } else {
        setTheme('dark');
        document.documentElement.classList.remove('light-theme');
        localStorage.setItem('theme', 'dark');
      }
    }
  };

  return (
    <nav className={`shadow-md fixed w-full z-10 transition-colors duration-300 backdrop-blur-md ${theme === 'dark' ? 'bg-[#0A0A0A] bg-opacity-95' : 'bg-[#f5f5f5] bg-opacity-95'}`}>
      <div className="w-full mx-auto px-6">
        <div className="flex justify-between h-18 py-1 items-center">
          <div className="flex items-center">
            <Link href="/">
              <div className="flex items-center cursor-pointer">
                <img src="/images/logo/AWRITE-Logo-Icon-White.png" alt="AWrit Logo" className="h-12 mr-2" />
                <span className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                  Antony William
                </span>
              </div>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/">
              <span className={`${theme === 'dark' ? 'text-white' : 'text-gray-800'} text-sm hover:text-[#0033CC] cursor-pointer relative after:content-[''] after:absolute after:bottom-[-5px] after:left-0 after:w-0 after:h-[2px] after:bg-[#0033CC] after:transition-all after:duration-300 hover:after:w-full`}>Home</span>
            </Link>
            <Link href="/value">
              <span className={`${theme === 'dark' ? 'text-white' : 'text-gray-800'} text-sm hover:text-[#0033CC] cursor-pointer relative after:content-[''] after:absolute after:bottom-[-5px] after:left-0 after:w-0 after:h-[2px] after:bg-[#0033CC] after:transition-all after:duration-300 hover:after:w-full`}>Value</span>
            </Link>
            <Link href="/contact">
              <span className={`${theme === 'dark' ? 'text-white' : 'text-gray-800'} text-sm hover:text-[#0033CC] cursor-pointer relative after:content-[''] after:absolute after:bottom-[-5px] after:left-0 after:w-0 after:h-[2px] after:bg-[#0033CC] after:transition-all after:duration-300 hover:after:w-full`}>Contact</span>
            </Link>
            <button onClick={toggleTheme} className={`bg-transparent border-none ${theme === 'dark' ? 'text-white' : 'text-gray-800'} hover:text-[#0033CC] transition-all duration-300`}>
              {theme === 'dark' ? (
                <i className="fas fa-moon text-lg"></i>
              ) : (
                <i className="fas fa-sun text-lg" style={{ color: '#0d47a1' }}></i>
              )}
            </button>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={toggleTheme} className={`bg-transparent border-none ${theme === 'dark' ? 'text-white' : 'text-gray-800'} mr-4`}>
              {theme === 'dark' ? (
                <i className="fas fa-moon text-lg"></i>
              ) : (
                <i className="fas fa-sun text-lg" style={{ color: '#0d47a1' }}></i>
              )}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className={`md:hidden ${theme === 'dark' ? 'bg-[#0A0A0A]' : 'bg-[#f5f5f5]'}`}>
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link href="/">
              <span className={`block px-3 py-2 ${theme === 'dark' ? 'text-white hover:bg-gray-800' : 'text-gray-800 hover:bg-gray-200'} cursor-pointer`}>
                Home
              </span>
            </Link>
            <Link href="/value">
              <span className={`block px-3 py-2 ${theme === 'dark' ? 'text-white hover:bg-gray-800' : 'text-gray-800 hover:bg-gray-200'} cursor-pointer`}>
                Value
              </span>
            </Link>
            <Link href="/kb">
              <span className={`block px-3 py-2 ${theme === 'dark' ? 'text-white hover:bg-gray-800' : 'text-gray-800 hover:bg-gray-200'} cursor-pointer`}>
                Knowledge Base
              </span>
            </Link>
            <Link href="/contact">
              <span className={`block px-3 py-2 ${theme === 'dark' ? 'text-white hover:bg-gray-800' : 'text-gray-800 hover:bg-gray-200'} cursor-pointer`}>
                Contact
              </span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}