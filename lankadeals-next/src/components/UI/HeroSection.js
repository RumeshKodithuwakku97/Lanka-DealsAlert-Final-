import React from 'react';
import { getTranslation } from '../../../lib/localizationService';
// REMOVE THIS LINE: import './HeroSection.css';

const HeroSection = ({ currentLanguage }) => {
  const T = (key, fallback) => getTranslation(currentLanguage, key, fallback);

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
          <h1>{T('hero_headline')}</h1>
          <p>{T('hero_subtext')}</p>
          <button className="cta-button" onClick={scrollToDeals}>
            <i className="fas fa-bolt"></i>
            {T('explore_deals_button')}
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;