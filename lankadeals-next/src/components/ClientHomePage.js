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
// NOTE: Header and other components must also have "use client" if they use hooks/events.

export default function ClientHomePage() {
    // Initialize data to null to indicate initial loading state
    const [deals, setDeals] = useState(null); 
    const [filteredDeals, setFilteredDeals] = useState(null);
    const [currentLanguage, setCurrentLanguage] = useState('en');
    const [activeCategory, setActiveCategory] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true); 

    // --- Search & Filter Handlers ---
    const handleSearch = (term) => {
        setSearchTerm(term);
        // Reset category filter when search term is used
        setActiveCategory('all'); 
    };

    const handleCategoryChange = (category) => {
        setActiveCategory(category);
        // Clear search term when category filter is used
        setSearchTerm('');
    };

    const handleNewsletterSubscribe = async (email) => {
        return await airtableService.subscribeNewsletter(email); 
    };

    // --- Data Fetching Logic ---
    const fetchData = async () => {
        setLoading(true);
        try {
            // Data fetching occurs here in the browser.
            // Airtable service is called, which proxies to the internal API route.
            const fetchedDeals = await airtableService.getDeals(); 
            setDeals(fetchedDeals);
            setFilteredDeals(fetchedDeals); 
        } catch (error) {
            console.error("Initial client-side fetch failed:", error);
            setDeals([]); 
            setFilteredDeals([]);
        } finally {
            setLoading(false);
        }
    };

    const refreshDeals = useCallback(() => {
        fetchData(); // Just call the main fetchData function
    }, []);

    useEffect(() => {
        fetchData();
    }, [refreshDeals]); // Run once on mount to fetch data

    // --- Filtering Logic (Runs whenever state changes) ---
    const filterDeals = useCallback(() => {
        if (!deals) return; 

        let filtered = deals;
        
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
        // Only run filtering once data is loaded and whenever dependencies change
        if (deals !== null) {
             filterDeals();
        }
    }, [filterDeals, deals]);


    // --- Render Logic ---
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

    return (
        <div className="App">
            <Header 
                currentLanguage={currentLanguage} 
                setCurrentLanguage={setCurrentLanguage} // Passed correctly
                onSearch={handleSearch} // Passed correctly
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
                    <div className="category-info">
                        <h2>
                            {searchTerm ? (
                                <>Search Results for "{searchTerm}"</>
                            ) : (
                                <>
                                    {activeCategory === 'all' ? 'All Hot Deals' : 
                                    `${activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)} Deals`}
                                </>
                            )}
                            <span className="deals-count"> ({filteredDeals.length} deals)</span>
                        </h2>
                        {searchTerm && (
                            <button 
                                className="clear-search-btn"
                                onClick={() => handleSearch('')}
                            >
                                <i className="fas fa-times"></i>
                                Clear Search
                            </button>
                        )}
                    </div>
                </div>

                <DealsGrid deals={filteredDeals} />

                <Newsletter onSubscribe={handleNewsletterSubscribe} />
            </div>

            <Footer />
        </div>
    );
}