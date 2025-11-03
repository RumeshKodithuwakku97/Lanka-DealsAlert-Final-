import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  
  // --- SECURITY HARDENING: HTTP SECURITY HEADERS ---
  async headers() {
    return [
      {
        // Apply these headers to all routes in the application
        source: '/(.*)',
        headers: [
          // Content Security Policy (CSP): Prevents XSS and data injection attacks
          // This allows resources only from your site, Google Fonts, and Airtable API.
          {
            key: 'Content-Security-Policy',
            value: `default-src 'self'; script-src 'self' 'unsafe-eval'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://api.airtable.com;`
          },
          // X-Content-Type-Options: Prevents MIME-sniffing (security feature).
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          // X-Frame-Options: Prevents clickjacking by forbidding rendering in an iframe.
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          // Referrer-Policy: Protects user privacy by limiting referrer information sent to affiliate sites.
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          // Strict-Transport-Security (HSTS): Forces all communication over HTTPS.
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          // X-XSS-Protection: Enables the browser's built-in XSS filter.
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          }
        ],
      },
    ];
  },
  // --- END SECURITY HARDENING ---
};

export default nextConfig;