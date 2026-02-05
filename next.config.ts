import type { NextConfig } from "next";
import baseUrl from "./baseUrl";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  async rewrites() {
    return [{ source: "/api/v1/:path*", destination: `${baseUrl}:path*` }];
  },
};

export default nextConfig;
