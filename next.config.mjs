/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/backend/:path*',
        destination: '/api/:path*', // Maps to API routes
      },
    ];
  },
};

export default nextConfig;
