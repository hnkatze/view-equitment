import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["localhost", "firebasestorage.googleapis.com"],
  }
  /* config options here */
};

export default nextConfig;
