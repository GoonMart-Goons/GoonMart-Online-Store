import React, { useState } from 'react';
import { FaGlobe } from 'react-icons/fa';
import { FaLaptop } from 'react-icons/fa';
import { FaTshirt} from 'react-icons/fa';
import { FaCoffee} from 'react-icons/fa';
import { FaGamepad } from 'react-icons/fa';
import ProductGrid from './ProductGrid';

//FireBase imports
import { db } from './config/Config'
import { collection, query, where, getDocs } from 'firebase/firestore';

export const categories = [
  { id: 0, name: 'All', icon: <FaGlobe/> },
  { id: 1, name: 'Electronics', icon: <FaLaptop/> },
  { id: 2, name: 'Clothing', icon: <FaTshirt/> },
  { id: 3, name: 'Home & Kitchen', icon: <FaCoffee/> },
  { id: 4, name: 'Toys & Games', icon: <FaGamepad/> },
];

//Query products that == selected category
/*async function filterProdsByCategory(category){
  const prodsRef = collection(db, 'Products')
  const q = query(prodsRef, where('category', '==', category))
  const qSnapshot = await getDocs(q)
  //Queried documents
  qSnapshot.forEach((doc) => {
    console.log(doc.data())
  })
}*/

function Categories() {
  const [activeCategoryName, setActiveCategoryName] = useState("All");

  //State to hold filtered products
  //const [filteredProducts, setFilteredProducts] = useState(products);

  const handleClick = (categoryName) => {
    setActiveCategoryName(categoryName);
    // Call a function to filter products by category
     console.log(activeCategoryName)
    //filterProdsByCategory(categories[categoryId].name)
  };

  return (
    <><div className="category-list">
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

    </div><ProductGrid activeCategoryName={activeCategoryName}/></>
  );
}

export default Categories;
