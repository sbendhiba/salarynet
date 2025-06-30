/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  async generateBuildId() {
    return 'build'
  }
}

module.exports = nextConfig