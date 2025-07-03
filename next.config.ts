import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    // Exclude esbuild from webpack bundling to prevent parse errors
    if (isServer) {
      config.externals = config.externals || [];
      config.externals.push("esbuild");
    }
    return config;
  },
};

export default nextConfig;
