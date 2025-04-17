/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [],
    unoptimized: true, // For static exports
  },
  // Add redirects
  async redirects() {
    return [
      {
        source: '/public/value',
        destination: '/value',
        permanent: true,
      },
      {
        source: '/public/contact',
        destination: '/contact',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig