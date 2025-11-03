// src/components/Deals/DealCard.js

import React, { useState } from 'react';
import { getTranslation } from '../../../lib/localizationService';

const DealCard = ({ deal, currentLanguage }) => {
  const [isCopied, setIsCopied] = useState(false);
  const T = (key, fallback) => getTranslation(currentLanguage, key, fallback);
  
  // New cloaked URL structure
  const cloakedUrl = `/api/go/${deal.id}`;

  const handleLinkClick = (e) => {
    e.stopPropagation(); 
    // Redirect to the internal cloaked endpoint
    window.open(cloakedUrl, '_blank', 'noopener,noreferrer');
  };

  const handleCardClick = (e) => {
    if (e.target.tagName !== 'BUTTON' && e.target.tagName !== 'I') {
        window.open(cloakedUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handleCopyDiscount = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(deal.discount).then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    });
    // Open cloaked URL after copy
    window.open(cloakedUrl, '_blank', 'noopener,noreferrer');
  };

  const isCode = deal.discount && !deal.discount.toLowerCase().includes('off');
  const ctaText = "Check Price & Get Deal";

  return (
    <div className="deal-card" onClick={handleCardClick}>
      <div className="deal-image-container">
        {/* Added loading="lazy" for mobile performance (UX/SEO) */}
        <img src={deal.imageurl} alt={deal.title} className="deal-image" loading="lazy" />
        
        {!isCode && (
             <div className="deal-badge">{deal.discount || T('hot_deal')}</div>
        )}
      </div>

      {isCode && (
        <div className="deal-badge-action">
            <span className="discount-text">
                {deal.discount}
            </span>
            <button 
                className="copy-button"
                onClick={handleCopyDiscount}
                aria-label={isCopied ? 'Code copied to clipboard' : `Copy discount code ${deal.discount}`}
                title={isCopied ? 'Code Copied!' : 'Copy Code'}
            >
                <i className={`fas ${isCopied ? 'fa-check' : 'fa-copy'}`}></i>
                {isCopied ? ' Copied!' : ' Copy Code'}
            </button>
        </div>
      )}

      <div className="deal-content">
        <div className="deal-store">
          <i className="fas fa-store"></i>
          {deal.store}
        </div>
        <h3 className="deal-title">{deal.title}</h3>
        <div className="deal-price">
          <span className="current-price">{deal.currentprice}</span>
          <span className="original-price">{deal.originalprice}</span>
        </div>
        <div className="deal-meta">
          <span><i className="far fa-clock"></i> {deal.expiry}</span>
          {!isCode && <span><i className="fas fa-fire"></i> {T('hot_deal')}</span>}
        </div>

        <button 
            className="cta-button-deal"
            onClick={handleLinkClick}
            aria-label={`View deal for ${deal.title} on ${deal.store}`}
            title={ctaText}
        >
            <i className="fas fa-shopping-cart"></i>
            {ctaText}
            <i className="fas fa-external-link-alt" style={{fontSize: '0.8rem'}}></i>
        </button>
      </div>
    </div>
  );
};

export default DealCard;