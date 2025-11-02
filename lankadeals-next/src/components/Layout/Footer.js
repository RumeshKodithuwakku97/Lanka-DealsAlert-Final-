import React from 'react';


const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h4>LankaDealsAlerts</h4>
            <p>Your trusted source for the best deals and discounts across all major Sri Lankan online stores.</p>
          </div>
          <div className="footer-section">
            <h4>Popular Stores</h4>
            <div className="footer-links">
              <button className="footer-link">
                <i className="fas fa-store"></i> Daraz.lk Deals
              </button>
              <button className="footer-link">
                <i className="fas fa-store"></i> Kapruka Offers
              </button>
              <button className="footer-link">
                <i className="fas fa-store"></i> MyShop Discounts
              </button>
              <button className="footer-link">
                <i className="fas fa-store"></i> Softlogic Sales
              </button>
            </div>
          </div>
          <div className="footer-section">
            <h4>Categories</h4>
            <div className="footer-links">
              <button className="footer-link">
                <i className="fas fa-laptop"></i> Electronics
              </button>
              <button className="footer-link">
                <i className="fas fa-tshirt"></i> Fashion
              </button>
              <button className="footer-link">
                <i className="fas fa-home"></i> Home & Living
              </button>
              <button className="footer-link">
                <i className="fas fa-shopping-basket"></i> Groceries
              </button>
            </div>
          </div>
          <div className="footer-section">
            <h4>Support</h4>
            <div className="footer-links">
              <button className="footer-link">
                <i className="fas fa-info-circle"></i> About Us
              </button>
              <button className="footer-link">
                <i className="fas fa-envelope"></i> Contact
              </button>
              <button className="footer-link">
                <i className="fas fa-shield-alt"></i> Privacy Policy
              </button>
              <button className="footer-link">
                <i className="fas fa-file-contract"></i> Terms of Service
              </button>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 LankaDealsAlerts.lk - All rights reserved. | Making Sri Lankan shopping affordable!</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;