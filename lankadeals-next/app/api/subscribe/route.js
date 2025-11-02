// lib/airtableService.js
// This code is built for the Next.js App Router and securely accesses secrets 
// without exposing them to the client browser.

import AirtableModule from 'airtable';
// Use the robust way to get the Airtable constructor
const Airtable = AirtableModule.default || AirtableModule; 

const AIRTABLE_DEALS_TABLE = 'Deals'; 
const AIRTABLE_NEWSLETTER_TABLE = 'Subscribers'; 

// Airtable base is initialized securely inside the function calls.

export const airtableService = {
  /**
   * Fetches deals from Airtable (runs on the server during Next.js rendering)
   */
  getDeals: async () => {
    // SECURE INITIALIZATION: Base is created here, inside a server-only execution path
    const base = new Airtable({ 
        apiKey: process.env.AIRTABLE_API_KEY 
    }).base(process.env.AIRTABLE_BASE_ID);

    const deals = [];
    
    try {
      const records = await base(AIRTABLE_DEALS_TABLE)
        .select({
          // Filter to show only deals explicitly marked 'Published'
          filterByFormula: "{Status} = 'Published'", 
          
          // Use existing field name for sorting (from d.csv)
          sort: [{ field: "Expiry_Date", direction: "desc" }], 
          view: "Grid view",
        })
        .all();

      records.forEach((record, index) => {
        const fields = record.fields;
        
        // Map CSV fields (with underscores) to frontend properties (camelCase)
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
      
      return deals.filter(deal => deal.title); 
      
    } catch (error) {
      // This will capture the NOT_FOUND (404) or AUTH (403) errors
      console.error("❌ Airtable Fetch Error:", error);
      // Fallback data provided on connection failure
      return [{ id: 1, title: 'Fallback Deal', store: 'Local Fallback', currentprice: 'Rs. 1000', originalprice: 'Rs. 2000', discount: '50% OFF', imageurl: 'https://via.placeholder.com/300', category: 'electronics', expiry: '7 days left', affiliateurl: '#' }];
    }
  },

  /**
   * Subscription call (which hits your server-side API Route /api/subscribe)
   */
  subscribeNewsletter: async (email) => {
    const response = await fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    // This is safe to run on the client because it only calls the local API route
    return await response.json(); 
  }
};