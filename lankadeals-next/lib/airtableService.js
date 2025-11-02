// lib/airtableService.js
// This file is the secure service layer. It proxies requests to the internal 
// Next.js API Routes (e.g., /api/deals) to fetch content.

const AIRTABLE_NEWSLETTER_TABLE = 'Subscribers'; 

export const airtableService = {
  /**
   * Fetches deals by calling the internal server-side /api/deals endpoint.
   * This is called by Next.js during the SSG/ISR process.
   */
  getDeals: async () => {
    try {
      // CRITICAL FIX: Use the simple relative path /api/deals. 
      // Next.js correctly resolves this during the build process and runtime.
      const response = await fetch('/api/deals', {
          // IMPORTANT: Leave the cache options empty here. 
          // Caching is controlled by 'export const revalidate = 300;' in app/page.tsx
          // Adding 'cache: "no-store"' or conflicting headers causes the DYNAMIC_SERVER_USAGE error.
      });
      
      if (!response.ok) {
          console.error(`Failed to fetch deals: ${response.status}`);
          // Throw error so Next.js can handle the failure gracefully
          throw new Error(`Failed to fetch deals from internal API. Status: ${response.status}`);
      }
      
      // The API route (/api/deals) has already handled the security and data mapping.
      return await response.json(); 

    } catch (error) {
      console.error("❌ Deals API Call Failed. Returning fallback.", error);
      // Fallback data provided on connection failure
      return [{ id: 1, title: 'Fallback Deal', store: 'Local Fallback', currentprice: 'Rs. 1000', originalprice: 'Rs. 2000', discount: '50% OFF', imageurl: 'https://via.placeholder.com/300', category: 'electronics', expiry: '7 days left', affiliateurl: '#' }];
    }
  },

  /**
   * Subscription call (which hits your server-side /api/subscribe route)
   */
  subscribeNewsletter: async (email) => {
    // This calls the local API Route.
    const response = await fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    return await response.json();
  }
};