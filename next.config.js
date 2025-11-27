/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  // Skip static optimization to prevent prerendering issues with client-only code
  // This allows the build to complete even if some pages fail to prerender
  generateBuildId: async () => {
    return 'build-' + Date.now();
  },
  images: {
    domains: ['localhost'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3003',
        pathname: '/uploads/**',
      },
    ],
  },
  env: {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost',
    NEXT_PUBLIC_USER_SERVICE_URL: process.env.NEXT_PUBLIC_USER_SERVICE_URL || 'http://localhost:3001',
    NEXT_PUBLIC_CONTENT_SERVICE_URL: process.env.NEXT_PUBLIC_CONTENT_SERVICE_URL || 'http://localhost:3002',
    NEXT_PUBLIC_MEDIA_SERVICE_URL: process.env.NEXT_PUBLIC_MEDIA_SERVICE_URL || 'http://localhost:3003',
    NEXT_PUBLIC_CATEGORY_SERVICE_URL: process.env.NEXT_PUBLIC_CATEGORY_SERVICE_URL || 'http://localhost:3004',
    NEXT_PUBLIC_COMMENT_SERVICE_URL: process.env.NEXT_PUBLIC_COMMENT_SERVICE_URL || 'http://localhost:3005',
  },
}

module.exports = nextConfig
