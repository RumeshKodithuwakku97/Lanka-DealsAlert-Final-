// rumeshkodithuwakku97/lanka-dealsalert-final-/Lanka-DealsAlert-Final--052f66bc561c0a04f7a9079a5c265864a79c0dbb/lankadeals-next/next.config.ts

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  
  // --- PERMANENT SOLUTION: Condition Headers on Production Environment ---
  async headers() {
    // Only apply the strict headers in a production build (NEXT_PUBLIC_VERCEL_ENV is set by Vercel)
    if (process.env.NODE_ENV !== 'production' && !process.env.NEXT_PUBLIC_VERCEL_ENV) {
        return []; // Return empty array during local development
    }

    return [
      {
        source: '/(.*)',
        headers: [
          // Content Security Policy (CSP)
          {
            key: 'Content-Security-Policy',
            value: `default-src 'self'; script-src 'self' 'unsafe-eval'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://api.airtable.com;`
          },
          // Strict-Transport-Security (HSTS)
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          // X-Frame-Options
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          // X-Content-Type-Options
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          // X-XSS-Protection
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          // Referrer-Policy
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
        ],
      },
    ];
  },
  // --- END PERMANENT SOLUTION ---
};

export default nextConfig;