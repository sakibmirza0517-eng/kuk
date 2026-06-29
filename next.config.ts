import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true, // Ye line TypeScript errors ko ignore kar degi
  },
};

export default nextConfig;