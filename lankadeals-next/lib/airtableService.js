// lib/airtableService.js
// This file is the client-side proxy to the internal API Routes.

// const AIRTABLE_NEWSLETTER_TABLE = 'Subscribers'; // COMMENTED OUT: No longer needed

export const airtableService = {
  /**
   * Fetches deals by calling the internal server-side /api/deals endpoint.
   */
  getDeals: async () => {
    try {
      // Use the simple relative path, which is correct for client-side fetching.
      const response = await fetch('/api/deals', {});
      
      if (!response.ok) {
          // Throw error so the client component can enter the error state
          throw new Error(`Failed to fetch deals from internal API. Status: ${response.status}`);
      }
      
      return await response.json(); 

    } catch (error) {
      console.error("❌ Deals API Call Failed. Returning fallback.", error);
      // Fallback data returned on failure
      return [{ id: 1, title: 'Fallback Deal', store: 'Local Fallback', currentprice: 'Rs. 1000', originalprice: 'Rs. 2000', discount: '50% OFF', imageurl: 'https://via.placeholder.com/300', category: 'electronics', expiry: '7 days left', affiliateurl: '#' }];
    }
  },

  /* TEMPORARILY REMOVED:
  subscribeNewsletter: async (email) => {
    const response = await fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    return await response.json();
  }
  */
};