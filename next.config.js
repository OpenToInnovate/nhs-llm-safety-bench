/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable API routes for backend functionality
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // Enable server-side functionality
  experimental: {
    serverComponentsExternalPackages: []
  }
}

module.exports = nextConfig
