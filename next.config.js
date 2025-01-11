/** @type {import('next').NextConfig} */
const isProduction = process.env.NODE_ENV === 'production';

const nextConfig = {
  basePath: isProduction ? '/blog' : '', // Apply basePath only in production
  publicRuntimeConfig: {
    basePath: process.env.NODE_ENV === 'production' ? '/blog' : '',
  },
  output: 'export',
  images: { 
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
    ],
  },
};

module.exports = nextConfig;