// src/components/Layout/Header.js (Simplified for Public Site)
"use client";
import React, { useState } from 'react';
import { getTranslation } from '../../../lib/localizationService';
// REMOVED: import LoginModal from '../Auth/LoginModal';
// REMOVED: import SignupModal from '../Auth/SignupModal';

const Header = ({ 
  currentLanguage, 
  setCurrentLanguage, 
  onSearch, 
  searchTerm, 
  // REMOVED: onLogin, onSignup, onLogout, user 
}) => {
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm || '');
  // REMOVED: showLoginModal, showSignupModal

  const T = (key, fallback) => getTranslation(currentLanguage, key, fallback);

  const handleSearch = (e) => {
    if (e.key === 'Enter' || e.type === 'click') {
      onSearch(localSearchTerm);
    }
  };

  const clearSearch = () => {
    setLocalSearchTerm('');
    onSearch('');
  };
  
  // REMOVED: All modal handlers and submission functions

  return (
    <header className="header">
      {/* REMOVED: Login and Signup Modals */}

      <div className="language-selector">
        <button 
          className={`lang-btn ${currentLanguage === 'en' ? 'active' : ''}`}
          onClick={() => setCurrentLanguage('en')}
        >EN</button>
        <button 
          className={`lang-btn ${currentLanguage === 'si' ? 'active' : ''}`}
          onClick={() => setCurrentLanguage('si')}
        >සිං</button>
        <button 
          className={`lang-btn ${currentLanguage === 'ta' ? 'active' : ''}`}
          onClick={() => setCurrentLanguage('ta')}
        >தமிழ்</button>
      </div>
      
      <div className="container">
        <div className="header-top">
          <div className="logo">
            <i className="fas fa-tags"></i>
            Lanka<span>Deals</span>Alerts
          </div>
          <div className="search-bar">
            <i className="fas fa-search" onClick={handleSearch}></i>
            <input 
              type="text" 
              placeholder={T('search_placeholder')} // Use translation helper
              value={localSearchTerm}
              onChange={(e) => setLocalSearchTerm(e.target.value)}
              onKeyPress={handleSearch}
            />
            {localSearchTerm && (
              <i className="fas fa-times clear-search" onClick={clearSearch}></i>
            )}
          </div>
          {/* REMOVED: Auth buttons */}
        </div>
      </div>
    </header>
  );
};

export default Header;