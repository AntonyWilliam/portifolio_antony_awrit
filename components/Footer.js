import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[rgba(5,5,5,0.85)] backdrop-blur-md text-white py-6 transition-all duration-300 border-t border-t-[rgba(255,255,255,0.05)] shadow-[0_-10px_30px_rgba(0,0,0,0.2)]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <img src="/images/logo/AWRITE-Logotype-White-Horizontal.png" alt="AWrit Logo" className="h-14" />
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-white opacity-70 hover:opacity-100 transition-all duration-300 hover:-translate-y-1 text-xl">
              <i className="fab fa-github"></i>
            </a>
            <a href="https://www.linkedin.com/in/antony-william/" target="_blank" rel="noopener noreferrer" className="text-white opacity-70 hover:opacity-100 transition-all duration-300 hover:-translate-y-1 text-xl">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="#" className="text-white opacity-70 hover:opacity-100 transition-all duration-300 hover:-translate-y-1 text-xl">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="mailto:antonyramalhopro@gmail.com" className="text-white opacity-70 hover:opacity-100 transition-all duration-300 hover:-translate-y-1 text-xl">
              <i className="fas fa-envelope"></i>
            </a>
          </div>
        </div>
        <p className="text-gray-400 text-center mt-4 text-sm">&copy; {new Date().getFullYear()} Antony William | Technical Writer & Documentation Specialist. All rights reserved.</p>
      </div>
    </footer>
  );
}