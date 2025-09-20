/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  basePath: process.env.NODE_ENV === 'production' ? '/nhs-llm-safety-bench' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/nhs-llm-safety-bench/' : '',
}

module.exports = nextConfig
