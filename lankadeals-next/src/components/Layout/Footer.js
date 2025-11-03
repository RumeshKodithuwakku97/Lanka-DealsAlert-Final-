import React from 'react';
import { getTranslation } from '../../../lib/localizationService';


const Footer = ({ currentLanguage }) => {
  const T = (key, fallback) => getTranslation(currentLanguage, key, fallback);

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h4>LankaDealsAlerts</h4>
            <p>{T('footer_about')}</p>
          </div>
          <div className="footer-section">
            <h4>{T('footer_popular_stores')}</h4>
            <div className="footer-links">
              <button className="footer-link">
                <i className="fas fa-store"></i> {T('footer_store_1')}
              </button>
              <button className="footer-link">
                <i className="fas fa-store"></i> {T('footer_store_2')}
              </button>
              <button className="footer-link">
                <i className="fas fa-store"></i> {T('footer_store_3')}
              </button>
              <button className="footer-link">
                <i className="fas fa-store"></i> {T('footer_store_4')}
              </button>
            </div>
          </div>
          <div className="footer-section">
            <h4>{T('footer_categories')}</h4>
            <div className="footer-links">
              <button className="footer-link">
                <i className="fas fa-laptop"></i> {T('category_electronics')}
              </button>
              <button className="footer-link">
                <i className="fas fa-tshirt"></i> {T('category_fashion')}
              </button>
              <button className="footer-link">
                <i className="fas fa-home"></i> {T('category_home')}
              </button>
              <button className="footer-link">
                <i className="fas fa-shopping-basket"></i> {T('category_grocery')}
              </button>
            </div>
          </div>
          <div className="footer-section">
            <h4>{T('footer_support')}</h4>
            <div className="footer-links">
              <button className="footer-link">
                <i className="fas fa-info-circle"></i> {T('footer_link_about')}
              </button>
              <button className="footer-link">
                <i className="fas fa-envelope"></i> {T('footer_link_contact')}
              </button>
              <button className="footer-link">
                <i className="fas fa-shield-alt"></i> {T('footer_link_privacy')}
              </button>
              <button className="footer-link">
                <i className="fas fa-file-contract"></i> {T('footer_link_terms')}
              </button>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 LankaDealsAlerts.lk - {T('footer_bottom_line')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;