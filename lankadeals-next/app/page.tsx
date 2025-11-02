// app/page.tsx
// This Server Component handles data fetching during SSG/ISR.

import { airtableService } from '../lib/airtableService';
import ClientHomePage from '../src/components/ClientHomePage'; 

// Next.js config for Incremental Static Regeneration (ISR)
// Re-fetches the deal data in the background every 5 minutes (300 seconds).
export const revalidate = 300; 

// This async function fetches the initial deals data from the server.
export default async function Page() {
    
    const initialDeals = await airtableService.getDeals();
    
    // Pass the fetched static data to the client component for interactivity.
    return <ClientHomePage initialDeals={initialDeals} />;
}