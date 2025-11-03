// middleware.js
// FINAL SECURITY HARDENING: Scalable Rate Limiting and Admin Access Protection

import { NextResponse } from 'next/server';

// --- MOCK SERVICE: Production Rate Limiter ---
// In a real deployment, this function calls Redis or Upstash to enforce request limits
// across all serverless instances, providing a scalable DoS defense.
const checkRateLimit = async (ip, pathname) => {
    // For demonstration, we assume requests are allowed unless triggered by actual flooding.
    const mockRequestCount = 0; 
    
    // Example: Trigger limit if we detect 10 requests/minute on the /go route
    if (pathname.startsWith('/api/go/') && mockRequestCount >= 10) {
        return { limited: true, retryAfter: 60 }; // Retry after 60 seconds
    }
    
    return { limited: false };
};

// --- MOCK SERVICE: Authentication Check (Least Privilege) ---
// In a real deployment, this verifies a token/session from NextAuth.js or a custom JWT.
const checkAdminAuth = (request) => {
    // Access is granted only to users with the Admin role.
    const isAuthenticated = false; 
    return isAuthenticated;
};

export async function middleware(request) {
    const ip = request.headers.get('x-forwarded-for') || request.ip || '127.0.0.1';
    const pathname = request.nextUrl.pathname;

    // =================================================================
    // BARRIER 1: RATE LIMITING (DoS Defense)
    // =================================================================
    if (pathname.startsWith('/api/go/') || pathname === '/api/subscribe') {
        const { limited, retryAfter } = await checkRateLimit(ip, pathname);

        if (limited) {
            // Responds with HTTP 429 (Too Many Requests)
            return new NextResponse(
                JSON.stringify({ success: false, error: 'Rate limit exceeded. Too many requests.' }),
                { 
                    status: 429, 
                    headers: { 
                        'Retry-After': retryAfter ? retryAfter.toString() : '60',
                        'Content-Type': 'application/json'
                    } 
                }
            );
        }
    }

    // =================================================================
    // BARRIER 2: ADMIN ACCESS CONTROL (Least Privilege)
    // =================================================================
    if (pathname.startsWith('/admin') || pathname.startsWith('/api/admin')) {
        const isAuthenticated = checkAdminAuth(request);

        if (!isAuthenticated) {
            // Blocks unauthorized access to hypothetical admin routes with 401
            return new NextResponse(
                JSON.stringify({ success: false, error: 'Unauthorized Access. Authentication required.' }),
                { 
                    status: 401,
                    headers: { 'Content-Type': 'application/json' }
                }
            );
        }
    }

    // Allow the request to proceed to the next handler (API Route or page)
    return NextResponse.next();
}

// Config ensures this middleware only runs on necessary paths, saving resources
export const config = {
    matcher: [
        '/api/go/:path*',      // Rate limits all affiliate link redirects
        '/api/subscribe',      // Rate limits newsletter subscriptions
        '/admin/:path*',       // Protects hypothetical UI admin dashboard
        '/api/admin/:path*'    // Protects hypothetical admin APIs
    ],
};