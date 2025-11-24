import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Image domains configuration
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3001',
        pathname: '/**',
      },
    ],
  },
  // Exclude CMS directory from build
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    return config;
  },
  // Ignore CMS directory during build
  outputFileTracingExcludes: {
    '*': ['./cms/**/*'],
  },
};

export default nextConfig;
