import React, { useState } from 'react';
import { FaGlobe } from 'react-icons/fa';
import { FaLaptop } from 'react-icons/fa';
import { FaTshirt} from 'react-icons/fa';
import { FaCoffee} from 'react-icons/fa';
import { FaGamepad } from 'react-icons/fa';

//FireBase imports
import { db } from './config/Config'
import { collection, query, where, getDocs } from 'firebase/firestore';

//Catagories available
const categories = [
  { id: 0, name: 'All', icon: <FaGlobe/> },
  { id: 1, name: 'Electronics', icon: <FaLaptop/> },
  { id: 2, name: 'Clothing', icon: <FaTshirt/> },
  { id: 3, name: 'Home & Kitchen', icon: <FaCoffee/> },
  { id: 4, name: 'Toys & Games', icon: <FaGamepad/> },
];

//Query products that == selected category
async function filterProdsByCategory(category){
  const prodsRef = collection(db, 'Products')
  const q = query(prodsRef, where('category', '==', category))
  const qSnapshot = await getDocs(q)
  //Queried documents
  qSnapshot.forEach((doc) => {
    console.log(doc.data())
  })
}

function CategoryList() {
  const [activeCategoryId, setActiveCategoryId] = useState(0);

  const handleClick = (categoryId) => {
    setActiveCategoryId(categoryId);
    // Call a function to filter products by category
    // console.log(categories[categoryId].name)
    filterProdsByCategory(categories[categoryId].name)
  };

  return (
    <div className="category-list">
      {categories.map((category) => (
        <div
          key={category.id}
          className={`category-item ${
            category.id === activeCategoryId ? 'active' : ''
          }`}
          onClick={() => handleClick(category.id)}
        >
            <React.Fragment>
                {category.icon}
            </React.Fragment>

          <span className="category-label">{category.name}</span>
        </div>
      ))}
    </div>
  );
}

export default CategoryList;
