// next.config.ts - Temporary Testing Fix
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,

  async headers() {
    return []; // TEMPORARILY DISABLE ALL HEADERS
  },
};

export default nextConfig;