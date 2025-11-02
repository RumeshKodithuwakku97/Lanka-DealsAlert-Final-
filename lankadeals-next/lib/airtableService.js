// lib/airtableService.js
// This file is now a lightweight local utility layer that fetches data
// from the internal Next.js API Routes (e.g., /api/deals).

const AIRTABLE_NEWSLETTER_TABLE = 'Subscribers'; 

export const airtableService = {
  /**
   * Fetches deals by calling the internal server-side /api/deals endpoint.
   * This runs during Next.js SSG/ISR and ensures data is fresh.
   */
  getDeals: async () => {
    try {
      // Use process.env.NEXT_PUBLIC_VERCEL_URL for deployment URL on Vercel, 
      // or default to localhost during development.
      const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL || 'http://localhost:3000';
      
      const response = await fetch(`${baseUrl}/api/deals`, {
        // Crucial: Use 'no-cache' for development, or rely on the revalidate tag in app/page.tsx
        headers: { 'Cache-Control': 'no-cache' }
      });
      
      if (!response.ok) {
          console.error(`Failed to fetch deals: ${response.status}`);
          throw new Error('Failed to fetch deals from internal API.');
      }
      
      // The API route handles the security and mapping; we just consume the result.
      return await response.json(); 

    } catch (error) {
      console.error("❌ Deals API Call Failed. Returning fallback.", error);
      // Fallback data structure returned on failure
      return [{ id: 1, title: 'Fallback Deal', store: 'Local Fallback', currentprice: 'Rs. 1000', originalprice: 'Rs. 2000', discount: '50% OFF', imageurl: 'https://via.placeholder.com/300', category: 'electronics', expiry: '7 days left', affiliateurl: '#' }];
    }
  },

  /**
   * Subscription call (which hits your server-side /api/subscribe route)
   */
  subscribeNewsletter: async (email) => {
    // This is the client-side fetch call to the local API Route.
    const response = await fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    return await response.json();
  }
};