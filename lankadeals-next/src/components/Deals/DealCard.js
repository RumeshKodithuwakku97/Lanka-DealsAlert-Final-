import React from 'react';

const DealCard = ({ deal }) => {
  const handleCardClick = () => {
    window.open(deal.affiliateurl || '#', '_blank');
  };

  return (
    <div className="deal-card" onClick={handleCardClick}>
      <div className="deal-image-container">
        <img src={deal.imageurl} alt={deal.title} className="deal-image" />
        <div className="deal-badge">{deal.discount}</div>
      </div>
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
          <span><i className="fas fa-fire"></i> Hot Deal</span>
        </div>
      </div>
    </div>
  );
};

export default DealCard;