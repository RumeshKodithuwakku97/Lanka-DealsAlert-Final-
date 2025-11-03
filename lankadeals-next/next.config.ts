// next.config.ts - Permanent Solution (Ensures stability locally and security remotely)
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  
  async headers() {
    // SECURITY FIX: Only apply strict headers in a production/preview environment
    if (process.env.NODE_ENV !== 'production' && !process.env.NEXT_PUBLIC_VERCEL_ENV) {
        return []; // Returns empty array on localhost for speed/stability
    }

    return [
      {
        source: '/(.*)',
        headers: [
          // IMPORTANT: Maintain all security headers here for production
          {
            key: 'Content-Security-Policy',
            value: `default-src 'self'; script-src 'self' 'unsafe-eval'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://api.airtable.com;`
          },
          // ... all other security headers (HSTS, X-Frame-Options, etc.)
        ],
      },
    ];
  },
};

export default nextConfig;