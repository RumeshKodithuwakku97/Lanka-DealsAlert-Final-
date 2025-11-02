// app/api/deals/route.js
// This file securely fetches data from Airtable on the server.

import AirtableModule from 'airtable';
import { NextResponse } from 'next/server';

const Airtable = AirtableModule.default || AirtableModule;

// Environment variables for security (only accessible here on the server)
const AIRTABLE_DEALS_TABLE = 'Deals'; 
const AIRTABLE_NEWSLETTER_TABLE = 'Subscribers';

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
      
      // Map Airtable fields to frontend properties
      deals.push({
        id: record.id || index,
        title: fields.Title || 'No Title',
        store: fields.Store || 'Unknown Store',
        currentprice: fields.Current_Price || '', 
        originalprice: fields.Original_Price || '',
        discount: fields.Discount_Percentage || '',
        imageurl: fields.Image_URL || 'https://via.placeholder.com/300',
        category: fields.Category ? fields.Category.toLowerCase() : 'other',
        expiry: fields.Expiry_Date || 'N/A',
        affiliateurl: fields.Affiliate_Link || '#'
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