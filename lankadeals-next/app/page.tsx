// app/page.tsx
// This file is now a simple Server Component that renders the client wrapper.

import ClientHomePage from '../src/components/ClientHomePage'; 

// CRITICAL CHANGE: Remove ISR configuration and server-side fetching.
// Data will NOT be pre-rendered or cached by the server.
// export const revalidate = 300; // DELETE THIS LINE

// This component no longer needs to be async or fetch data.
export default function Page() {
    
    // Pass NO initial deals data. The client will handle the fetch.
    return <ClientHomePage />;
}