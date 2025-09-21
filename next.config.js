/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  basePath: '/nhs-llm-safety-bench',
  assetPrefix: '/nhs-llm-safety-bench'
}

module.exports = nextConfig
