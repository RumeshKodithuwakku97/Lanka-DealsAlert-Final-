import React from 'react';

const Navigation = ({ onCategoryChange, activeCategory }) => {
  const categories = [
    { id: 'all', name: 'All Deals', icon: 'fas fa-fire' },
    { id: 'electronics', name: 'Electronics', icon: 'fas fa-laptop' },
    { id: 'fashion', name: 'Fashion', icon: 'fas fa-tshirt' },
    { id: 'home', name: 'Home & Living', icon: 'fas fa-home' },
    { id: 'grocery', name: 'Groceries', icon: 'fas fa-shopping-basket' },
    { id: 'beauty', name: 'Beauty', icon: 'fas fa-spa' },
    { id: 'digital', name: 'Digital Products', icon: 'fas fa-desktop' }
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
              {category.name}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;