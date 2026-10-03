import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "https://images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "legendary.b-cdn.net",
      },
    ],
  },
};

export default nextConfig;
