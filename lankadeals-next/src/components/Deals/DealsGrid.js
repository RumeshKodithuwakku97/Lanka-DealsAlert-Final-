import React from 'react';
import DealCard from './DealCard';

const DealsGrid = ({ deals }) => {
  // ✅ SAFETY CHECK: Ensure deals is always an array
  const safeDeals = Array.isArray(deals) ? deals : [];
  
  if (safeDeals.length === 0) {
    return (
      <div className="no-deals">
        <i className="fas fa-search" style={{fontSize: '3rem', marginBottom: '1rem', opacity: 0.5}}></i>
        <p>No deals found. Check back later for amazing offers!</p>
      </div>
    );
  }

  return (
    <div className="deals-grid">
      {safeDeals.map((deal) => (
        <DealCard key={deal.id} deal={deal} />
      ))}
    </div>
  );
};

export default DealsGrid;