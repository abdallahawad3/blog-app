import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
        port: "",
      },
      {
        protocol: "https",
        hostname: "oceanic-aardvark-672.eu-west-1.convex.cloud",
        pathname: "/api/storage/**",
      },
    ],
  },
};

export default nextConfig;
