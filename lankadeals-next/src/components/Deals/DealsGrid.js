import React from 'react';
import DealCard from './DealCard';
import { getTranslation } from '../../../lib/localizationService';

const DealsGrid = ({ deals, currentLanguage }) => {
  const T = (key, fallback) => getTranslation(currentLanguage, key, fallback);
  
  // ✅ SAFETY CHECK: Ensure deals is always an array
  const safeDeals = Array.isArray(deals) ? deals : [];
  
  if (safeDeals.length === 0) {
    return (
      <div className="no-deals">
        <i className="fas fa-search" style={{fontSize: '3rem', marginBottom: '1rem', opacity: 0.5}}></i>
        <p>{T('no_deals_message')}</p>
      </div>
    );
  }

  return (
    <div className="deals-grid">
      {safeDeals.map((deal) => (
        <DealCard key={deal.id} deal={deal} currentLanguage={currentLanguage} />
      ))}
    </div>
  );
};

export default DealsGrid;