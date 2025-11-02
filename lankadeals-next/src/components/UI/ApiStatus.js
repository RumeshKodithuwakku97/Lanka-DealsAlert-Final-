// src/components/UI/ApiStatus.js
"use client";

import React from 'react';

// Simplified to accept props for immediate action
const ApiStatus = ({ onRefresh, loading, dealsCount }) => {
  
  // NOTE: Status check logic is removed here; we assume success if dealsCount > 0
  const getStatusMessage = () => {
    if (loading) return '🔄 Updating Deals...';
    if (dealsCount > 0) return `✅ ${dealsCount} deals displayed (statically generated)`;
    return '⚠️ No deals found or displaying fallback data.';
  };

  const statusClass = dealsCount > 0 ? 'connected' : 'no-data';

  return (
    <div className={`api-status ${statusClass}`}>
      <div className="status-content">
        <span className="status-message">{getStatusMessage()}</span>
        <button 
          className="refresh-btn"
          onClick={onRefresh} // Triggers the refreshDeals function in the parent
          disabled={loading}
          title="Refresh deals from Airtable"
        >
          <i className={`fas fa-sync-alt ${loading ? 'fa-spin' : ''}`}></i>
        </button>
      </div>
    </div>
  );
};

export default ApiStatus;