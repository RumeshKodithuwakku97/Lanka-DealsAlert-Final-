// app/api/subscribe/route.js
// SECURED: Implements Input Validation and Least Privilege

import AirtableModule from 'airtable';
import { NextResponse } from 'next/server';

const Airtable = AirtableModule.default || AirtableModule; 

// Constant for the target Airtable table
const AIRTABLE_NEWSLETTER_TABLE = 'Subscribers'; 

// Utility function for basic email validation (Input Validation Barrier)
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export async function POST(request) {
    // 1. Setup Least Privilege access boundary
    // Environment variables are only accessed here on the server.
    const base = new Airtable({ 
        apiKey: process.env.AIRTABLE_API_KEY 
    }).base(process.env.AIRTABLE_BASE_ID);

    try {
        const { email } = await request.json();

        // 2. INPUT VALIDATION & SANITIZATION
        if (!email || typeof email !== 'string' || !isValidEmail(email)) {
            return NextResponse.json(
                { success: false, error: 'Invalid email address provided.' }, 
                { status: 400 }
            );
        }

        // 3. PROTECTED DATABASE WRITE
        // We write the validated email to the protected Airtable base
        await base(AIRTABLE_NEWSLETTER_TABLE).create([
            {
                "fields": {
                    "Email": email.toLowerCase(), // Use sanitized email
                    "Status": "Active"
                }
            }
        ]);
        
        return NextResponse.json({ success: true, message: 'Subscribed successfully!' });
        
    } catch (error) {
        console.error("❌ Airtable Subscription Error:", error);
        // Handle potential errors like missing API keys or database failures
        return NextResponse.json(
            { success: false, error: 'Failed to subscribe due to a server error.' }, 
            { status: 500 }
        );
    }
}