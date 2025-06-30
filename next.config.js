/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // Disable SWC minifier to avoid binary loading issues in WebContainer
  swcMinify: false,
  // Use Babel instead of SWC for compilation
  compiler: {
    // Remove React properties for production builds
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Webpack configuration to handle potential issues
  webpack: (config, { isServer }) => {
    // Fallback for Node.js modules in client-side
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },
}

module.exports = nextConfig