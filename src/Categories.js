import React, { useState } from 'react';
import { FaGlobe } from 'react-icons/fa';
import { FaLaptop } from 'react-icons/fa';
import { FaTshirt} from 'react-icons/fa';
import { FaCoffee} from 'react-icons/fa';
import { FaGamepad } from 'react-icons/fa';
import { FaTag } from 'react-icons/fa';
import ProductGrid from './ProductGrid';

//FireBase imports
import { db } from './config/Config'
import { collection, query, where, getDocs } from 'firebase/firestore';

//Catagories available
export const categories = [
  { id: 0, name: 'All', icon: <FaGlobe/> },
  { id: 1, name: 'On Sale', icon: <FaTag/> },
  { id: 2, name: 'Electronics', icon: <FaLaptop/> },
  { id: 3, name: 'Clothing', icon: <FaTshirt/> },
  { id: 4, name: 'Home & Kitchen', icon: <FaCoffee/> },
  { id: 5, name: 'Toys & Games', icon: <FaGamepad/> },
];

function Categories({ searchQuery }) {
  const [activeCategoryName, setActiveCategoryName] = useState("All");

  const handleClick = (categoryName) => {
    setActiveCategoryName(categoryName);
  };

  return (
    <>
      <div className="category-list" data-testid="categories">
        {categories.map((category) => (
          <div
            key={category.name}
            className={`category-item ${category.name === activeCategoryName ? 'active' : ''}`}
            onClick={() => handleClick(category.name)}
          >
            <React.Fragment>
              {category.icon}
            </React.Fragment>
            <span className="category-label">{category.name}</span>
          </div>
        ))}
      </div>
      <ProductGrid activeCategoryName={activeCategoryName} searchQuery={searchQuery} />
    </>
  );
}

export default Categories;
