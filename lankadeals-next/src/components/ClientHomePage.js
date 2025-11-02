// src/components/ClientHomePage.js
"use client"; // <--- THIS DIRECTIVE FIXES THE ERROR

import React, { useState, useEffect, useCallback } from 'react';
import Header from './Layout/Header';
import Navigation from './Layout/Navigation';
import HeroSection from './UI/HeroSection';
import DealsGrid from './Deals/DealsGrid';
import Newsletter from './UI/Newsletter';
import Footer from './Layout/Footer';
import ApiStatus from './UI/ApiStatus';
import { airtableService } from '../../lib/airtableService'; // Correct import path

export default function ClientHomePage({ initialDeals }) {
    // All hooks (useState, useEffect, useCallback) are safe here
    const [deals] = useState(initialDeals);
    const [filteredDeals, setFilteredDeals] = useState(initialDeals);
    const [currentLanguage, setCurrentLanguage] = useState('en');
    const [activeCategory, setActiveCategory] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    
    const filterDeals = useCallback(() => {
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
        filterDeals();
    }, [filterDeals]);

    const handleCategoryChange = (category) => {
        setActiveCategory(category);
        setSearchTerm('');
    };

    const handleSearch = (term) => {
        setSearchTerm(term);
        setActiveCategory('all');
    };

    const handleNewsletterSubscribe = async (email) => {
        return await airtableService.subscribeNewsletter(email); 
    };

    return (
        <>
            {/* Note: Head tags are best managed in the Server Component/Layout, but keeping the structure for now */}
            
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
                <ApiStatus /> 

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
        </>
    );
}