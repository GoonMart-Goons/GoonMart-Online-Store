import React from 'react';
import {FaSearch} from 'react-icons/fa';
  

function InnerNavigationBar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src= "/goonmart-logo.png"/>
      </div>
      <div className="navbar-center">
        <form className="search-form">
          <input type="text" className="search-input" placeholder="Search" />
          <button type="submit" className="search-button">
            <FaSearch/>
          </button>
        </form>
      </div>
    </nav>
  );
}

export default InnerNavigationBar;
