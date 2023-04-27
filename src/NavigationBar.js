import React, { useState } from 'react';
import {FaSearch} from 'react-icons/fa';
import ProductGrid from './ProductGrid';

//FireBase Imports
import { db } from './config/Config';
import { collection, where, query, getDocs } from 'firebase/firestore'  

function NavigationBar() {
  const [searchTerm, setSearchTerm] = useState('')
  const [results, setResults] = useState([])
  //Somehow need to get this data to ProductGrid.js

  const handleSearch = async(e) => {
    e.preventDefault()
    ProductGrid(searchTerm)
    // filterBySearch()
  }
  
  // async function filterBySearch(){
  //   const prodsRef = collection(db, 'Products')
  //   const q = query(
  //     prodsRef,
  //     where('prodName', '>=', searchTerm),
  //     where('prodName', '<=', searchTerm + '\uf8ff'),
  //   )
  //   const querySnapshot = await getDocs(q)
  //   const DBproducts = querySnapshot.docs.map(doc => doc.data());
  //   return DBproducts
  // }

  return (
    <nav className="navbar" onSubmit={handleSearch}>
      <div className="navbar-left">
        <img src= "/goonmart-logo.png" alt='goonmart logo'/>
        <span><b>GoonMart</b></span>
      </div>
      <div className="navbar-center">
        <form className="search-form">
          <input type="text" className="search-input" placeholder="Search" 
           onChange = {(e) => setSearchTerm(e.target.value)}/>
          <button type="submit" className="search-button">
            <FaSearch/>
          </button>
        </form>
      </div>
      <div className="navbar-right">
        <button> <a href="./Login" className="nav-link">LOGIN</a></button>
        <button><a href="./Register" className="nav-link">REGISTER</a></button>
      </div>
    </nav>
  );
}

export default NavigationBar;
