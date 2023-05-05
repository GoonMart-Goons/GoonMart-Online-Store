import React from 'react';
import {FaSearch} from 'react-icons/fa';
  

function NavigationBar() {

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src= "/imgs/goonmart-logo.png" alt='goonmart logo'/>
        <span><b>GoonMart</b></span>
      </div>
      <div className="navbar-center">
        <form className="search-form">
          <input type="text" className="search-input" placeholder="Search" />
            <button type="submit" className="search-button" data-testid="search-button">
                <FaSearch data-testid="fa-search-icon" />
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
