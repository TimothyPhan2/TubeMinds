import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: "i.ytimg.com",
        protocol: "https",
      },
      {
        hostname:"yt3.ggpht.com",
        protocol: "https",
      },
      {
        hostname:"outgoing-wren-579.convex.cloud",
        protocol: "https"
      }
    ],
  },
};

export default nextConfig;
