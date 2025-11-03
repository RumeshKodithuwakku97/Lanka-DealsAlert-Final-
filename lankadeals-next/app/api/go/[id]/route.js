// app/api/go/[id]/route.js
// SOLUTION: Link Cloaking (Hides Affiliate IDs, SEO Trust) & Basic Rate Limiting

import { NextResponse } from 'next/server';
import AirtableModule from 'airtable';

const Airtable = AirtableModule.default || AirtableModule;
const AIRTABLE_DEALS_TABLE = 'Deals'; 

// --- SECURITY BARRIER: Minimal In-Memory Rate Limiter (Simulated) ---
const requestMap = new Map();
const RATE_LIMIT_COUNT = 5; // Max 5 requests per minute per IP for sensitive links
const RATE_LIMIT_WINDOW_MS = 60000; 

function isRateLimited(ip) {
    const records = requestMap.get(ip) || [];
    const now = Date.now();
    // Filter out old records
    const recentRequests = records.filter(time => now - time < RATE_LIMIT_WINDOW_MS);
    
    if (recentRequests.length >= RATE_LIMIT_COUNT) {
        requestMap.set(ip, recentRequests);
        return true;
    }

    recentRequests.push(now);
    requestMap.set(ip, recentRequests);
    return false;
}
// ---------------------------------------------------------------------

export async function GET(request, { params }) {
    const dealId = params.id;
    // Basic IP acquisition (may vary by hosting platform)
    const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';

    if (isRateLimited(ip)) {
        return NextResponse.json({ error: 'Rate limit exceeded. Try again later.' }, { status: 429 });
    }

    const base = new Airtable({ 
        apiKey: process.env.AIRTABLE_API_KEY 
    }).base(process.env.AIRTABLE_BASE_ID);
    
    try {
        const record = await base(AIRTABLE_DEALS_TABLE).find(dealId);
        const affiliateLink = record.fields.Affiliate_Link;

        if (!affiliateLink) {
            return NextResponse.json({ error: 'Deal link not found.' }, { status: 404 });
        }

        // SEO and Trust: Use a 302/307 redirect, signalling an affiliate link is temporary/tracked.
        return NextResponse.redirect(affiliateLink, 307);

    } catch (error) {
        console.error("❌ Cloaking Redirect Error:", error.message);
        return NextResponse.json(
            { error: 'Failed to retrieve link for redirection.' }, 
            { status: 500 }
        );
    }
}