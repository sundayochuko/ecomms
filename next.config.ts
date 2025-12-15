import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  // Turbopack configuration - set root to current directory to avoid workspace inference issues
  // This prevents Next.js from trying to read parent directories when multiple lockfiles are detected
  turbopack: {
    root: path.resolve(__dirname),
  },
  // Image configuration - allow images from Convex storage
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'reminiscent-pigeon-138.convex.cloud',
        pathname: '/api/storage/**',
      },
      {
        protocol: 'https',
        hostname: '*.convex.cloud',
        pathname: '/api/storage/**',
      },
    ],
  },
  // Webpack configuration for path aliases (fallback)
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@/convex": path.resolve(__dirname, "convex"),
    };
    return config;
  },
};

export default nextConfig;
