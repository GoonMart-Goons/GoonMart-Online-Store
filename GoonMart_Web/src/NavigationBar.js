import React from 'react';
import {FaSearch} from 'react-icons/fa';
  

function NavigationBar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src= "/goonmart-logo.png"/>
        <span>GoonMart</span>
      </div>
      <div className="navbar-center">
        <form className="search-form">
          <input type="text" className="search-input" placeholder="Search" />
          <button type="submit" className="search-button">
            <FaSearch/>
          </button>
        </form>
      </div>
      <div className="navbar-right">
        <button> <a href="/login" className="nav-link">LOGIN</a></button>
        <button><a href="/signup" className="nav-link">SIGN UP</a></button>
      </div>
    </nav>
  );
}

export default NavigationBar;
