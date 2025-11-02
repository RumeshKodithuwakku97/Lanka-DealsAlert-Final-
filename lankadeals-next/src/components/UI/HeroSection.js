import React from 'react';
// REMOVE THIS LINE: import './HeroSection.css';

const HeroSection = () => {
  const scrollToDeals = () => {
    const dealsSection = document.querySelector('.deals-grid');
    if (dealsSection) {
      dealsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <h1>Never Miss a Deal Again in Sri Lanka! 🇱🇰</h1>
          <p>Find the best prices from Daraz, Kapruka, MyShop, and all your favorite Sri Lankan stores</p>
          <button className="cta-button" onClick={scrollToDeals}>
            <i className="fas fa-bolt"></i>
            Explore Hot Deals
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;