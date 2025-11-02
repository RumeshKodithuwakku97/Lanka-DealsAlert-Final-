import React, { useState } from 'react';

const Newsletter = ({ onSubscribe }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setMessage('Please enter your email address.');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage('Please enter a valid email address.');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const result = await onSubscribe(email);
      
      if (result.success) {
        setMessage('🎉 Thank you for subscribing! You will receive daily deal alerts.');
        setEmail('');
      } else {
        setMessage(`❌ ${result.error}`);
      }
    } catch (error) {
      setMessage('❌ An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="newsletter">
      <div className="newsletter-content">
        <h3>
          <i className="fas fa-envelope"></i>
          Get Daily Deal Alerts!
        </h3>
        <p>Never miss the best deals. We'll send you one email per day with the hottest offers from Sri Lankan stores.</p>
        
        {message && (
          <div className={`newsletter-message ${message.includes('🎉') ? 'success' : 'error'}`}>
            {message}
          </div>
        )}

        <form className="newsletter-form" onSubmit={handleSubmit}>
          <input 
            type="email" 
            placeholder="Enter your email address" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            required 
          />
          <button type="submit" disabled={loading}>
            {loading ? (
              <>
                <i className="fas fa-spinner fa-spin"></i>
                Subscribing...
              </>
            ) : (
              <>
                <i className="fas fa-paper-plane"></i>
                Subscribe
              </>
            )}
          </button>
        </form>
        
        <div className="newsletter-benefits">
          <div className="benefit-item">
            <i className="fas fa-bolt"></i>
            <span>Hot deals delivered daily</span>
          </div>
          <div className="benefit-item">
            <i className="fas fa-shield-alt"></i>
            <span>No spam, unsubscribe anytime</span>
          </div>
          <div className="benefit-item">
            <i className="fas fa-gift"></i>
            <span>Exclusive offers for subscribers</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;