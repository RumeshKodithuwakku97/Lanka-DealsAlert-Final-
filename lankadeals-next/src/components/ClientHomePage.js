// src/components/ClientHomePage.js
"use client"; 

import React, { useState, useEffect, useCallback } from 'react';
import Header from './Layout/Header';
import Navigation from './Layout/Navigation';
import HeroSection from './UI/HeroSection';
import DealsGrid from './Deals/DealsGrid';
import Newsletter from './UI/Newsletter';
import Footer from './Layout/Footer';
import ApiStatus from './UI/ApiStatus';
import { airtableService } from '../../lib/airtableService'; 

// ClientHomePage no longer receives initialDeals props
export default function ClientHomePage() {
    // Initialize data to null or an empty array to indicate loading
    const [deals, setDeals] = useState(null); 
    const [filteredDeals, setFilteredDeals] = useState(null);
    const [currentLanguage, setCurrentLanguage] = useState('en');
    const [activeCategory, setActiveCategory] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true); // Always starts in a loading state

    // --- EFFECT: Fetch Data on Initial Load (Runs only in the browser) ---
    const fetchData = async () => {
        setLoading(true);
        try {
            // Data fetching now occurs here in the browser.
            const fetchedDeals = await airtableService.getDeals(); 
            setDeals(fetchedDeals);
            setFilteredDeals(fetchedDeals); 
        } catch (error) {
            console.error("Initial client-side fetch failed:", error);
            setDeals([]); // Set to empty array to show "no deals found"
            setFilteredDeals([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []); // Empty dependency array ensures it runs once after initial render

    // --- Data Refresh Logic (Can still be triggered by user) ---
    const refreshDeals = () => {
        fetchData(); // Just call the main fetchData function
    };
    
    // --- Filtering Logic (Remains the same) ---
    const filterDeals = useCallback(() => {
        // Only run filtering if deals data is available
        if (!deals) return; 

        let filtered = deals;
        // ... (rest of filtering logic)
        
        if (activeCategory !== 'all') {
            filtered = filtered.filter(deal => 
                deal.category && deal.category.toLowerCase() === activeCategory.toLowerCase()
            );
        }

        if (searchTerm.trim()) {
            const searchLower = searchTerm.toLowerCase();
            filtered = filtered.filter(deal =>
                (deal.title && deal.title.toLowerCase().includes(searchLower)) ||
                (deal.store && deal.store.toLowerCase().includes(searchLower)) ||
                (deal.category && deal.category.toLowerCase().includes(searchLower))
            );
        }
        setFilteredDeals(filtered);
    }, [deals, activeCategory, searchTerm]);

    useEffect(() => {
        // Ensure filtering runs whenever deals state is updated
        if (deals !== null) {
             filterDeals();
        }
    }, [filterDeals, deals]);

    // Show loading state while fetching data
    if (loading || filteredDeals === null) {
        return (
            <div className="App loading-screen">
                <Header />
                <div className="loading-spinner">
                    <i className="fas fa-spinner fa-spin"></i> Loading Deals...
                </div>
            </div>
        );
    }

    // After loading, render the full content
    return (
        <div className="App">
            <Header 
                currentLanguage={currentLanguage} 
                setCurrentLanguage={setCurrentLanguage}
                onSearch={handleSearch}
                searchTerm={searchTerm}
            />

            <Navigation 
                onCategoryChange={handleCategoryChange} 
                activeCategory={activeCategory}
            />

            <HeroSection />

            <div className="container">
                <ApiStatus 
                    onRefresh={refreshDeals} 
                    loading={loading} 
                    dealsCount={filteredDeals.length}
                /> 
                
                <div className="content-header">
                    {/* ... rest of content header ... */}
                </div>

                <DealsGrid deals={filteredDeals} />

                <Newsletter onSubscribe={handleNewsletterSubscribe} />
            </div>

            <Footer />
        </div>
    );
}