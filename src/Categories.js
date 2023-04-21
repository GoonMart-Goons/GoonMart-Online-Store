import React, { useState } from 'react';
import { FaGlobe } from 'react-icons/fa';
import { FaLaptop } from 'react-icons/fa';
import { FaTshirt} from 'react-icons/fa';
import { FaCoffee} from 'react-icons/fa';
import { FaGamepad } from 'react-icons/fa';
import ProductGrid from './ProductGrid';

export const categories = [
  { id: 0, name: 'All', icon: <FaGlobe/> },
  { id: 1, name: 'Electronics', icon: <FaLaptop/> },
  { id: 2, name: 'Clothing', icon: <FaTshirt/> },
  { id: 3, name: 'Home & Kitchen', icon: <FaCoffee/> },
  { id: 4, name: 'Toys & Games', icon: <FaGamepad/> },
];

function Categories() {
  const [activeCategoryId, setActiveCategoryId] = useState(0);

  //State to hold filtered products
  //const [filteredProducts, setFilteredProducts] = useState(products);

  const handleClick = (categoryId) => {
    setActiveCategoryId(categoryId);
    // Call a function to filter products by category
    /* const filteredProducts = products.filter(product => {
      if (categoryId === 0) {
        return true;
      } else {
        return product.category === categories[categoryId].name;
      }
    });
    setFilteredProducts(filteredProducts); */ 
  };

  return (
    <><div className="category-list">
      {categories.map((category) => (
        <div
          key={category.id}
          className={`category-item ${category.id === activeCategoryId ? 'active' : ''}`}
          onClick={() => handleClick(category.id)}
        >
          <React.Fragment>
            {category.icon}
          </React.Fragment>

          <span className="category-label">{category.name}</span>
        </div>
      ))}

    </div><ProductGrid activeCategoryId={activeCategoryId} /></>
  );
}

export default Categories;
