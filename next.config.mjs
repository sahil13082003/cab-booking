/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    nodeMiddleware: true, // Enable Node.js runtime for middleware
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
