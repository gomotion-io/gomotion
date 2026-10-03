import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "legendary.b-cdn.net",
      },
      // OAuth provider avatars
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
    ],
  },
  // Legacy email auth pages, sign-up now happens on /sign-in
  async redirects() {
    return [
      { source: "/register", destination: "/sign-in", permanent: true },
      { source: "/forgot-password", destination: "/sign-in", permanent: true },
    ];
  },
};

export default nextConfig;
