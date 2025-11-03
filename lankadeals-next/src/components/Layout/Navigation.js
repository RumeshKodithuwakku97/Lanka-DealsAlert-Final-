import React from 'react';
import { getTranslation } from '../../../lib/localizationService';

const Navigation = ({ onCategoryChange, activeCategory, currentLanguage }) => {
  const T = (key, fallback) => getTranslation(currentLanguage, key, fallback);
  
  const categories = [
    { id: 'all', nameKey: 'category_all', icon: 'fas fa-fire' },
    { id: 'electronics', nameKey: 'category_electronics', icon: 'fas fa-laptop' },
    { id: 'fashion', nameKey: 'category_fashion', icon: 'fas fa-tshirt' },
    { id: 'home', nameKey: 'category_home', icon: 'fas fa-home' },
    { id: 'grocery', nameKey: 'category_grocery', icon: 'fas fa-shopping-basket' },
    { id: 'beauty', nameKey: 'category_beauty', icon: 'fas fa-spa' },
    { id: 'digital', nameKey: 'category_digital', icon: 'fas fa-desktop' }
  ];

  return (
    <nav className="navigation">
      <div className="container">
        <div className="categories">
          {categories.map(category => (
            <button 
              key={category.id}
              className={`category-btn ${activeCategory === category.id ? 'active' : ''}`}
              onClick={() => onCategoryChange(category.id)}
            >
              <i className={category.icon}></i>
              {T(category.nameKey)}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;