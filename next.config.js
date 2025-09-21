/** @type {import('next').NextConfig} */
const nextConfig = {
  // Removed static export to enable API routes
  trailingSlash: true,
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig
