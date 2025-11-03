import React, { useState } from 'react';
import { getTranslation } from '../../../lib/localizationService';

const Newsletter = ({ onSubscribe, currentLanguage }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const T = (key, fallback) => getTranslation(currentLanguage, key, fallback);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setMessage(T('message_email_required'));
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage(T('message_email_invalid'));
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const result = await onSubscribe(email);
      
      if (result.success) {
        setMessage(T('message_success'));
        setEmail('');
      } else {
        setMessage(`❌ ${result.error}`);
      }
    } catch (error) {
      setMessage(T('message_error_unexpected'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="newsletter">
      <div className="newsletter-content">
        <h3>
          <i className="fas fa-envelope"></i>
          {T('newsletter_heading')}
        </h3>
        <p>{T('newsletter_subtext')}</p>
        
        {message && (
          <div className={`newsletter-message ${message.includes('🎉') ? 'success' : 'error'}`}>
            {message}
          </div>
        )}

        <form className="newsletter-form" onSubmit={handleSubmit}>
          <input 
            type="email" 
            placeholder={T('newsletter_placeholder')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            required 
          />
          <button type="submit" disabled={loading}>
            {loading ? (
              <>
                <i className="fas fa-spinner fa-spin"></i>
                {T('subscribing_button')}
              </>
            ) : (
              <>
                <i className="fas fa-paper-plane"></i>
                {T('subscribe_button')}
              </>
            )}
          </button>
        </form>
        
        <div className="newsletter-benefits">
          <div className="benefit-item">
            <i className="fas fa-bolt"></i>
            <span>{T('benefit_1')}</span>
          </div>
          <div className="benefit-item">
            <i className="fas fa-shield-alt"></i>
            <span>{T('benefit_2')}</span>
          </div>
          <div className="benefit-item">
            <i className="fas fa-gift"></i>
            <span>{T('benefit_3')}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;