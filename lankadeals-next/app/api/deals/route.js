// app/api/deals/route.js
// SECURED: Implements Output Sanitization for XSS Prevention

import AirtableModule from 'airtable';
import { NextResponse } from 'next/server';

const Airtable = AirtableModule.default || AirtableModule;

// Environment variables for security (only accessible here on the server)
const AIRTABLE_DEALS_TABLE = 'Deals'; 
const AIRTABLE_NEWSLETTER_TABLE = 'Subscribers';

// --- SECURITY BARRIER: Output Sanitization Function ---
const sanitizeString = (str) => {
    if (!str || typeof str !== 'string') return '';
    // Replaces dangerous characters with their HTML entities to prevent execution on the client.
    return str.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
};
// --- END SECURITY BARRIER ---

// Initialize Base Constructor
const AirtableConstructor = Airtable;
const base = new AirtableConstructor({ 
    apiKey: process.env.AIRTABLE_API_KEY 
}).base(process.env.AIRTABLE_BASE_ID);


// Handle GET requests (called by the frontend service during SSG/ISR)
export async function GET(request) {
  const deals = [];
  
  try {
    const records = await base(AIRTABLE_DEALS_TABLE)
      .select({
        filterByFormula: "{Status} = 'Published'", 
        sort: [{ field: "Expiry_Date", direction: "desc" }], 
        view: "Grid view",
      })
      .all();

    records.forEach((record, index) => {
      const fields = record.fields;
      
      // Map Airtable fields to frontend properties, applying sanitization to every string field
      deals.push({
        id: sanitizeString(record.id || index.toString()),
        title: sanitizeString(fields.Title),
        store: sanitizeString(fields.Store),
        currentprice: sanitizeString(fields.Current_Price), 
        originalprice: sanitizeString(fields.Original_Price),
        discount: sanitizeString(fields.Discount_Percentage),
        imageurl: sanitizeString(fields.Image_URL) || 'https://via.placeholder.com/300',
        category: sanitizeString(fields.Category ? fields.Category.toLowerCase() : 'other'),
        expiry: sanitizeString(fields.Expiry_Date),
        affiliateurl: sanitizeString(fields.Affiliate_Link) || '#'
      });
    });
    
    // Return the fetched and mapped deals as a JSON response
    return NextResponse.json(deals.filter(deal => deal.title));

  } catch (error) {
    console.error("❌ Airtable Fetch Error in API Route:", error);
    // Return a structured error response
    return NextResponse.json({ 
      error: 'Failed to fetch deals from the database.',
      details: error.message 
    }, { status: 500 });
  }
}