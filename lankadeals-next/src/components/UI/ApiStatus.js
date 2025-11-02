// src/components/UI/ApiStatus.js

import React, { useState, useEffect } from 'react';


// CORRECTED: Import the new Airtable service.
// The path must go up three levels (../../..) to reach the 'lib' folder at the project root.
import { airtableService } from '../../../lib/airtableService.js'; 

const ApiStatus = () => {
  const [apiStatus, setApiStatus] = useState('checking');
  const [dealsCount, setDealsCount] = useState(0);

  // NOTE: This client component must be able to verify connectivity, so we use useEffect.
  useEffect(() => {
    checkApiStatus();
  }, []);

  const checkApiStatus = async () => {
    try {
      setApiStatus('checking');
      
      // CORRECTED: Call the new airtableService function
      const deals = await airtableService.getDeals(); 
      
      if (deals && deals.length > 0) {
        setApiStatus('connected');
        setDealsCount(deals.length);
      } else {
        setApiStatus('no-data');
      }
    } catch (error) {
      // Catch error if Airtable is misconfigured or inaccessible
      setApiStatus('error');
    }
  };

  const getStatusMessage = () => {
    switch (apiStatus) {
      case 'connected':
        return `✅ Connected to Airtable • ${dealsCount} deals loaded`;
      case 'checking':
        return '🔄 Connecting to Airtable...';
      case 'error':
        return '❌ Connection failed • Check .env.local and Airtable keys';
      case 'no-data':
        return '⚠️ Connected but no deals found or displaying fallback data';
      default:
        return 'Checking connection...';
    }
  };

  return (
    <div className={`api-status ${apiStatus}`}>
      <div className="status-content">
        <span className="status-message">{getStatusMessage()}</span>
        <button 
          className="refresh-btn"
          onClick={checkApiStatus}
          title="Refresh connection"
        >
          <i className="fas fa-sync-alt"></i>
        </button>
      </div>
    </div>
  );
};

export default ApiStatus;